// Fails the build if DE-language residues are found in src/.
// Scans for t4( calls, ">DE<" button labels, and 'de' lang references.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../src/', import.meta.url).pathname;
// File where the audit patterns themselves live — must be excluded.
const EXCLUDE = new Set([join(ROOT, 'pages/LanguageAudit.tsx')]);

const PATTERNS = [
  { name: 't4(', re: /\bt4\s*\(/g },
  { name: '>DE< label', re: />\s*DE\s*</g },
  { name: "'de' value", re: /['"`]de['"`]\s*[,)\]]/g },
  { name: 'lang === de', re: /\blang\s*===?\s*['"`]de['"`]/g },
  { name: 'language === de', re: /\blanguage\s*===?\s*['"`]de['"`]/g },
  { name: 'code: de', re: /\bcode\s*:\s*['"`]de['"`]/g },
  { name: 'lang=de', re: /\blang=de\b/g },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(t|j)sx?$/.test(entry)) out.push(full);
  }
  return out;
}

const hits = [];
for (const file of walk(ROOT)) {
  if (EXCLUDE.has(file)) continue;
  const src = readFileSync(file, 'utf8');
  for (const { name, re } of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      const line = src.slice(0, m.index).split('\n').length;
      hits.push({ file: relative(process.cwd(), file), line, name, text: m[0] });
    }
  }
}

if (hits.length) {
  console.error('\n✘ DE residue check failed — remove the following before building:\n');
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}  [${h.name}]  ${h.text}`);
  }
  console.error(`\n${hits.length} residue(s) found.\n`);
  process.exit(1);
}
console.log('✓ DE residue check passed (no t4( or DE labels in src/).');
