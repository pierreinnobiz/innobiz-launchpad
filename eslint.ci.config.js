// Configuration ESLint de la CI (27/11/2026).
// Reprend eslint.config.js et passe en avertissement trois règles de style dont la dette est
// antérieure à la CI (types « any », interfaces vides générées par shadcn, require() de Tailwind).
// Toutes les autres règles, dont celles des hooks React, restent bloquantes.
import tseslint from "typescript-eslint";
import base from "./eslint.config.js";

export default [
  ...base,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
];
