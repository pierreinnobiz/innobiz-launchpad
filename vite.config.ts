import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Fails the build if any DE-language residue (t4(, >DE<, 'de' lang refs) is found in src/.
function deResidueGuard() {
  const patterns: { name: string; re: RegExp }[] = [
    { name: "t4(", re: /\bt4\s*\(/g },
    { name: ">DE< label", re: />\s*DE\s*</g },
    { name: "'de' value", re: /['"`]de['"`]\s*[,)\]]/g },
    { name: "lang === de", re: /\blang\s*===?\s*['"`]de['"`]/g },
    { name: "language === de", re: /\blanguage\s*===?\s*['"`]de['"`]/g },
    { name: "code: de", re: /\bcode\s*:\s*['"`]de['"`]/g },
    { name: "lang=de", re: /\blang=de\b/g },
  ];
  const root = path.resolve(__dirname, "src");
  const exclude = new Set([path.join(root, "pages", "LanguageAudit.tsx")]);
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full, out);
      else if (/\.(t|j)sx?$/.test(entry)) out.push(full);
    }
    return out;
  };
  const plugin = {
    name: "de-residue-guard",
    apply: "build" as const,
    buildStart() {
      const hits: string[] = [];
      for (const file of walk(root)) {
        if (exclude.has(file)) continue;
        const src = readFileSync(file, "utf8");
        for (const { name, re } of patterns) {
          re.lastIndex = 0;
          let m: RegExpExecArray | null;
          while ((m = re.exec(src))) {
            const line = src.slice(0, m.index).split("\n").length;
            hits.push(`  ${path.relative(__dirname, file)}:${line}  [${name}]  ${m[0]}`);
          }
        }
      }
      if (hits.length) {
        throw new Error(
          `DE residue check failed — remove the following before building:\n${hits.join("\n")}\n\n${hits.length} residue(s) found.`
        );
      }
    },
  };
  return plugin;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), deResidueGuard()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
