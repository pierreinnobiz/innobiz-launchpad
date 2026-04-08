import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Volume2, Archive, Coffee, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import diffusersAbandoned from '@/assets/diffusers-abandoned-closet.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const ProblemSection: React.FC = () => {
  const { language: l } = useLanguage();

  const frictions = [
    { icon: Archive, text: t3(l, "C'est le syndrome de la yaourtière : on l'achète avec enthousiasme, on l'utilise trois semaines… puis elle finit au fond du placard. Les diffuseurs traditionnels suivent exactement le même cycle.", "It's the yoghurt-maker syndrome: you buy it with enthusiasm, use it for three weeks… then it ends up at the back of a cupboard. Traditional diffusers follow exactly the same cycle.", "Es el síndrome de la yogurtera: se compra con entusiasmo, se usa tres semanas… y acaba en el fondo del armario. Los difusores tradicionales siguen exactamente el mismo ciclo.") },
    { icon: Droplets, text: t3(l, "Eau à remplir, gouttes à compter, nettoyage après chaque usage, bruit, câbles : chaque friction supprime une occasion d'utilisation. L'aromathérapie devient une corvée plutôt qu'un plaisir.", "Water to fill, drops to count, cleaning after each use, noise, cables: every friction point removes an occasion of use. Aromatherapy becomes a chore rather than a pleasure.", "Agua que llenar, gotas que contar, limpieza después de cada uso, ruido, cables: cada punto de fricción elimina una ocasión de uso. La aromaterapia se convierte en una tarea en lugar de un placer.") },
    { icon: Volume2, text: t3(l, "Résultat : 60 % des diffuseurs sont utilisés moins de 3 fois par mois après 6 mois. Vos synergies, pourtant efficaces, restent sur l'étagère.", "Result: 60% of diffusers are used fewer than 3 times a month after 6 months. Your blends, however effective, stay on the shelf.", "Resultado: el 60 % de los difusores se usan menos de 3 veces al mes después de 6 meses. Sus sinergias, aunque eficaces, se quedan en la estantería.") },
  ];

  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section id="probleme" className="section-padding bg-background relative overflow-hidden">
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(0 65% 52%)' }}>
            {t3(l, 'Le constat marché', 'Market insight', 'Análisis del mercado')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Pourquoi 60 % des diffuseurs finissent dans un placard', 'Why 60% of diffusers end up in a cupboard', 'Por qué el 60 % de los difusores acaban en un armario')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto mb-12">
          <motion.div className="space-y-5" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {frictions.map((f, i) => (
              <div key={i} className="flex gap-4 p-5 bg-muted/40 rounded-2xl border border-border/40">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}

            <motion.div className="p-5 rounded-2xl border border-border/50 bg-card mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(28 45% 48%)' }} />
                <span className="font-bold text-sm">{t3(l, 'L\'effet Nespresso appliqué à l\'aromathérapie', 'The Nespresso effect applied to aromatherapy', 'El efecto Nespresso aplicado a la aromaterapia')}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t3(l, 'Nespresso n\'a pas vendu du café, mais un geste : insérer une capsule, appuyer, déguster. Tolia applique la même logique à vos huiles essentielles — visser le flacon, appuyer, diffuser. Zéro friction, usage quotidien garanti, consommation récurrente de vos synergies.', 'Nespresso didn\'t sell coffee — it sold a gesture: insert a capsule, press, enjoy. Tolia applies the same logic to your essential oils — screw in the bottle, press, diffuse. Zero friction, guaranteed daily use, recurring consumption of your blends.', 'Nespresso no vendió café, vendió un gesto: insertar una cápsula, pulsar, disfrutar. Tolia aplica la misma lógica a sus aceites esenciales — enroscar el frasco, pulsar, difundir. Cero fricción, uso diario garantizado, consumo recurrente de sus sinergias.')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={diffusersAbandoned} alt={t3(l, "Placard avec des diffuseurs abandonnés sur trois étagères", "Cupboard with abandoned diffusers on three shelves", "Armario con difusores abandonados en tres estantes")} className="w-full h-full object-cover rounded-3xl no-select" draggable={false} loading="lazy" decoding="async" />
          </motion.div>
        </div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'problem')}>
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

export default ProblemSection;
