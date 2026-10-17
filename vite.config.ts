import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { HOME_SEO, type HomeSeoLang } from "./src/seo/homeSeo";

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

// Pages par langue pour Google et les assistants IA (17/10/2026).
// Le site est une application JavaScript : sans elle, un robot qui ne l'exécute pas (ChatGPT, Claude, Perplexity
// quand ils lisent une page) ne voyait que le titre. Après la construction, ce module écrit dist/fr/, dist/en/ et
// dist/es/index.html, chacune avec son titre, sa description, son adresse de référence, ses traductions (hreflang),
// ses données structurées (organisation, site, produit, questions fréquentes) et le texte complet de la page en
// clair (seo/contenu-xx.html, relevé par outils/seo/instantane.sh). Ce texte est masqué dès que JavaScript
// fonctionne : l'application le remplace aussitôt par la vraie page. dist/index.html (adresse « / ») reçoit la
// version anglaise, celle que Google affiche à cette adresse.
function seoPages() {
  const SITE = "https://www.innobiz-tolia.com";
  const LANGS: HomeSeoLang[] = ["fr", "en", "es"];
  const HTML_LANG = { fr: "fr-FR", en: "en-GB", es: "es-ES" };
  const OG_LOCALE = { fr: "fr_FR", en: "en_GB", es: "es_ES" };
  const NAMES = { fr: "Français", en: "English", es: "Español" };
  const ORG_DESC = {
    fr: "Innobiz conçoit en France des diffuseurs d'huiles essentielles en marque blanche pour les marques d'aromathérapie.",
    en: "Innobiz designs white-label essential oil diffusers in France for aromatherapy brands.",
    es: "Innobiz diseña en Francia difusores de aceites esenciales de marca blanca para marcas de aromaterapia.",
  };
  const PROPS = {
    fr: [["Autonomie", "jusqu'à 90 h sans fil (70 à 90 h lumière éteinte, 16 à 20 h avec la lumière d'ambiance)"], ["Charge de la batterie", "USB-C"], ["Flacons compatibles", "flacons standard à col DIN 18, de 5 à 50 ml"], ["Eau", "aucune : l'huile essentielle est diffusée pure"], ["Changement d'huile", "1 seconde"], ["Huiles testées", "plus de 150 huiles essentielles et synergies"]],
    en: [["Battery life", "up to 90 h cordless (70 to 90 h with the light off, 16 to 20 h with the ambient light on)"], ["Charging", "USB-C"], ["Compatible bottles", "standard DIN 18 neck bottles, 5 to 50 ml"], ["Water", "none: the essential oil is diffused pure"], ["Changing oil", "1 second"], ["Oils tested", "more than 150 essential oils and blends"]],
    es: [["Autonomía", "hasta 90 h sin cables (de 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental)"], ["Carga de la batería", "USB-C"], ["Frascos compatibles", "frascos estándar con cuello DIN 18, de 5 a 50 ml"], ["Agua", "ninguna: el aceite esencial se difunde puro"], ["Cambio de aceite", "1 segundo"], ["Aceites probados", "más de 150 aceites esenciales y sinergias"]],
  };
  const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const setMeta = (html: string, attr: string, value: string) =>
    html.replace(new RegExp(`(<meta ${attr} content=")[^"]*(")`), `$1${esc(value)}$2`);

  const page = (base: string, lang: HomeSeoLang, isDefault: boolean, root: string) => {
    const seo = HOME_SEO[lang];
    const url = isDefault ? `${SITE}/` : `${SITE}/${lang}/`;
    const image = `${SITE}/og-image-${lang}.jpg`;
    let h = base.replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`);
    h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
    h = setMeta(h, 'name="description"', seo.description);
    h = setMeta(h, 'name="keywords"', seo.keywords);
    for (const [attr, value] of [['property="og:title"', seo.title], ['property="og:description"', seo.description], ['property="og:url"', url], ['property="og:locale"', OG_LOCALE[lang]], ['property="og:image"', image], ['name="twitter:title"', seo.title], ['name="twitter:description"', seo.description], ['name="twitter:image"', image]] as const) {
      h = setMeta(h, attr, value);
    }
    // adresse de référence et traductions : seulement sur les pages par langue (dist/index.html sert aussi de page de
    // secours à toutes les autres adresses, qui déclarent les leurs)
    h = h.replace(/\s*<!-- Canonical[^>]*-->\s*<link rel="canonical"[^>]*>/, "");
    h = h.replace(/\s*<!-- Single URL serves all languages[^>]*-->\s*<link rel="alternate" hreflang="x-default"[^>]*>/, "");
    const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/" />`).join("\n    ") + `\n    <link rel="alternate" hreflang="x-default" href="${SITE}/" />`;
    const links = isDefault ? "" : `\n    <link rel="canonical" href="${url}" />\n    ${alternates}`;
    // données structurées : remplacent celles d'index.html (anglaises seulement)
    h = h.replace(/\s*<!-- JSON-LD: [^>]*-->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
    const faqFile = join(root, "seo", `faq-${lang}.json`);
    const faq: { q: string; a: string }[] = existsSync(faqFile) ? JSON.parse(readFileSync(faqFile, "utf8")) : [];
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Innobiz", legalName: "INNOBIZ SARL", url: SITE, logo: `${SITE}/og-image.jpg`, description: ORG_DESC[lang],
          address: { "@type": "PostalAddress", streetAddress: "8 rue Louis Breguet", addressLocality: "Jacou", postalCode: "34830", addressCountry: "FR" },
          contactPoint: { "@type": "ContactPoint", telephone: "+33-4-67-84-89-14", email: "contact@innobiz.fr", contactType: "sales" } },
        { "@type": "WebSite", "@id": `${SITE}/#website`, name: "Tolia by Innobiz", url: `${SITE}/`, inLanguage: ["fr-FR", "en-GB", "es-ES"], publisher: { "@id": `${SITE}/#organization` } },
        { "@type": "WebPage", "@id": `${url}#page`, url, name: seo.title, description: seo.description, inLanguage: HTML_LANG[lang], isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#tolia` } },
        { "@type": "Product", "@id": `${SITE}/#tolia`, name: "Tolia", description: seo.description, brand: { "@type": "Brand", name: "Tolia" }, image, category: lang === "fr" ? "Diffuseur d'huiles essentielles" : lang === "es" ? "Difusor de aceites esenciales" : "Essential oil diffuser",
          additionalProperty: PROPS[lang].map(([name, value]) => ({ "@type": "PropertyValue", name, value })) },
        ...(faq.length ? [{ "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: HTML_LANG[lang], mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) }] : []),
      ],
    };
    const head = `${links}
    <!-- JSON-LD (pages par langue, 17/10/2026) -->
    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>
    <style>.js .seo-static{display:none}.seo-static{max-width:760px;margin:0 auto;padding:24px 16px 64px;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#2b211b;background:#faf6f0}.seo-static h1{font-size:30px;line-height:1.2}.seo-static h2{font-size:24px;margin-top:2em}.seo-static h3{font-size:19px;margin-top:1.4em}.seo-static nav a{margin-right:14px}</style>
  </head>`;
    h = h.replace(/\s*<\/head>/, head);
    // JavaScript disponible : le texte en clair reste masqué, l'application prend sa place (aucun clignotement)
    h = h.replace(/<meta charset="UTF-8" \/>/, `<meta charset="UTF-8" />\n    <script>document.documentElement.classList.add('js')</script>`);
    const contentFile = join(root, "seo", `contenu-${lang}.html`);
    if (existsSync(contentFile)) {
      const nav = LANGS.map((l) => `<a href="/${l}/" hreflang="${l}" lang="${HTML_LANG[l]}">${NAMES[l]}</a>`).join("");
      const content = readFileSync(contentFile, "utf8").trim();
      h = h.replace('<div id="root"></div>', `<div id="root"><div class="seo-static" lang="${HTML_LANG[lang]}"><nav aria-label="Langues">${nav}</nav>\n${content}\n</div></div>`);
    }
    return h;
  };

  return {
    name: "seo-pages",
    apply: "build" as const,
    closeBundle() {
      const root = __dirname;
      const dist = path.resolve(root, "dist");
      const indexFile = join(dist, "index.html");
      if (!existsSync(indexFile)) return;
      const base = readFileSync(indexFile, "utf8");
      for (const lang of LANGS) {
        mkdirSync(join(dist, lang), { recursive: true });
        writeFileSync(join(dist, lang, "index.html"), page(base, lang, false, root));
      }
      writeFileSync(indexFile, page(base, "en", true, root));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), deResidueGuard(), seoPages()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
