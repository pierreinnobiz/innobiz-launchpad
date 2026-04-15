import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const BusinessMathSection: React.FC = () => {
  const { language } = useLanguage();

  const traditionalBullets = [
    t3(language, "Un diffuseur vendu = une seule transaction. Tout le budget marketing pour un achat unique.", 'One diffuser sold = one transaction. Your entire marketing budget for a single purchase.', 'Un difusor vendido = una sola transacción. Todo el presupuesto de marketing para una compra única.'),
    t3(language, "Le client achète 2 flacons, puis arrête. Le diffuseur est trop contraignant pour un usage quotidien.", 'The customer buys 2 bottles, then stops. The diffuser is too cumbersome for daily use.', 'El cliente compra 2 frascos, luego para. El difusor es demasiado engorroso para uso diario.'),
    t3(language, "Pour chaque nouveau client, il faut réinvestir de zéro.", 'Every new customer requires reinvesting from scratch.', 'Cada nuevo cliente requiere reinvertir desde cero.'),
    t3(language, "Aucune récurrence. Aucune fidélité. Aucun revenu prévisible.", 'No recurrence. No loyalty. No predictable revenue.', 'Sin recurrencia. Sin fidelidad. Sin ingresos predecibles.'),
  ];

  const toliaBullets = [
    t3(language, "Usage immédiat, quotidien, automatique.", 'Immediate, daily, automatic usage.', 'Uso inmediato, diario, automático.'),
    t3(language, "12+ synergies Twist & Mist rachetées par an grâce à la routine installée.", '12+ Twist & Mist synergies reordered per year through the established routine.', '12+ sinergias Twist & Mist recompradas al año gracias a la rutina instalada.'),
    t3(language, "4 coffrets saisonniers par an = upsell naturel intégré au calendrier.", '4 seasonal gift sets per year = natural upsell built into the calendar.', '4 sets estacionales al año = upsell natural integrado en el calendario.'),
    t3(language, "Relation client permanente. Revenu récurrent mécanique.", 'Permanent customer relationship. Mechanical recurring revenue.', 'Relación permanente con el cliente. Ingresos recurrentes mecánicos.'),
  ];

  return (
    <section id="business-math" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      <motion.div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(28 50% 55%), transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="section-container text-white relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {t3(language, 'Le cas financier, noir sur blanc', 'The financial case, in black and white', 'El caso financiero, en blanco y negro')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {t3(language,
              'Un achat unique contre un revenu ×4, chaque année.',
              'A single purchase versus ×4 revenue, every year.',
              'Una compra única frente a ingresos ×4, cada año.'
            )}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {t3(language,
              "La rentabilité d'un diffuseur ne vient pas du matériel. Elle vient du flux de rachat d'huiles qui suit, année après année.",
              "A diffuser's profitability does not come from the hardware. It comes from the oil repurchase stream that follows, year after year.",
              'La rentabilidad de un difusor no viene del hardware. Viene del flujo de recompra de aceites que sigue, año tras año.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Traditional */}
          <motion.div variants={fadeBlurUp}
            className="rounded-2xl p-8 border h-full"
            style={{ background: 'hsl(0 0% 100% / 0.04)', borderColor: 'hsl(0 0% 100% / 0.1)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-destructive/20">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-bold text-lg text-white">{t3(language, 'Diffuseurs traditionnels', 'Traditional diffusers', 'Difusores tradicionales')}</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {traditionalBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
                  <span className="text-destructive/60 mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="rounded-xl p-4 text-center" style={{ background: 'hsl(0 0% 100% / 0.05)' }}>
              <span className="text-3xl font-bold text-white/40">×1</span>
              <span className="text-sm text-white/30 block mt-1">{t3(language, 'revenu par client. Une seule fois', 'revenue per customer. One time only', 'ingresos por cliente. Una sola vez')}</span>
            </div>
          </motion.div>

          {/* Tolia */}
          <motion.div variants={fadeBlurUp}
            className="rounded-2xl p-8 border h-full"
            style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.2)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(140 45% 45% / 0.2)' }}>
                <Check className="w-5 h-5" style={{ color: 'hsl(140 45% 55%)' }} />
              </div>
              <h3 className="font-bold text-lg text-white">{t3(language, 'Tolia + Stratégie Rituel', 'Tolia + Ritual Strategy', 'Tolia + Estrategia Ritual')}</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {toliaBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'hsl(35 20% 80%)' }}>
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'hsl(140 45% 55%)' }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="rounded-xl p-4 text-center" style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
              <span className="text-3xl font-bold" style={{ color: 'hsl(28 50% 65%)' }}>×4</span>
              <span className="text-sm block mt-1" style={{ color: 'hsl(28 50% 65% / 0.7)' }}>{t3(language, 'revenu par client, récurrent chaque année', 'revenue per customer, recurring every year', 'ingresos por cliente, recurrente cada año')}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 text-center"
          style={{ background: 'hsl(28 50% 65% / 0.1)', border: '1px solid hsl(28 50% 65% / 0.2)' }}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            {t3(language,
              'Revenu ×4 par client, cumulé année après année.',
              '×4 revenue per customer, compounding year after year.',
              'Ingresos ×4 por cliente, acumulados año tras año.'
            )}
          </p>
          <p className="text-xs text-white/40">
            {t3(language,
              "75 % de coûts SAV en moins vs. ultrasoniques (mesuré sur 10+ déploiements de marques).",
              '75% lower after-sales costs vs. ultrasonic diffusers (measured across 10+ brand deployments).',
              '75 % menos de costes posventa vs. ultrasónicos (medido en 10+ despliegues de marcas).'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessMathSection;
