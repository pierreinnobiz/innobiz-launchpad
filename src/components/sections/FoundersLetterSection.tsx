import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';

const FoundersLetterSection: React.FC = () => {
  const { language } = useLanguage();

  const letterEN = (
    <>
      <p className="mb-5">To every brand that believes essential oils can be part of people's daily lives,</p>
      <p className="mb-5">For 20 years, I have been building diffusers. Dozens of models. Millions of units sold. And yet, something kept bothering me.</p>
      <p className="mb-5">Consumers buy diffusers with enthusiasm. They believe in the benefits of essential oils for sleep, for focus, for energy, for calm. But within a few months, something breaks. Not the product. The habit.</p>
      <p className="mb-5">The diffuser is too complicated. Too slow to prepare. Too messy to clean. Too rigid to adapt to different moments of the day. And gradually, it gets pushed to the back of a shelf. Then into a closet. And the oils? They stop being purchased altogether.</p>
      <p className="mb-5">I have seen this pattern repeat across every technology on the market: ultrasonic, heat, passive, classic nebulizer. Each one fails the daily-use test for a different reason. But the result is always the same: the consumer gives up. And for the brands behind those oils, it means one thing: the recurring revenue they invested so much to build simply evaporates.</p>
      <p className="mb-5">That is the problem I decided to solve. Not by building a better diffuser. By eliminating every single friction that stands between a consumer and their daily essential oil ritual.</p>
      <p className="mb-5">18 months of focused R&D. One obsession: make using essential oils as simple as turning on the lights.</p>
      <p className="mb-5">The result is Twist & Mist, a proprietary system where you screw, clip, and press. No water. No cleaning. No measuring. Change blends in under a second. Use it morning, noon and night. Take it from room to room. From home to office. From winter immunity rituals to summer freshness routines.</p>
      <p className="mb-5">Tolia is the first diffuser built on this technology. It will not be the last. But it is the proof that when you remove all friction from the experience, something remarkable happens: people do not just use their diffuser. They build a ritual around it. And they buy oils not once, not twice, but twelve times a year.</p>
      <p className="mb-5">For aromatherapy brands, this changes everything. It means your customers finally stay. Their consumption becomes predictable, recurring, and growing. Your marketing ROI compounds instead of resetting to zero with every new customer acquisition.</p>
      <p className="mb-5">I built Tolia for the brands that understand this: the future of aromatherapy is not about selling more diffusers. It is about making essential oils a daily, year-round companion, and capturing the recurring value that comes with it.</p>
      <p>If that is the future you want to build for your brand, I would like to show you how.</p>
    </>
  );

  const letterFR = (
    <>
      <p className="mb-5">À toutes les marques qui croient que les huiles essentielles peuvent faire partie du quotidien,</p>
      <p className="mb-5">Depuis 20 ans, je conçois des diffuseurs. Des dizaines de modèles. Des millions d'unités vendues. Et pourtant, quelque chose continuait de me préoccuper.</p>
      <p className="mb-5">Les consommateurs achètent des diffuseurs avec enthousiasme. Ils croient aux bienfaits des huiles essentielles pour le sommeil, la concentration, l'énergie, la sérénité. Mais en quelques mois, quelque chose se brise. Pas le produit. L'habitude.</p>
      <p className="mb-5">Le diffuseur est trop compliqué. Trop long à préparer. Trop salissant à nettoyer. Trop rigide pour s'adapter aux différents moments de la journée. Petit à petit, il recule sur l'étagère. Puis dans un placard. Et les huiles ? Elles ne sont plus jamais rachetées.</p>
      <p className="mb-5">J'ai vu ce schéma se répéter avec chaque technologie du marché : ultrasonique, chaleur, passif, nébuliseur classique. Chacune échoue au test de l'usage quotidien pour une raison différente. Mais le résultat est toujours le même : le consommateur abandonne. Et pour les marques derrière ces huiles, cela signifie une chose : le revenu récurrent qu'elles ont tant investi à construire s'évapore tout simplement.</p>
      <p className="mb-5">C'est le problème que j'ai décidé de résoudre. Pas en construisant un meilleur diffuseur. En éliminant chaque friction qui se dresse entre le consommateur et son rituel quotidien aux huiles essentielles.</p>
      <p className="mb-5">18 mois de R&D concentrée. Une seule obsession : rendre l'utilisation des huiles essentielles aussi simple qu'allumer la lumière.</p>
      <p className="mb-5">Le résultat s'appelle Twist & Mist : un système propriétaire où l'on visse, clipse et appuie. Pas d'eau. Pas de nettoyage. Pas de dosage. Changement de synergie en moins d'une seconde. Utilisation matin, midi et soir. D'une pièce à l'autre. De la maison au bureau. Des rituels d'immunité hivernale aux routines de fraîcheur estivale.</p>
      <p className="mb-5">Tolia est le premier diffuseur construit sur cette technologie. Ce ne sera pas le dernier. Mais c'est la preuve que lorsqu'on supprime toute friction de l'expérience, quelque chose de remarquable se produit : les gens ne se contentent plus d'utiliser leur diffuseur. Ils construisent un rituel autour. Et ils achètent des huiles non pas une fois, ni deux, mais douze fois par an.</p>
      <p className="mb-5">Pour les marques d'aromathérapie, cela change tout. Cela signifie que vos clients restent enfin. Leur consommation devient prévisible, récurrente et croissante. Votre ROI marketing se cumule au lieu de repartir de zéro à chaque nouvelle acquisition client.</p>
      <p className="mb-5">J'ai conçu Tolia pour les marques qui comprennent ceci : l'avenir de l'aromathérapie ne consiste pas à vendre plus de diffuseurs. Il consiste à faire des huiles essentielles un compagnon quotidien, toute l'année, et à capturer la valeur récurrente qui en découle.</p>
      <p>Si c'est l'avenir que vous voulez construire pour votre marque, j'aimerais vous montrer comment.</p>
    </>
  );

  const letterES = (
    <>
      <p className="mb-5">A todas las marcas que creen que los aceites esenciales pueden ser parte de la vida diaria,</p>
      <p className="mb-5">Durante 20 años, he estado construyendo difusores. Docenas de modelos. Millones de unidades vendidas. Y sin embargo, algo seguía preocupándome.</p>
      <p className="mb-5">Los consumidores compran difusores con entusiasmo. Creen en los beneficios de los aceites esenciales para el sueño, la concentración, la energía, la calma. Pero en pocos meses, algo se rompe. No el producto. El hábito.</p>
      <p className="mb-5">El difusor es demasiado complicado. Demasiado lento de preparar. Demasiado sucio de limpiar. Demasiado rígido para adaptarse a los diferentes momentos del día. Poco a poco, retrocede en la estantería. Luego al armario. Y los aceites? Dejan de comprarse por completo.</p>
      <p className="mb-5">He visto este patrón repetirse con cada tecnología del mercado: ultrasónica, calor, pasiva, nebulizador clásico. Cada una falla en la prueba del uso diario por una razón diferente. Pero el resultado es siempre el mismo: el consumidor se rinde. Y para las marcas detrás de esos aceites, significa una cosa: los ingresos recurrentes que tanto invirtieron en construir simplemente se evaporan.</p>
      <p className="mb-5">Ese es el problema que decidí resolver. No construyendo un mejor difusor. Eliminando cada fricción que se interpone entre el consumidor y su ritual diario de aceites esenciales.</p>
      <p className="mb-5">18 meses de I+D concentrada. Una obsesión: hacer que usar aceites esenciales sea tan simple como encender la luz.</p>
      <p className="mb-5">El resultado es Twist & Mist: un sistema propietario donde se enrosca, se engancha y se presiona. Sin agua. Sin limpieza. Sin medición. Cambio de mezcla en menos de un segundo. Uso por la mañana, al mediodía y por la noche. De habitación en habitación. De casa a la oficina. De rituales de inmunidad invernal a rutinas de frescura veraniega.</p>
      <p className="mb-5">Tolia es el primer difusor construido sobre esta tecnología. No será el último. Pero es la prueba de que cuando se elimina toda fricción de la experiencia, algo notable ocurre: la gente no solo usa su difusor. Construye un ritual a su alrededor. Y compra aceites no una vez, ni dos, sino doce veces al año.</p>
      <p className="mb-5">Para las marcas de aromaterapia, esto lo cambia todo. Significa que sus clientes finalmente se quedan. Su consumo se vuelve predecible, recurrente y creciente. Su ROI de marketing se acumula en lugar de reiniciarse a cero con cada nueva adquisición de cliente.</p>
      <p className="mb-5">Construí Tolia para las marcas que entienden esto: el futuro de la aromaterapia no consiste en vender más difusores. Consiste en hacer de los aceites esenciales un compañero diario, durante todo el año, y capturar el valor recurrente que viene con ello.</p>
      <p>Si ese es el futuro que quiere construir para su marca, me gustaría mostrarle cómo.</p>
    </>
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 93%) 0%, hsl(35 35% 95%) 100%)' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="relative rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, hsl(40 40% 96%) 0%, hsl(38 35% 93%) 100%)',
            transform: 'rotate(-0.5deg)',
            border: '1px solid hsl(35 30% 88%)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          <div className="relative z-10" style={{ fontFamily: "'Caveat', cursive", color: '#1a1a2e' }}>
            <div className="text-lg md:text-xl leading-relaxed">
              {language === 'fr' ? letterFR : language === 'es' ? letterES : letterEN}
            </div>

            {/* Signature */}
            <div className="mt-10 pt-6 border-t" style={{ borderColor: 'hsl(25 15% 78%)' }}>
              <p className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
                Pierre-Emmanuel Thuret
              </p>
              <p className="text-sm mt-1 font-sans text-muted-foreground font-light">
                {t3(language,
                  "Fondateur, Innobiz : 20 ans de R&D en diffusion",
                  'Founder, Innobiz: 20 years of diffusion R&D',
                  'Fundador, Innobiz: 20 años de I+D en difusión'
                )}
              </p>
            </div>
          </div>

          {/* CTA below signature */}
          <motion.div
            className="relative z-10 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="#contact"
              onClick={() => trackCTAClick('founders_letter_cta', 'founders-letter')}
              className="inline-flex items-center gap-2 text-sm font-sans font-medium transition-colors hover:opacity-80"
              style={{ color: 'hsl(28 45% 42%)' }}
            >
              {t3(language,
                'Découvrez ce que Tolia peut apporter à votre marque',
                'Discover what Tolia can do for your brand',
                'Descubra lo que Tolia puede hacer por su marca'
              )}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundersLetterSection;
