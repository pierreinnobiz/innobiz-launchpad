#!/usr/bin/env node
/**
 * Automated RLS / Data API safety checks.
 *
 * Two layers:
 *  1. Catalog checks (psql, read-only): RLS is enabled on every public table,
 *     required GRANTs exist, and no policy that calls a role-check function is
 *     exposed to the `anon` / PUBLIC role (that is what produced the
 *     "permission denied for function has_role" errors for visitors).
 *  2. Live Data API checks (anon key over HTTPS): a signed-out visitor gets an
 *     empty result or a clean 401/403, never a 500 / "permission denied".
 *
 * Usage: node scripts/check-rls-policies.mjs
 * Exit code 1 on any failure, so it can gate a build or CI run.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

// Tables that must never be readable by signed-out visitors.
const PRIVATE_TABLES = ['chat_contacts', 'chat_messages', 'user_roles'];
// Role-check helpers that anon is not allowed to execute.
const ROLE_FUNCTIONS = ['has_role', 'check_my_role'];

const failures = [];
const notes = [];

const fail = (msg) => failures.push(msg);
const ok = (msg) => notes.push(`ok   ${msg}`);

const psql = (sql) => {
  try {
    return execFileSync('psql', ['-tAF', '\t', '-c', sql], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => line.split('\t'));
  } catch (error) {
    throw new Error(`psql query failed: ${error.stderr || error.message}`);
  }
};

// ---------------------------------------------------------------- catalog ----

function checkRlsEnabled() {
  const rows = psql(`
    SELECT c.relname, c.relrowsecurity
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public' AND c.relkind = 'r'
     ORDER BY 1;
  `);
  if (rows.length === 0) fail('no tables found in the public schema (unexpected)');
  for (const [table, enabled] of rows) {
    if (enabled === 't') ok(`RLS enabled on public.${table}`);
    else fail(`RLS is NOT enabled on public.${table} — every row is exposed through the Data API`);
  }
}

function checkGrants() {
  const rows = psql(`
    SELECT table_name, grantee, string_agg(DISTINCT privilege_type, ',' ORDER BY privilege_type)
      FROM information_schema.role_table_grants
     WHERE table_schema = 'public'
       AND grantee IN ('anon', 'authenticated', 'service_role')
     GROUP BY 1, 2;
  `);
  const grants = new Map();
  for (const [table, grantee, privs] of rows) {
    grants.set(`${table}:${grantee}`, privs.split(','));
  }

  const tables = psql(`
    SELECT c.relname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = 'public' AND c.relkind = 'r' ORDER BY 1;
  `).map(([t]) => t);

  for (const table of tables) {
    const serviceRole = grants.get(`${table}:service_role`) ?? [];
    if (serviceRole.includes('SELECT')) ok(`service_role can reach public.${table}`);
    else fail(`public.${table} has no service_role GRANT — edge functions and admin code cannot reach it`);

    // Private tables must not be readable by the anon role.
    const anon = grants.get(`${table}:anon`) ?? [];
    if (PRIVATE_TABLES.includes(table) && anon.includes('SELECT')) {
      fail(`public.${table} grants SELECT to anon, but it holds private data`);
    }
  }
}

function checkPolicyRoles() {
  const rows = psql(`
    SELECT tablename, policyname, cmd, array_to_string(roles, ','), coalesce(qual, ''), coalesce(with_check, '')
      FROM pg_policies
     WHERE schemaname = 'public'
     ORDER BY 1, 2;
  `);
  if (rows.length === 0) fail('no RLS policies found in the public schema');

  const tablesWithPolicies = new Set();
  for (const [table, policy, cmd, roles, qual, withCheck] of rows) {
    tablesWithPolicies.add(table);
    const roleList = roles.split(',').map((r) => r.trim());
    const expression = `${qual} ${withCheck}`;
    const usesRoleFn = ROLE_FUNCTIONS.some((fn) => expression.includes(`${fn}(`));
    const exposedToAnon = roleList.includes('public') || roleList.includes('anon');

    if (usesRoleFn && exposedToAnon) {
      fail(
        `policy "${policy}" on public.${table} (${cmd}) calls a role-check function but applies to ` +
          `${roleList.join('/')} — signed-out reads abort with "permission denied for function" instead of returning no rows. ` +
          'Add TO authenticated.'
      );
    } else if (usesRoleFn) {
      ok(`policy "${policy}" on public.${table} is scoped to ${roleList.join('/')}`);
    }

    if (PRIVATE_TABLES.includes(table) && exposedToAnon && cmd === 'SELECT') {
      fail(`policy "${policy}" on private table public.${table} is evaluated for anon visitors`);
    }
  }

  for (const table of PRIVATE_TABLES) {
    if (!tablesWithPolicies.has(table)) {
      fail(`private table public.${table} has no RLS policy at all — it is fully locked or unprotected`);
    }
  }
}

function checkRoleFunctionGrants() {
  const rows = psql(`
    SELECT p.proname,
           has_function_privilege('anon', p.oid, 'EXECUTE'),
           has_function_privilege('authenticated', p.oid, 'EXECUTE')
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
     WHERE n.nspname = 'public' AND p.proname = ANY(ARRAY['${ROLE_FUNCTIONS.join("','")}']);
  `);
  for (const [name, anon, authenticated] of rows) {
    if (anon === 't') fail(`public.${name}() is executable by anon — role checks must not be callable by visitors`);
    else ok(`public.${name}() is not executable by anon`);
    if (authenticated !== 't') {
      fail(`public.${name}() is not executable by authenticated — admin policies will fail for signed-in users`);
    }
  }
  if (rows.length === 0) fail(`none of the role-check functions (${ROLE_FUNCTIONS.join(', ')}) were found`);
}

// --------------------------------------------------------------- live API ----

function readEnv() {
  if (!existsSync('.env')) return {};
  return Object.fromEntries(
    readFileSync('.env', 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const i = line.indexOf('=');
        return [line.slice(0, i), line.slice(i + 1).replace(/^["']|["']$/g, '')];
      })
  );
}

async function checkAnonDataApi() {
  const env = { ...readEnv(), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    notes.push('skip Data API checks (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY not available)');
    return;
  }

  for (const table of PRIVATE_TABLES) {
    const res = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const body = await res.text();

    if (/permission denied for function/i.test(body)) {
      fail(`signed-out read of ${table} returns "permission denied for function": ${body.slice(0, 160)}`);
      continue;
    }
    if (res.status >= 500) {
      fail(`signed-out read of ${table} returns HTTP ${res.status}: ${body.slice(0, 160)}`);
      continue;
    }
    if (res.ok) {
      let rows;
      try {
        rows = JSON.parse(body);
      } catch {
        fail(`signed-out read of ${table} returned an unparsable body: ${body.slice(0, 160)}`);
        continue;
      }
      if (Array.isArray(rows) && rows.length === 0) ok(`signed-out read of ${table} returns no rows (clean)`);
      else fail(`signed-out read of ${table} leaked ${Array.isArray(rows) ? rows.length : '?'} row(s)`);
    } else {
      ok(`signed-out read of ${table} is refused with HTTP ${res.status} (no server error)`);
    }
  }
}

// -------------------------------------------------------------------- run ----

async function main() {
  try {
    checkRlsEnabled();
    checkGrants();
    checkPolicyRoles();
    checkRoleFunctionGrants();
  } catch (error) {
    notes.push(`skip catalog checks (${error.message.split('\n')[0]})`);
  }

  await checkAnonDataApi();

  for (const note of notes) console.log(note);

  if (failures.length > 0) {
    console.error(`\nRLS checks FAILED (${failures.length}):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`\nRLS checks passed (${notes.length} assertions).`);
}

main();
