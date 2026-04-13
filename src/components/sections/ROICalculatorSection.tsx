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
  const multiplier = (TOLIA_BOTTLES / BASELINE_BOTTLES).toFixed(1);

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
            {t3(language, 'Que représenterait Tolia pour votre marque ?', 'What would Tolia mean for your brand?', '¿Qué significaría Tolia para su marca?')}
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

          {/* Visual results instead of table */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl" style={{ background: 'hsl(28 45% 48% / 0.06)' }}>
              <p className="text-xs text-muted-foreground mb-1">
                {t3(language, 'Sans Tolia', 'Without Tolia', 'Sin Tolia')}
              </p>
              <p className="text-xl font-bold text-muted-foreground/60">{fmt(withoutRevenue)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{BASELINE_BOTTLES} {t3(language, 'flacons/client/an', 'bottles/customer/year', 'frascos/cliente/año')}</p>
            </div>
            <div className="text-center p-4 rounded-xl border-2" style={{ borderColor: 'hsl(28 45% 48%)', background: 'hsl(28 45% 48% / 0.08)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(28 45% 48%)' }}>
                {t3(language, 'Avec Tolia', 'With Tolia', 'Con Tolia')}
              </p>
              <p className="text-2xl font-bold" style={{ color: 'hsl(28 45% 48%)' }}>{fmt(withRevenue)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{TOLIA_BOTTLES} {t3(language, 'flacons/client/an', 'bottles/customer/year', 'frascos/cliente/año')}</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'hsl(140 40% 50% / 0.08)' }}>
              <p className="text-xs text-muted-foreground mb-1">
                {t3(language, 'Revenu additionnel', 'Additional revenue', 'Ingresos adicionales')}
              </p>
              <p className="text-2xl font-bold" style={{ color: 'hsl(140 40% 45%)' }}>+{fmt(additionalRevenue)}</p>
              <p className="text-[10px] font-semibold mt-1" style={{ color: 'hsl(140 40% 45%)' }}>×{multiplier}</p>
            </div>
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
