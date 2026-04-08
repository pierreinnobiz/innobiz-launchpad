import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const RitualStrategySection: React.FC = () => {
  const { language } = useLanguage();

  const seasons = [
    { emoji: '🌸', name: t3(language, 'Printemps', 'Spring', 'Primavera'), morning: t3(language, 'Réveil énergisant', 'Energetic Awakening', 'Despertar energizante'), day: t3(language, 'Focus actif', 'Active Focus', 'Enfoque activo'), evening: t3(language, 'Détente légère', 'Light Unwind', 'Relajación suave') },
    { emoji: '☀️', name: t3(language, 'Été', 'Summer', 'Verano'), morning: t3(language, 'Fraîcheur matinale', 'Morning Freshness', 'Frescura matutina'), day: t3(language, 'Énergie lumineuse', 'Luminous Energy', 'Energía luminosa'), evening: t3(language, 'Nuit paisible', 'Peaceful Night', 'Noche tranquila') },
    { emoji: '🍂', name: t3(language, 'Automne', 'Autumn', 'Otoño'), morning: t3(language, 'Ancrage doux', 'Gentle Grounding', 'Arraigo suave'), day: t3(language, 'Boost immunitaire', 'Immune Boost', 'Impulso inmunitario'), evening: t3(language, 'Cocooning profond', 'Deep Cocooning', 'Cocooning profundo') },
    { emoji: '❄️', name: t3(language, 'Hiver', 'Winter', 'Invierno'), morning: t3(language, 'Réveil tonique', 'Tonic Wake-Up', 'Despertar tónico'), day: t3(language, 'Défenses naturelles', 'Natural Defenses', 'Defensas naturales'), evening: t3(language, 'Calme enveloppant', 'Warming Calm', 'Calma envolvente') },
  ];

  const moments = [
    t3(language, 'Matin', 'Morning', 'Mañana'),
    t3(language, 'Journée', 'Day', 'Día'),
    t3(language, 'Soir', 'Evening', 'Noche'),
  ];

  return (
    <section id="ritual-strategy" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(35 28% 95%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'La Stratégie Rituel — votre nouveau moteur de croissance', 'The Ritual Strategy — your new growth engine', 'La Estrategia Ritual — su nuevo motor de crecimiento')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Arrêtez de vendre des huiles au hasard. Créez 12 occasions de rachat intégrées par an — par client.",
              "Stop selling oils randomly. Create 12 built-in repurchase occasions per year — per customer.",
              'Deje de vender aceites al azar. Cree 12 ocasiones de recompra integradas al año — por cliente.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              <>Aujourd'hui, votre client achète des huiles essentielles quand il y pense — peut-être 2 ou 3 fois par an, de manière imprévisible. Avec le cadre rituel de Tolia, vous structurez votre gamme d'huiles autour de <strong className="text-foreground">4 saisons × 3 moments quotidiens</strong>, créant 12 rituels bien-être clairement identifiés. Chaque rituel = une synergie d'huile vendue = un achat prévisible et répétable.</>,
              <>Today, your customer buys essential oils when they remember — maybe 2 or 3 times a year, unpredictably. With Tolia's ritual framework, you structure your oil range around <strong className="text-foreground">4 seasons × 3 daily moments</strong>, creating 12 clearly identified wellness rituals. Each ritual = one oil synergy sold = one predictable, repeatable purchase.</>,
              <>Hoy, su cliente compra aceites esenciales cuando se acuerda — quizás 2 o 3 veces al año, de forma impredecible. Con el marco ritual de Tolia, estructura su gama de aceites en torno a <strong className="text-foreground">4 estaciones × 3 momentos diarios</strong>, creando 12 rituales de bienestar claramente identificados. Cada ritual = una sinergia de aceite vendida = una compra predecible y repetible.</>
            )}
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          className="hidden md:block max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
                  <th className="text-left p-4 font-semibold text-foreground w-1/4">{t3(language, 'Saison', 'Season', 'Estación')}</th>
                  {moments.map((m) => (
                    <th key={String(m)} className="text-left p-4 font-semibold text-foreground w-1/4">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasons.map((s, i) => (
                  <tr key={i} className="border-t border-border/40">
                    <td className="p-4 font-semibold text-foreground">
                      <span className="mr-2">{s.emoji}</span>{s.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{s.morning}</td>
                    <td className="p-4 text-muted-foreground">{s.day}</td>
                    <td className="p-4 text-muted-foreground">{s.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div
          className="md:hidden space-y-4 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {seasons.map((s, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="rounded-2xl p-5 bg-card border border-border/40">
              <h4 className="font-bold text-base mb-3">
                <span className="mr-2">{s.emoji}</span>{s.name}
              </h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {[s.morning, s.day, s.evening].map((ritual, j) => (
                  <div key={j}>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground block">{moments[j]}</span>
                    <span className="text-foreground/80">{ritual}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Conversion block */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border mb-10"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base md:text-lg leading-relaxed font-medium text-center text-foreground mb-4">
            <strong>{t3(language,
              "12 rituels saisonniers = 12 achats d'huile par client par an — mécanique et prévisible.",
              '12 seasonal rituals = 12 oil purchases per customer per year — mechanical and predictable.',
              '12 rituales estacionales = 12 compras de aceite por cliente al año — mecánico y predecible.'
            )}</strong>
          </p>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            <strong className="text-foreground">{t3(language, 'Sans Tolia :', 'Without Tolia:', 'Sin Tolia:')}</strong> {t3(language,
              "2 à 3 flacons d'huile essentielle achetés par client par an. Timing aléatoire. Pas de fidélité. Pas de prévisibilité.",
              '2–3 essential oil bottles purchased per customer per year. Random timing. No loyalty. No predictability.',
              '2–3 frascos de aceite esencial comprados por cliente al año. Timing aleatorio. Sin fidelidad. Sin previsibilidad.'
            )}<br />
            <strong className="text-foreground">{t3(language, 'Avec Tolia + Stratégie Rituel :', 'With Tolia + Ritual Strategy:', 'Con Tolia + Estrategia Ritual:')}</strong> {t3(language,
              "12+ synergies d'huile ciblées par client par an. Guidé par les saisons. Créateur d'habitude. Automatiquement récurrent.",
              '12+ targeted oil synergies per customer per year. Season-driven. Habit-forming. Automatically recurring.',
              '12+ sinergias de aceite dirigidas por cliente al año. Guiado por estaciones. Creador de hábitos. Automáticamente recurrente.'
            )}<br />
            <strong className="text-foreground">{t3(language,
              "Le résultat : consommation d'huile multipliée par 4× à 6× — sans aucune augmentation de budget marketing.",
              'The result: oil consumption multiplied by 4× to 6× — without any increase in marketing spend.',
              'El resultado: consumo de aceite multiplicado por 4× a 6× — sin aumento de gasto en marketing.'
            )}</strong>
          </p>
        </motion.div>

        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t3(language,
            "Avec Tolia, changer d'huile essentielle devient aussi naturel que changer de playlist. Énergie le matin, focus l'après-midi, calme le soir — votre client construit une habitude quotidienne, et votre marque capte le revenu qui va avec.",
            "With Tolia, changing essential oils becomes as natural as switching a playlist. Morning energy, afternoon focus, evening calm — your customer builds a daily habit, and your brand captures the revenue that comes with it.",
            'Con Tolia, cambiar de aceite esencial se vuelve tan natural como cambiar de playlist. Energía por la mañana, enfoque por la tarde, calma por la noche — su cliente construye un hábito diario, y su marca captura los ingresos que vienen con él.'
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default RitualStrategySection;
