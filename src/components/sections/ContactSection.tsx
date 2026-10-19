import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Check, Copy, Mail, Phone } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import { calendlyUrl, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '@/lib/links';
import QualificationForm from '@/components/QualificationForm';

/**
 * Contact (refonte du 17/10/2026, demande de Pierre : « revoir la logique du call to action », « enlever recevoir la documentation ») :
 * deux portes d'entrée côte à côte, sans engagement :
 *  1. recevoir un échantillon (formulaire en deux étapes, trois champs obligatoires au départ) ;
 *  2. en parler : réserver 30 minutes en visio avec Simon Desbuisson, écrire ou appeler.
 * La présentation par email (« recevoir la documentation ») est retirée : tout est déjà sur le site.
 */
const ContactSection: React.FC = () => {
  const { language: l } = useLanguage();
  const [copied, setCopied] = useState(false);
  const talk = t3(l, 'Réserver 30 min avec Simon', 'Book 30 min with Simon', 'Reservar 30 min con Simon');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* copie refusée par le navigateur : l'adresse reste affichée et sélectionnable */ }
  };

  const reassure = [
    t3(l, 'Échantillon expédié de France sous 5 jours ouvrés', 'Sample shipped from France within 5 business days', 'Muestra enviada desde Francia en 5 días hábiles'),
    t3(l, 'Une vraie personne vous répond sous un jour ouvré', 'A real person replies within one business day', 'Una persona real le responde en un día hábil'),
    t3(l, 'Prix et conditions partagés dès le premier échange', 'Pricing and terms shared from first contact', 'Precios y condiciones desde el primer contacto'),
  ];

  return (
    <section id="contact" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Passons à l’essai', 'Let’s try it', 'Pasemos a la práctica')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(l, 'Jugez Tolia par vous‑même, avec vos propres flacons.', 'Judge Tolia for yourself, with your own bottles.', 'Compruébelo usted mismo, con sus propios frascos.')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              l,
              'Deux façons de commencer, sans engagement : recevez un échantillon pour l’essayer, ou prenez 30 minutes avec Simon Desbuisson pour parler de votre projet.',
              'Two ways to begin, with no commitment: receive a sample to try it, or take 30 minutes with Simon Desbuisson to talk about your project.',
              'Dos formas de empezar, sin compromiso: reciba una muestra para probarlo o dedique 30 minutos con Simon Desbuisson a hablar de su proyecto.'
            )}
          </p>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <motion.div
            className="bg-card rounded-3xl p-6 md:p-9 border border-border/50 shadow-lg"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <QualificationForm />
          </motion.div>

          <motion.aside
            className="rounded-3xl border border-border/50 bg-card p-6 md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeBlurUp}
            aria-labelledby="contact-talk-title"
          >
            <h3 id="contact-talk-title" className="text-xl md:text-2xl font-bold text-foreground">
              {t3(l, 'Vous préférez en parler ?', 'Prefer to talk it through?', '¿Prefiere hablarlo?')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {t3(
                l,
                '30 minutes en visio avec Simon Desbuisson, de l’équipe Innobiz, pour voir Tolia en direct, poser vos questions et vérifier qu’il convient à votre gamme. Vous choisissez le créneau dans son agenda.',
                '30 minutes on video with Simon Desbuisson from the Innobiz team, to see Tolia live, ask your questions and check it fits your range. Pick a time in his calendar.',
                '30 minutos por videollamada con Simon Desbuisson, del equipo Innobiz, para ver Tolia en directo, plantear sus preguntas y comprobar que encaja con su gama. Elija el horario en su agenda.'
              )}
            </p>
            <a
              href={calendlyUrl('contact')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick(talk, 'contact', 'call_booking')}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              style={{ background: '#B17743' }}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {talk}
            </a>

            <div className="mt-6 space-y-3 border-t border-border/60 pt-5 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t3(l, 'Ou contactez-nous directement', 'Or contact us directly', 'O contáctenos directamente')}
              </p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-none text-muted-foreground" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Tolia')}`}
                  onClick={() => trackCTAClick('email', 'contact', 'email')}
                  className="font-medium text-foreground underline-offset-4 hover:underline select-all"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied ? t3(l, 'Copiée', 'Copied', 'Copiada') : t3(l, 'Copier', 'Copy', 'Copiar')}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-none text-muted-foreground" aria-hidden="true" />
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
              {reassure.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'hsl(145 35% 34%)' }} aria-hidden="true" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
