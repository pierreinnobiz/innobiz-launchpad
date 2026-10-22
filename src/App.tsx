import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useWave2Tracking } from "@/hooks/useWave2Tracking";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { isHomePath } from "@/lib/langPath";

import Index from "./pages/Index";
import ProspectTracker from "./components/ProspectTracker";
import CookieConsent from "./components/CookieConsent";
const Legal = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.default })));
const Privacy = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.Privacy })));
const Cookies = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.Cookies })));
const Auth = React.lazy(() => import("./pages/Auth"));
const Admin = React.lazy(() => import("./pages/Admin"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

// L'ancienne page FAQ séparée (/faq, anciens textes) renvoie vers la FAQ de la page d'accueil (17/10/2026) :
// les anciens liens et les résultats de recherche continuent de fonctionner.
const LegacyFaq = () => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: '/', search, hash: '#faq' }} replace />;
};

// L'ancienne page /contact (formulaires en anglais, « 48 heures ») renvoie vers le formulaire de la page d'accueil,
// dans la langue du visiteur (22/10/2026, point F3).
const LegacyContact = () => {
  const { search } = useLocation();
  const { language } = useLanguage();
  return <Navigate to={{ pathname: `/${language}/`, search, hash: '#contact' }} replace />;
};

// 22/10/2026 (points E1 et E2) : les données structurées de l'accueil (FAQ, produit…) sont retirées des autres pages,
// et les pages internes (/auth, /admin) sont exclues de Google.
const SeoParAdresse = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isHomePath(pathname)) document.getElementById('ld-accueil')?.remove();
  }, [pathname]);
  return /^\/(auth|admin)(\/|$)/.test(pathname) ? (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  ) : null;
};

const AppRoutes = () => {
  useWave2Tracking();
  return (
    <>
      <ScrollToTop />
      <SeoParAdresse />
      <ProspectTracker />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* une adresse par langue pour la page d'accueil (référencement, 17/10/2026) */}
          <Route path="/fr" element={<Index />} />
          <Route path="/en" element={<Index />} />
          <Route path="/es" element={<Index />} />
          <Route path="/faq" element={<LegacyFaq />} />
          <Route path="/contact" element={<LegacyContact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </>
  );
};

// 22/10/2026 (point D5) : la connexion (AuthProvider) et les notifications (Sonner) ne servent qu'aux pages /auth et /admin :
// elles y sont chargées, et ne pèsent plus sur la page d'accueil ; react-query et les bulles d'aide n'étaient utilisés nulle part.
const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
