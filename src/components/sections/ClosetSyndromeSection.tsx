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
      title: t3(language, "L'achat enthousiaste", 'The excited purchase', 'La compra entusiasta'),
      desc: t3(language,
        "Votre client voit la pub, entre en magasin et achète le diffuseur. Vous avez investi en campagnes, packaging et espace en rayon. La vente est faite, mais c'est la dernière fois que ce client génère un revenu significatif.",
        "Your customer sees the ad, walks into the store and buys the diffuser. You invested in campaigns, packaging, shelf space. The sale goes through, but it is the last time this customer will generate meaningful revenue.",
        'Su cliente ve el anuncio, entra en la tienda y compra el difusor. Usted invirtió en campañas, packaging, espacio en estantería. La venta se hizo, pero es la última vez que este cliente generará ingresos significativos.'
      ),
      color: 'hsl(140 45% 45%)',
    },
    {
      icon: AlertTriangle,
      day: t3(language, 'Jour 30–180', 'Day 30–180', 'Día 30–180'),
      title: t3(language, 'Le mur de friction', 'The friction wall', 'El muro de fricción'),
      desc: t3(language,
        "Remplir le réservoir, ajouter des gouttes, nettoyer après chaque utilisation, attendre l'évaporation. Ce qui devrait être un geste de 10 secondes devient une corvée de 5 à 7 minutes. L'usage passe de quotidien à hebdomadaire, puis mensuel. Les flacons d'huile restent intouchés.",
        "Fill the tank, add drops, clean after each use, wait for evaporation. What should be a 10-second gesture becomes a 5 to 7 minute chore. Usage drops from daily to weekly, then monthly. The oil bottles sit untouched.",
        'Llenar el depósito, añadir gotas, limpiar después de cada uso, esperar la evaporación. Lo que debería ser un gesto de 10 segundos se convierte en una tarea de 5 a 7 minutos. El uso baja de diario a semanal, luego mensual. Los frascos de aceite quedan intactos.'
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
            {t3(language, 'Le problème dont personne ne parle', 'The problem no one talks about', 'El problema del que nadie habla')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Vous investissez des milliers d'euros pour acquérir un client. Six mois plus tard, son diffuseur est au placard et il ne rachète plus jamais d'huiles.",
              "You invest thousands to acquire a customer. Six months later, their diffuser is in a cupboard and they never buy oils again.",
              'Invierte miles en adquirir un cliente. Seis meses después, su difusor está en un armario y nunca vuelve a comprar aceites.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              "Ce n'est ni un échec de branding ni une erreur marketing. C'est un problème de conception produit.",
              "This is not a branding failure or a marketing mistake. It is a product design problem.",
              'No es un fallo de branding ni un error de marketing. Es un problema de diseño de producto.'
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
                    "Le diffuseur rejoint le cimetière des appareils. Plus d'achat d'huiles. Plus de recharges. Plus de relation de marque. L'ensemble de votre investissement marketing a produit une seule vente de matériel, et zéro revenu récurrent.",
                    "The diffuser joins the appliance graveyard. No more oil purchases. No refills. No brand relationship. All of your marketing investment produced exactly one hardware sale and zero recurring revenue.",
                    'El difusor se une al cementerio de aparatos. No más compras de aceites. No más recargas. No más relación de marca. Toda su inversión de marketing produjo exactamente una venta de hardware y cero ingresos recurrentes.'
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
              "Le calcul est implacable : avec un diffuseur traditionnel, le client moyen achète 2 à 3 flacons d'huile essentielle par an. Avec un diffuseur qu'il utilise vraiment chaque jour, ce chiffre passe à 12 ou plus. Cela signifie un revenu par client multiplié par 4 à 6, chaque année.",
              "Here is the arithmetic that matters: with a traditional diffuser, the average customer buys 2 to 3 bottles of essential oil per year. With a diffuser they actually use every day, that number jumps to 12 or more. That means 4× to 6× more revenue per customer, every single year.",
              'Este es el cálculo que importa: con un difusor tradicional, el cliente promedio compra 2 a 3 frascos de aceite esencial al año. Con un difusor que realmente usa cada día, ese número sube a 12 o más. Eso significa multiplicar por 4 a 6 los ingresos por cliente, cada año.'
            )}
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4 font-light">
            {t3(language,
              "Données issues de ventes réelles sur plus de 10 déploiements de marques à travers les marchés européens.",
              'Based on actual sales data from over 10 brand deployments across European markets.',
              'Basado en datos reales de ventas de más de 10 despliegues de marcas en mercados europeos.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosetSyndromeSection;
