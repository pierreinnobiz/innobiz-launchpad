import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Dev-only audit screen.
 * Scans every section / key component file at build time, extracts every
 * t3(language, fr, en, es) call and flags:
 *   - hard-coded JSX text not wrapped in t3()
 *   - t3() entries where one of the three languages is missing / equal to another
 */

// Eager-load raw source for all sections + the two recently-fixed components.
const sources = import.meta.glob(
  [
    '/src/components/sections/*.tsx',
    '/src/components/Navigation.tsx',
    '/src/components/Footer.tsx',
    '/src/components/QualificationForm.tsx',
    '/src/components/WhiteLabelShowcase.tsx',
    '/src/components/TechnologyHero.tsx',
    '/src/components/TechnologyExplained.tsx',
  ],
  { as: 'raw', eager: true }
) as Record<string, string>;

type T3Entry = { fr: string; en: string; es: string; line: number; issues: string[] };
type HardcodedHit = { text: string; line: number };
type DeHit = { text: string; line: number; kind: string };

interface FileReport {
  path: string;
  name: string;
  usesUseLanguage: boolean;
  usesT3: boolean;
  t3Entries: T3Entry[];
  hardcoded: HardcodedHit[];
  partial: T3Entry[];
  deResidues: DeHit[];
}

const T3_REGEX =
  /t3\s*\(\s*language\s*,\s*(['"`])((?:\\.|(?!\1).)*?)\1\s*,\s*(['"`])((?:\\.|(?!\3).)*?)\3\s*,\s*(['"`])((?:\\.|(?!\5).)*?)\5\s*\)/g;

// JSX text node: ">Some text<", excluding mustaches and tag attrs.
const JSX_TEXT_REGEX = />([^<>{}\n]{15,})</g;

const ALLOWED_HARDCODED = new Set<string>([
  'Tolia',
  'Innobiz',
  'Pierre-Emmanuel Thuret',
]);

function unescape(s: string): string {
  return s.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`');
}

function lineOf(src: string, idx: number): number {
  return src.slice(0, idx).split('\n').length;
}

function analyze(path: string, src: string): FileReport {
  const t3Entries: T3Entry[] = [];
  const partial: T3Entry[] = [];
  const hardcoded: HardcodedHit[] = [];

  // 1) collect t3() entries
  let m: RegExpExecArray | null;
  while ((m = T3_REGEX.exec(src))) {
    const fr = unescape(m[2]);
    const en = unescape(m[4]);
    const es = unescape(m[6]);
    const issues: string[] = [];
    if (!fr.trim()) issues.push('FR vide');
    if (!en.trim()) issues.push('EN vide');
    if (!es.trim()) issues.push('ES vide');
    if (fr.trim() && en.trim() && fr.trim() === en.trim()) issues.push('FR = EN');
    if (en.trim() && es.trim() && en.trim() === es.trim()) issues.push('EN = ES');
    if (fr.trim() && es.trim() && fr.trim() === es.trim()) issues.push('FR = ES');
    const entry: T3Entry = { fr, en, es, line: lineOf(src, m.index), issues };
    t3Entries.push(entry);
    if (issues.length) partial.push(entry);
  }

  // 2) hardcoded JSX text. Skip if file's source includes t3 ref already (best-effort).
  let h: RegExpExecArray | null;
  while ((h = JSX_TEXT_REGEX.exec(src))) {
    const raw = h[1].trim();
    if (!raw) continue;
    if (!/[a-zA-Z]/.test(raw)) continue;
    if (!/\s/.test(raw)) continue; // single-word tokens often layout, not copy
    if (ALLOWED_HARDCODED.has(raw)) continue;
    // Skip if it's pure template like {something}
    if (raw.startsWith('{') || raw.endsWith('}')) continue;
    hardcoded.push({ text: raw, line: lineOf(src, h.index) });
  }

  // 3) DE residue scan — should be empty after DE removal.
  const deResidues: DeHit[] = [];
  const DE_PATTERNS: RegExp[] = [
    /['"`]de['"`]\s*[,)\]]/g,      // 'de' as a value in arrays/args
    /\blang\s*===?\s*['"`]de['"`]/g,
    /\blanguage\s*===?\s*['"`]de['"`]/g,
    /\bcode\s*:\s*['"`]de['"`]/g,
    /lang=de\b/g,
    /\bt4\s*\(/g,
    />\s*DE\s*</g,                  // a "DE" button label
  ];
  for (const re of DE_PATTERNS) {
    let d: RegExpExecArray | null;
    while ((d = re.exec(src))) {
      deResidues.push({ text: d[0], line: lineOf(src, d.index) });
    }
  }

  return {
    path,
    name: path.split('/').pop()!.replace('.tsx', ''),
    usesUseLanguage: /useLanguage\s*\(/.test(src),
    usesT3: /\bt3\s*\(/.test(src),
    t3Entries,
    hardcoded,
    partial,
    deResidues,
  };
}

const LanguageAudit: React.FC = () => {
  const reports = useMemo<FileReport[]>(() => {
    return Object.entries(sources)
      .map(([path, src]) => analyze(path, src))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const totals = useMemo(() => {
    return reports.reduce(
      (acc, r) => {
        acc.t3 += r.t3Entries.length;
        acc.partial += r.partial.length;
        acc.hardcoded += r.hardcoded.length;
        acc.deResidues += r.deResidues.length;
        if (!r.usesUseLanguage) acc.noLang += 1;
        return acc;
      },
      { t3: 0, partial: 0, hardcoded: 0, noLang: 0, deResidues: 0 }
    );
  }, [reports]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <Link to="/" className="text-xs text-muted-foreground hover:underline">
            ← Retour au site
          </Link>
          <h1 className="text-3xl font-bold">Language Audit</h1>
          <p className="text-sm text-muted-foreground">
            Audit statique limité aux trois langues officielles : <strong>FR</strong>, <strong>EN</strong>, <strong>ES</strong>.
            Détecte aussi tout résidu lié à la langue DE (retirée du site).
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <Stat label="Fichiers analysés" value={reports.length} />
            <Stat label="Entrées t3()" value={totals.t3} />
            <Stat label="Entrées partielles" value={totals.partial} tone={totals.partial ? 'warn' : 'ok'} />
            <Stat label="Textes en dur suspects" value={totals.hardcoded} tone={totals.hardcoded ? 'warn' : 'ok'} />
            <Stat label="Sans useLanguage" value={totals.noLang} tone={totals.noLang ? 'warn' : 'ok'} />
            <Stat label="Résidus DE" value={totals.deResidues} tone={totals.deResidues ? 'warn' : 'ok'} />
          </div>
        </header>

        <div className="space-y-6">
          {reports.map((r) => {
            const status =
              !r.usesUseLanguage && r.t3Entries.length === 0
                ? 'no-i18n'
                : r.partial.length || r.hardcoded.length || r.deResidues.length
                  ? 'warn'
                  : 'ok';
            return (
              <section
                key={r.path}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Badge tone={status}>
                      {status === 'ok' ? 'OK' : status === 'no-i18n' ? 'NO i18n' : 'À corriger'}
                    </Badge>
                    <h2 className="font-semibold">{r.name}</h2>
                    <code className="text-[10px] text-muted-foreground">{r.path}</code>
                  </div>
                  <div className="text-xs text-muted-foreground space-x-3">
                    <span>{r.t3Entries.length} clés</span>
                    <span className={r.partial.length ? 'text-amber-600' : ''}>
                      {r.partial.length} partielles
                    </span>
                    <span className={r.hardcoded.length ? 'text-red-600' : ''}>
                      {r.hardcoded.length} en dur
                    </span>
                    <span className={r.deResidues.length ? 'text-red-600' : ''}>
                      {r.deResidues.length} résidu DE
                    </span>
                  </div>
                </div>

                {r.t3Entries.length > 0 && (
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Clés de traduction (t3)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="text-muted-foreground">
                          <tr className="text-left">
                            <th className="py-1 pr-3 w-12">L.</th>
                            <th className="py-1 pr-3">FR</th>
                            <th className="py-1 pr-3">EN</th>
                            <th className="py-1 pr-3">ES</th>
                            <th className="py-1 pr-3">Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.t3Entries.map((e, i) => (
                            <tr
                              key={i}
                              className={`align-top border-t border-border/50 ${
                                e.issues.length ? 'bg-amber-50/40' : ''
                              }`}
                            >
                              <td className="py-1 pr-3 text-muted-foreground">{e.line}</td>
                              <td className="py-1 pr-3">{e.fr || <em className="text-red-600">—</em>}</td>
                              <td className="py-1 pr-3">{e.en || <em className="text-red-600">—</em>}</td>
                              <td className="py-1 pr-3">{e.es || <em className="text-red-600">—</em>}</td>
                              <td className="py-1 pr-3 text-amber-700">
                                {e.issues.length ? e.issues.join(', ') : '✓'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {r.hardcoded.length > 0 && (
                  <div className="px-4 py-3">
                    <h3 className="text-xs uppercase tracking-wider text-red-700 mb-2">
                      Textes en dur suspects
                    </h3>
                    <ul className="space-y-1 text-xs">
                      {r.hardcoded.map((h, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-muted-foreground w-12">L.{h.line}</span>
                          <span className="font-mono">{h.text}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Heuristique : texte JSX &gt; 15 caractères avec espaces, hors t3(). Faux positifs possibles
                      (icônes, attributs alt déjà traduits via variables, etc.).
                    </p>
                  </div>
                )}

                {r.deResidues.length > 0 && (
                  <div className="px-4 py-3 border-t border-border">
                    <h3 className="text-xs uppercase tracking-wider text-red-700 mb-2">
                      Résidus DE à supprimer
                    </h3>
                    <ul className="space-y-1 text-xs">
                      {r.deResidues.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-muted-foreground w-12">L.{d.line}</span>
                          <span className="font-mono">{d.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!r.usesUseLanguage && r.t3Entries.length === 0 && (
                  <div className="px-4 py-3 text-xs text-muted-foreground">
                    Ce fichier n'utilise pas useLanguage et ne contient pas d'appels t3(). Vérifier
                    manuellement s'il contient du contenu visible à l'utilisateur.
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: number; tone?: 'ok' | 'warn' }> = ({
  label,
  value,
  tone,
}) => (
  <div
    className={`px-3 py-2 rounded border ${
      tone === 'warn'
        ? 'border-amber-300 bg-amber-50 text-amber-900'
        : tone === 'ok'
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
          : 'border-border bg-card'
    }`}
  >
    <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

const Badge: React.FC<{ tone: 'ok' | 'warn' | 'no-i18n'; children: React.ReactNode }> = ({
  tone,
  children,
}) => {
  const cls =
    tone === 'ok'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
      : tone === 'warn'
        ? 'bg-amber-100 text-amber-800 border-amber-300'
        : 'bg-muted text-muted-foreground border-border';
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${cls}`}>
      {children}
    </span>
  );
};

export default LanguageAudit;
