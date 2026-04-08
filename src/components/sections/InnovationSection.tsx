import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Battery, SlidersHorizontal, RefreshCw, Volume2, Flower2, SprayCan, ArrowRight, Gift, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import toliaBaseDetail from '@/assets/tolia-base-detail.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const InnovationSection: React.FC = () => {
  const { language } = useLanguage();
  const l = language;

  const highlights: { icon: LucideIcon; label: string }[] = [
    { icon: RefreshCw, label: t3(l, 'Changement instantané d\'HE', 'Instant EO change', 'Cambio instantáneo de AE') },
    { icon: Droplets, label: t3(l, '99,8 % des HE compatibles', '99.8% of EOs compatible', '99,8 % de AE compatibles') },
    { icon: SprayCan, label: t3(l, 'Parfums d\'intérieur', 'Home fragrances', 'Fragancias para el hogar') },
    { icon: Flower2, label: t3(l, 'Hydrolats compatibles', 'Compatible hydrosols', 'Hidrolatos compatibles') },
    { icon: Battery, label: t3(l, "50 h d'autonomie", "50 h battery life", "50 h de autonomía") },
    { icon: SlidersHorizontal, label: t3(l, '3 modes de diffusion', '3 diffusion modes', '3 modos de difusión') },
    { icon: Volume2, label: t3(l, 'Totalement silencieux', 'Completely silent', 'Totalmente silencioso') },
  ];

  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(30 25% 93%) 0%, hsl(30 40% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Innovation — Twist &amp; Mist
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Un diffuseur, un geste : changez d\'huile essentielle en une seconde', 'One diffuser, one gesture: switch essential oil in a second', 'Un difusor, un gesto: cambie de aceite esencial en un segundo')}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <motion.div className="flex-1 space-y-5" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t3(l,
                'Grâce à son module de diffusion interchangeable et à la technologie Twist & Mist, Tolia permet de passer d\'une huile essentielle à une autre en une seconde — sans eau, sans nettoyage, en silence total. Compatible avec les flacons DIN 18 (5 à 50 ml), il remplace à lui seul la quasi‑totalité des diffuseurs du marché.',
                'Thanks to its interchangeable diffusion module and Twist & Mist technology, Tolia lets you switch from one essential oil to another in a second — no water, no cleaning, in complete silence. Compatible with DIN 18 bottles (5 to 50 ml), it single-handedly replaces virtually every diffuser on the market.',
                'Gracias a su módulo de difusión intercambiable y la tecnología Twist & Mist, Tolia permite cambiar de un aceite esencial a otro en un segundo — sin agua, sin limpieza, en completo silencio. Compatible con frascos DIN 18 (5 a 50 ml), reemplaza por sí solo prácticamente todos los difusores del mercado.'
              )}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t3(l,
                'Un seul appareil couvre 99,8 % des huiles essentielles, 100 % des synergies, les parfums d\'intérieur et les hydrolats compatibles — avec trois modes de diffusion, un minuteur 1 h / 2 h / 4 h et 50 h d\'autonomie sur batterie lithium remplaçable, rechargeable en USB‑C.',
                'A single device covers 99.8% of essential oils, 100% of blends, home fragrances and compatible hydrosols — with three diffusion modes, a 1 h / 2 h / 4 h timer and 50 h battery life on a replaceable lithium battery, rechargeable via USB-C.',
                'Un solo dispositivo cubre el 99,8 % de los aceites esenciales, el 100 % de las sinergias, las fragancias para el hogar y los hidrolatos compatibles — con tres modos de difusión, un temporizador de 1 h / 2 h / 4 h y 50 h de autonomía con batería de litio reemplazable, recargable por USB-C.'
              )}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t3(l,
                <>Fort de 20 ans de conception de systèmes de diffusion propriétaires pour l'industrie du parfum et du bien-être, Tolia est la synthèse d'un savoir‑faire terrain : fiable, universel, conçu pour soutenir un vrai modèle de récurrence. <strong className="text-foreground">Votre futur standard de diffusion.</strong></>,
                <>Drawing on 20 years designing proprietary diffusion systems for the fragrance and wellness industry, Tolia is the culmination of real-world know-how: reliable, universal, designed to support a genuine recurring-revenue model. <strong className="text-foreground">Your future diffusion standard.</strong></>,
                <>Con 20 años diseñando sistemas de difusión propietarios para la industria de la perfumería y el bienestar, Tolia es la síntesis de un conocimiento de campo: fiable, universal, diseñado para sostener un verdadero modelo de recurrencia. <strong className="text-foreground">Su futuro estándar de difusión.</strong></>
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {highlights.map((h, i) => (
                <motion.div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/50 bg-card" initial={{ opacity: 0, y: 12, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                  <h.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(28 45% 48%)' }} />
                  <span className="text-xs font-medium">{h.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex-1 max-w-md lg:max-w-lg" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={toliaBaseDetail} alt={t3(l, "Base du diffuseur Tolia montrant les boutons de minuterie, modes de diffusion et port USB‑C", "Tolia diffuser base showing timer buttons, diffusion modes and USB-C port", "Base del difusor Tolia mostrando botones de temporizador, modos de difusión y puerto USB-C")} className="w-full h-auto object-cover no-select" draggable={false} loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'innovation')}>
              <Button className="btn-hero-primary group">
                <Gift className="w-5 h-5" />
                {ctaText}
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationSection;
