import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackCTAClick, trackEvent } from '@/lib/tracking';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const LeadMagnetSection: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    trackCTAClick('lead_magnet_submit', 'lead-magnet');
    trackEvent('generate_lead', { method: 'lead_magnet' });
    // Simulate submission delay
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section id="lead-magnet" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 93%) 0%, hsl(35 28% 95%) 100%)' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeBlurUp}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
            <FileText className="w-7 h-7" style={{ color: 'hsl(28 45% 48%)' }} />
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(140 45% 45%)' }} />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t3(language, 'Votre deck est en route !', 'Your deck is on its way!', '¡Su deck está en camino!')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t3(language, `Vérifiez votre boîte de réception (${email}). Le PDF arrive dans quelques minutes.`, `Check your inbox (${email}). The PDF will arrive in a few minutes.`, `Revise su bandeja de entrada (${email}). El PDF llegará en unos minutos.`)}
              </p>
            </motion.div>
          ) : (
            <>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {t3(language, 'Pas encore prêt à discuter ? Obtenez les chiffres.', 'Not ready to talk yet? Get the numbers first.', '¿Aún no está listo para hablar? Obtenga los números primero.')}
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
                {t3(language,
                  'Téléchargez notre deck partenaires — données marché, modèle économique, études de cas et options de partenariat en un seul document.',
                  'Download our brand partner deck — market data, business model, case studies, and partnership options in one document.',
                  'Descargue nuestro deck de socios — datos de mercado, modelo de negocio, estudios de caso y opciones de colaboración en un solo documento.'
                )}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="rounded-xl flex-1"
                />
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t3(language, 'Entreprise', 'Company', 'Empresa') as string}
                  className="rounded-xl flex-1"
                />
                <Button type="submit" className="btn-hero-primary group whitespace-nowrap" disabled={isLoading}>
                  {isLoading
                    ? t3(language, 'Envoi...', 'Sending...', 'Enviando...')
                    : t3(language, 'Télécharger le deck', 'Download the deck', 'Descargar el deck')
                  }
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                {t3(language, 'PDF envoyé instantanément. Pas de relance sauf demande de votre part.', 'PDF delivered instantly. No follow-up calls unless you ask.', 'PDF enviado al instante. Sin llamadas de seguimiento a menos que lo solicite.')}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
