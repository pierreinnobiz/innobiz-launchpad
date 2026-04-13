import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertTriangle, Archive } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import closetImg from '@/assets/closet-syndrome.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const ClosetSyndromeSection: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: ShoppingCart,
      day: t3(language, 'Jour 0', 'Day 0', 'Día 0'),
      title: t3(language, "La vente parfaite", 'The perfect sale', 'La venta perfecta'),
      desc: t3(language,
        "Votre client achète le diffuseur. Budget marketing dépensé, espace en rayon occupé, la vente est conclue. Mais posez-vous cette question : combien de flacons d'huiles ce client va-t-il acheter dans les 12 prochains mois ? La réponse vous coûte des millions.",
        "Your customer buys the diffuser. Marketing budget spent, shelf space allocated, sale closed. But ask yourself this: how many oil bottles will this customer buy in the next 12 months? The answer is costing you millions.",
        'Su cliente compra el difusor. Presupuesto de marketing gastado, espacio en estantería asignado, venta cerrada. Pero hágase esta pregunta: ¿cuántos frascos de aceite comprará este cliente en los próximos 12 meses? La respuesta le está costando millones.'
      ),
      color: 'hsl(140 45% 45%)',
    },
    {
      icon: AlertTriangle,
      day: t3(language, 'Jour 30–180', 'Day 30–180', 'Día 30–180'),
      title: t3(language, "L'abandon silencieux", 'The silent drop-off', 'El abandono silencioso'),
      desc: t3(language,
        "Remplir le réservoir, doser les gouttes, nettoyer après chaque utilisation. Un geste de 10 secondes se transforme en corvée de 5 minutes. L'usage passe de quotidien à hebdomadaire, puis mensuel. Les flacons d'huile prennent la poussière. Votre flux de revenus récurrents s'assèche sans que vous le sachiez.",
        "Fill the tank, measure the drops, clean after every use. A 10-second gesture becomes a 5-minute chore. Usage drops from daily to weekly, then monthly. Oil bottles gather dust. Your recurring revenue stream dries up and you never even notice.",
        'Llenar el depósito, dosificar las gotas, limpiar después de cada uso. Un gesto de 10 segundos se convierte en una tarea de 5 minutos. El uso baja de diario a semanal, luego mensual. Los frascos de aceite acumulan polvo. Su flujo de ingresos recurrentes se seca sin que usted lo note.'
      ),
      color: 'hsl(35 70% 50%)',
    },
  ];

  return (
    <section id="closet-syndrome" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(0 65% 55%), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block text-destructive">
            {t3(language, 'Le syndrome du placard', 'The closet syndrome', 'El síndrome del armario')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "60 % des diffuseurs vendus finissent dans un placard en moins de 6 mois. Chacun d'eux emporte avec lui des années de rachats d'huiles.",
              "60% of diffusers sold end up in a cupboard within 6 months. Each one takes years of oil repurchases with it.",
              'El 60 % de los difusores vendidos terminan en un armario en menos de 6 meses. Cada uno se lleva consigo años de recompras de aceites.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              "Le problème n'est ni votre marque, ni votre marketing, ni vos huiles. C'est le diffuseur lui-même qui est conçu pour échouer.",
              "The problem is not your brand, your marketing, or your oils. The diffuser itself is designed to fail.",
              'El problema no es su marca, ni su marketing, ni sus aceites. El difusor mismo está diseñado para fallar.'
            )}
          </p>
        </motion.div>

        {/* Day 0 and Day 30-180 cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-6 relative"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeBlurUp} className="relative">
              <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 h-full
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(25_15%_18%/0.12)] hover:-translate-y-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${step.color} / 0.1` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: step.color }}>
                  {step.day}
                </span>
                <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Day 180+ card with image on right */}
        <motion.div
          className="mb-10"
          variants={fadeBlurUp}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="bg-card rounded-2xl border border-border/40 overflow-hidden
            transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(25_15%_18%/0.12)]">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'hsl(0 60% 50% / 0.1)' }}
                >
                  <Archive className="w-6 h-6" style={{ color: 'hsl(0 60% 50%)' }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: 'hsl(0 60% 50%)' }}>
                  {t3(language, 'Jour 180+', 'Day 180+', 'Día 180+')}
                </span>
                <h3 className="font-bold text-foreground text-lg mb-2">
                  {t3(language, 'Le placard. Définitivement.', 'The closet. Permanently.', 'El armario. Permanentemente.')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t3(language,
                    "Le diffuseur rejoint le cimetière des appareils. Plus d'achat d'huiles. Plus de recharges. Plus aucun lien avec votre marque. Votre coût d'acquisition client a produit une seule vente de matériel — et zéro euro de revenu récurrent. Multipliez par le nombre de clients et vous mesurez l'ampleur de la fuite.",
                    "The diffuser joins the appliance graveyard. No more oil purchases. No refills. No brand connection. Your customer acquisition cost produced exactly one hardware sale — and zero recurring revenue. Multiply by your customer base and the scale of the leak becomes clear.",
                    'El difusor se une al cementerio de aparatos. No más compras de aceites. No más recargas. No más conexión con su marca. Su coste de adquisición de clientes produjo exactamente una venta de hardware — y cero ingresos recurrentes. Multiplique por su base de clientes y la magnitud de la fuga se hace evidente.'
                  )}
                </p>
              </div>
              <div className="md:w-2/5 flex-shrink-0">
                <img
                  src={closetImg}
                  alt={t3(language,
                    'Diffuseurs abandonnés dans un placard',
                    'Abandoned diffusers collecting dust in a closet',
                    'Difusores abandonados en un armario'
                  )}
                  className="w-full h-full object-cover min-h-[200px]"
                  loading="lazy"
                  width={1024}
                  height={576}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Takeaway */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-base md:text-lg leading-relaxed font-semibold text-center text-foreground">
            {t3(language,
              <>Diffuseur traditionnel : <strong>2 à 3 flacons</strong> achetés par an. Diffuseur utilisé chaque jour : <strong>12 flacons ou plus</strong>. C'est un revenu par client <strong>multiplié par 4 à 6</strong>, chaque année, sans augmenter vos dépenses marketing d'un seul euro.</>,
              <>Traditional diffuser: <strong>2 to 3 bottles</strong> purchased per year. Diffuser used daily: <strong>12 bottles or more</strong>. That is per-customer revenue <strong>multiplied by 4 to 6</strong>, every year, without spending a single extra marketing euro.</>,
              <>Difusor tradicional: <strong>2 a 3 frascos</strong> comprados al año. Difusor usado a diario: <strong>12 frascos o más</strong>. Eso es un ingreso por cliente <strong>multiplicado por 4 a 6</strong>, cada año, sin gastar un solo euro extra en marketing.</>
            )}
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4 font-light">
            {t3(language,
              "Données mesurées sur plus de 10 déploiements de marques en Europe.",
              'Measured across 10+ brand deployments in European markets.',
              'Medido en más de 10 despliegues de marcas en mercados europeos.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosetSyndromeSection;
