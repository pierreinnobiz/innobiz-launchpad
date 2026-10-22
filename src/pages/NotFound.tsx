import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { t3 } from "@/lib/t3";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      {/* 21/10/2026 (audit Lovable) : l'hébergeur répond 200 à toute adresse ; on dit à Google de ne pas indexer cette page */}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{t3(language, 'Page introuvable | Tolia', 'Page not found | Tolia', 'Página no encontrada | Tolia')}</title>
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t3(language, 'Cette page est introuvable.', 'This page could not be found.', 'No se encuentra esta página.')}</p>
        <a href={`/${language}/`} className="text-primary underline hover:text-primary/90">
          {t3(language, "Retour à l'accueil", 'Back to the home page', 'Volver a la página de inicio')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
