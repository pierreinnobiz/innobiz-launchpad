import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
// 22/10/2026 : fichiers « tous jeux de caractères » avec unicode-range : le navigateur ne télécharge que ce que la page utilise
// (avant : latin + latin-ext toujours téléchargés, 10 fichiers et 294 Ko au lieu de 5)
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./index.css";
import { captureSessionAttribution } from "./lib/attribution";

captureSessionAttribution();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
