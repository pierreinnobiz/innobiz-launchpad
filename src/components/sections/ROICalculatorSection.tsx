import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { trackCTAClick } from '@/lib/tracking';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const BASELINE_BOTTLES = 2.5;
const TOLIA_BOTTLES = 14;
const AVG_BOTTLE_PRICE = 8.5;

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

const ROICalculatorSection: React.FC = () => {
  const { language } = useLanguage();
  const [units, setUnits] = useState(10000);

  const withoutRevenue = units * BASELINE_BOTTLES * AVG_BOTTLE_PRICE;
  const withRevenue = units * TOLIA_BOTTLES * AVG_BOTTLE_PRICE;
  const additionalRevenue = withRevenue - withoutRevenue;
  const threeYearUplift = additionalRevenue * 3;

  const rows = [
    {
      label: t3(language, 'Flacons vendus par client / an', 'Oil bottles sold per customer / year', 'Frascos vendidos por cliente / año'),
      without: BASELINE_BOTTLES.toString(),
      withTolia: TOLIA_BOTTLES.toString(),
    },
    {
      label: t3(language, 'Revenu par client / an (huiles)', 'Revenue per customer / year (oils)', 'Ingresos por cliente / año (aceites)'),
      without: fmt(BASELINE_BOTTLES * AVG_BOTTLE_PRICE),
      withTolia: fmt(TOLIA_BOTTLES * AVG_BOTTLE_PRICE),
    },
    {
      label: t3(language, "Revenu annuel total (huiles)", 'Total annual oil revenue', 'Ingresos anuales totales (aceites)'),
      without: fmt(withoutRevenue),
      withTolia: fmt(withRevenue),
    },
    {
      label: t3(language, 'Revenu récurrent additionnel', 'Additional recurring revenue', 'Ingresos recurrentes adicionales'),
      without: '—',
      withTolia: fmt(additionalRevenue),
      highlight: true,
    },
    {
      label: t3(language, 'Uplift cumulé sur 3 ans', '3-year cumulative uplift', 'Incremento acumulado a 3 años'),
      without: '—',
      withTolia: fmt(threeYearUplift),
      highlight: true,
    },
  ];

  return (
    <section id="roi-calculator" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 93%) 0%, hsl(35 28% 95%) 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeBlurUp}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5" style={{ color: 'hsl(28 45% 48%)' }} />
            <span className="font-semibold text-sm tracking-wide uppercase" style={{ color: 'hsl(28 45% 48%)' }}>
              {t3(language, 'Simulateur de revenus', 'Revenue simulator', 'Simulador de ingresos')}
            </span>
          </div>
          <h2 className="heading-section mb-4">
            {t3(language, 'Que représenterait Tolia pour votre marque ?', 'What would Tolia mean for your brand? Run the numbers.', '¿Qué significaría Tolia para su marca?')}
          </h2>
        </motion.div>

        <motion.div
          className="bg-card rounded-3xl p-6 md:p-10 border border-border/50 shadow-lg"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              {t3(language, 'Combien de diffuseurs votre marque vend-elle par an ?', 'How many diffusers does your brand sell per year?', '¿Cuántos difusores vende su marca al año?')}
            </label>
            <div className="flex items-center gap-4">
              <Slider
                value={[units]}
                onValueChange={(v) => setUnits(v[0])}
                min={1000}
                max={100000}
                step={1000}
                className="flex-1"
              />
              <span className="text-2xl font-bold tabular-nums min-w-[100px] text-right" style={{ color: 'hsl(28 45% 48%)' }}>
                {units.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30">
                  <th className="text-left p-3 md:p-4 font-medium text-muted-foreground w-2/5"></th>
                  <th className="text-center p-3 md:p-4 font-bold text-muted-foreground/60 w-[30%]">
                    {t3(language, 'Sans Tolia', 'Without Tolia', 'Sin Tolia')}
                  </th>
                  <th className="text-center p-3 md:p-4 font-bold w-[30%]" style={{ color: 'hsl(28 45% 48%)' }}>
                    {t3(language, 'Avec Tolia', 'With Tolia', 'Con Tolia')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i < rows.length - 1 ? 'border-b border-border/40' : ''}>
                    <td className="p-3 md:p-4 font-medium text-muted-foreground text-xs md:text-sm">{row.label}</td>
                    <td className="p-3 md:p-4 text-center text-muted-foreground/60">{row.without}</td>
                    <td className={`p-3 md:p-4 text-center font-bold ${row.highlight ? 'text-lg' : ''}`}
                      style={row.highlight ? { color: 'hsl(28 45% 48%)' } : {}}>
                      {row.withTolia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a href="#contact" onClick={() => trackCTAClick('roi_calculator_cta', 'roi-calculator')}>
              <Button className="btn-hero-primary group">
                {t3(language, 'Demander un business case personnalisé', 'Request a custom business case', 'Solicitar un caso de negocio personalizado')}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              {t3(language, 'Sans engagement · Réponse sous 24h', 'No commitment required · Response within 24 hours', 'Sin compromiso · Respuesta en 24 horas')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
