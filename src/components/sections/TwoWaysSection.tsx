import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Paintbrush, Package, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import MagneticButton from '@/components/MagneticButton';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const comparisonRows = [
  { label: 'Ideal for', wl: 'Brands building a signature diffuser line', stock: 'Brands adding Tolia to an existing range' },
  { label: 'Branding', wl: 'Fully custom (unit, capsules, packaging)', stock: 'Branded Tolia, co-branded packaging option' },
  { label: 'MOQ', wl: 'On request (project-based)', stock: '300 to 500 pieces' },
  { label: 'Lead time', wl: '12 to 20 weeks', stock: 'Ships from stock, 2 to 4 weeks' },
  { label: 'Customization', wl: 'Full — color, logo, capsule blends, box', stock: 'Co-branded sleeve, neutral inner packaging' },
  { label: 'Time to launch', wl: '3 to 6 months', stock: 'Under 1 month' },
];

const TwoWaysSection: React.FC = () => {
  const cards = [
    {
      icon: Paintbrush,
      title: 'Launch Tolia under your own brand',
      subtitle: 'For brands building a signature diffuser line',
      bullets: [
        'Custom branding and packaging',
        'Co-developed blend range',
        'Full industrial and regulatory support',
        'MOQ on request — tailored to your launch plan',
      ],
      cta: 'Request a white-label quote',
      href: '/contact?type=white-label',
      trackLabel: 'white-label-quote',
      accent: 'hsl(28 45% 48%)',
    },
    {
      icon: Package,
      title: 'Add Tolia to your catalog — ready to ship',
      subtitle: 'For brands that want to offer Tolia without a white-label program',
      bullets: [
        'Units available from stock',
        'Minimum order: 300 pieces',
        'Delivered as branded Tolia (not white-labeled)',
        'Fastest time-to-market — ideal to test the category before committing to a full white-label line',
      ],
      cta: 'Order Tolia units',
      href: '/contact?type=order',
      trackLabel: 'order-300',
      accent: 'hsl(220 40% 45%)',
    },
  ];

  return (
    <section id="two-ways" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Go-to-market options
          </span>
          <h2 className="heading-section mb-4">
            Two ways to work with Tolia
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Whether you want a signature diffuser under your own brand, or a proven product ready to add to your range today — Tolia adapts to your go-to-market.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-3xl p-8 md:p-10 border bg-card flex flex-col h-full"
              style={{ borderColor: `${card.accent} / 0.2` }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: `0 20px 40px -12px ${card.accent.replace(')', ' / 0.15)')}` }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${card.accent} / 0.1` }}>
                <card.icon className="w-6 h-6" style={{ color: card.accent }} />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{card.subtitle}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: card.accent }} />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton>
                <a href={card.href} onClick={() => trackCTAClick(card.cta, card.trackLabel)}>
                  <Button
                    className="w-full font-semibold text-base py-4 rounded-2xl group"
                    style={{ background: card.accent, color: 'hsl(0 0% 100%)' }}
                  >
                    {card.cta}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* Comparison table — desktop */}
        <motion.div
          className="hidden md:block max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left p-4 font-medium text-muted-foreground w-1/4"></th>
                  <th className="text-left p-4 font-bold text-foreground w-[37.5%]" style={{ color: 'hsl(28 45% 48%)' }}>White Label</th>
                  <th className="text-left p-4 font-bold text-foreground w-[37.5%]" style={{ color: 'hsl(220 40% 45%)' }}>Stock Order</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i < comparisonRows.length - 1 ? 'border-b border-border/40' : ''}>
                    <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                    <td className="p-4 text-foreground/90">{row.wl}</td>
                    <td className="p-4 text-foreground/90">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Comparison table — mobile (stacked cards) */}
        <motion.div
          className="md:hidden space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { title: 'White Label', color: 'hsl(28 45% 48%)', key: 'wl' as const },
            { title: 'Stock Order', color: 'hsl(220 40% 45%)', key: 'stock' as const },
          ].map((col) => (
            <div key={col.key} className="rounded-2xl border border-border/60 bg-card p-6">
              <h4 className="font-bold text-lg mb-4" style={{ color: col.color }}>{col.title}</h4>
              <dl className="space-y-3">
                {comparisonRows.map((row, i) => (
                  <div key={i}>
                    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{row.label}</dt>
                    <dd className="text-sm text-foreground/90 mt-0.5">{row[col.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TwoWaysSection;
