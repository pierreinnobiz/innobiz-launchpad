import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { useWave2Tracking } from "@/hooks/useWave2Tracking";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import React, { Suspense } from "react";

import Index from "./pages/Index";
import ProspectTracker from "./components/ProspectTracker";
import CookieConsent from "./components/CookieConsent";
const Contact = React.lazy(() => import("./pages/Contact"));
const Legal = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.default })));
const Privacy = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.Privacy })));
const Cookies = React.lazy(() => import("./pages/Legal").then(m => ({ default: m.Cookies })));
const Auth = React.lazy(() => import("./pages/Auth"));
const Admin = React.lazy(() => import("./pages/Admin"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const LanguageAudit = React.lazy(() => import("./pages/LanguageAudit"));

const queryClient = new QueryClient();

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

const AppRoutes = () => {
  useWave2Tracking();
  return (
    <>
      <ScrollToTop />
      <ProspectTracker />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<LegacyFaq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/language-audit" element={<LanguageAudit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
