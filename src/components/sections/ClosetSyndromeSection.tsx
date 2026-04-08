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
        "Votre client voit la pub, entre en magasin et achète le diffuseur. Vous avez investi en campagnes, packaging, espace en rayon. La vente est faite, mais c'est la dernière fois que ce client génèrera un revenu significatif.",
        "Your customer sees the ad, walks into the store, and buys the diffuser. You invested in campaigns, packaging, shelf space. The sale is made, but it's the last time this customer will generate meaningful revenue.",
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
        "Fill the tank, add drops, clean after each use, wait for evaporation. What should be a 10-second moment becomes a 5–7 minute chore. Usage drops from daily to weekly, then monthly. The oil bottles sit untouched.",
        'Llenar el depósito, añadir gotas, limpiar después de cada uso, esperar la evaporación. Lo que debería ser un gesto de 10 segundos se convierte en una tarea de 5 a 7 minutos. El uso baja de diario a semanal, luego mensual. Los frascos de aceite quedan intactos.'
      ),
      color: 'hsl(35 70% 50%)',
    },
    {
      icon: Archive,
      day: t3(language, 'Jour 180+', 'Day 180+', 'Día 180+'),
      title: t3(language, 'Le placard. Définitivement.', 'The closet. Permanently.', 'El armario. Permanentemente.'),
      desc: t3(language,
        "Le diffuseur rejoint le cimetière des appareils. Plus d'achats d'huiles. Plus de recharges. Plus de relation de marque. Tout votre investissement marketing a produit exactement une seule vente de matériel, et zéro revenu récurrent.",
        "The diffuser joins the appliance graveyard. No more oil purchases. No refills. No brand relationship. Your entire marketing investment produced exactly one hardware sale, and zero recurring revenue.",
        'El difusor se une al cementerio de aparatos. No más compras de aceites. No más recargas. No más relación de marca. Toda su inversión de marketing produjo exactamente una venta de hardware, y cero ingresos recurrentes.'
      ),
      color: 'hsl(0 60% 50%)',
    },
  ];

  return (
    <section id="closet-syndrome" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(0 65% 55%), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block text-destructive">
            {t3(language, 'Le problème dont personne ne parle', 'The problem no one talks about', 'El problema del que nadie habla')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Vous dépensez des milliers pour acquérir un client. Six mois plus tard, son diffuseur est au placard, et il ne rachète plus jamais d'huiles.",
              "You spend thousands acquiring a customer. Six months later, their diffuser is in a closet, and they never buy oils again.",
              'Gasta miles en adquirir un cliente. Seis meses después, su difusor está en un armario, y nunca vuelve a comprar aceites.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              "Ce n'est pas un échec de branding ni une erreur marketing. C'est un problème de conception produit. Chaque diffuseur conventionnel crée une friction qui tue l'usage quotidien, et avec lui, votre revenu récurrent en huiles.",
              "This isn't a branding failure or a marketing mistake. It's a product design problem. Every conventional diffuser creates friction that kills daily use, and with it, your recurring oil revenue.",
              'No es un fallo de branding ni un error de marketing. Es un problema de diseño de producto. Cada difusor convencional crea una fricción que mata el uso diario, y con él, sus ingresos recurrentes de aceites.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={closetImg}
            alt={t3(language,
              'Diffuseurs abandonnés dans un placard. La fuite de revenus invisible',
              'Abandoned diffusers collecting dust in a closet. The invisible revenue leak',
              'Difusores abandonados en un armario. La fuga de ingresos invisible'
            )}
            className="w-full h-auto"
            loading="lazy"
            width={1024}
            height={576}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16 relative"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          <div className="hidden md:block absolute top-14 left-[16.67%] right-[16.67%] h-[2px]"
            style={{ background: 'linear-gradient(90deg, hsl(140 45% 45% / 0.3), hsl(35 70% 50% / 0.3), hsl(0 60% 50% / 0.3))' }} />

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
              "Voici le calcul qui compte : avec un diffuseur traditionnel, le client moyen achète 2 à 3 flacons d'huile essentielle par an. Avec un diffuseur qu'il utilise vraiment chaque jour, ce chiffre passe à 12+. C'est la différence entre 46 € et 164 € de revenu annuel, par client.",
              "Here's the math that matters: with a traditional diffuser, the average customer buys 2–3 bottles of essential oil per year. With a diffuser they actually use every day, that number jumps to 12+. That's the difference between €46 and €164 in annual revenue, per customer.",
              'Aquí está el cálculo que importa: con un difusor tradicional, el cliente promedio compra 2–3 frascos de aceite esencial al año. Con un difusor que realmente usa cada día, ese número sube a 12+. Es la diferencia entre 46 € y 164 € de ingresos anuales, por cliente.'
            )}
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4 font-light">
            {t3(language,
              "Basé sur des données de ventes réelles de plus de 10 déploiements de marques sur les marchés européens.",
              'Based on real sales data from 10+ brand deployments across European markets.',
              'Basado en datos reales de ventas de más de 10 despliegues de marcas en mercados europeos.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosetSyndromeSection;
