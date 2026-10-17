import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Check, Droplets, Flame, FlaskRound, Wind, X, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';

// Le geste en une image (scène du matin recadrée) : le flacon clipsé dans la base, les autres flacons avec leur module.
const GESTE = `${import.meta.env.BASE_URL}journee/img/constat_geste.webp`;

/**
 * Le constat (refonte du 17/10/2026, demande de Pierre) : on montre que l'on connaît les usages.
 * Pour chaque technologie de diffusion : ce que l'utilisateur doit faire, puis ce qui se passe (le diffuseur s'arrête,
 * le flacon n'est plus racheté). Puis la réponse de Tolia. Remplace aussi le tableau replié
 * « Pourquoi les autres diffuseurs finissent dans un placard » de la section Technologie.
 */
const HomeProblemSection: React.FC = () => {
  const { language: l } = useLanguage();

  const techs: { icon: LucideIcon; name: string; usage: string; result: string }[] = [
    {
      icon: Droplets,
      name: t3(l, 'Ultrasons, avec réservoir d’eau', 'Ultrasonic, with a water tank', 'Ultrasonidos, con depósito de agua'),
      usage: t3(
        l,
        'Remplir le réservoir, compter les gouttes, puis vider, rincer et sécher pour éviter l’eau stagnante. Diluée dans l’eau, l’huile perd de sa force.',
        'Fill the tank, count the drops, then empty, rinse and dry it to avoid stagnant water. Diluted in water, the oil loses its strength.',
        'Llenar el depósito, contar las gotas y luego vaciar, enjuagar y secar para evitar el agua estancada. Diluido en agua, el aceite pierde fuerza.'
      ),
      result: t3(l, 'Une corvée quotidienne : le diffuseur reste éteint.', 'A daily chore: the diffuser stays switched off.', 'Una tarea diaria: el difusor se queda apagado.'),
    },
    {
      icon: Flame,
      name: t3(l, 'Diffusion par la chaleur', 'Heat diffusion', 'Difusión por calor'),
      usage: t3(
        l,
        'La chaleur altère les molécules aromatiques. Le parfum s’affadit vite et ne ressemble plus à l’huile essentielle que l’on avait choisie.',
        'Heat alters the aromatic molecules. The scent fades quickly and no longer smells like the essential oil you had chosen.',
        'El calor altera las moléculas aromáticas. El aroma se apaga rápido y ya no se parece al aceite esencial que se había elegido.'
      ),
      result: t3(l, 'Une déception : le flacon n’est pas racheté.', 'A disappointment: the bottle is not bought again.', 'Una decepción: el frasco no se vuelve a comprar.'),
    },
    {
      icon: Wind,
      name: t3(l, 'Diffusion passive : bâtonnets, pierre', 'Passive diffusion: reeds, stone', 'Difusión pasiva: varillas, piedra'),
      usage: t3(
        l,
        'Agréables pour parfumer une entrée, mais sans réglage d’intensité ni de durée : le parfum faiblit jour après jour, et changer d’huile oblige à tout remplacer.',
        'Pleasant for scenting a hallway, but with no control over intensity or duration: the scent weakens day after day, and changing oil means replacing everything.',
        'Agradables para perfumar una entrada, pero sin ajuste de intensidad ni de duración: el aroma se debilita día tras día y cambiar de aceite obliga a sustituirlo todo.'
      ),
      result: t3(l, 'Un usage oublié : on n’y pense plus.', 'A forgotten habit: nobody thinks about it any more.', 'Un uso olvidado: ya nadie piensa en ello.'),
    },
    {
      icon: FlaskRound,
      name: t3(l, 'Nébuliseur à verrerie', 'Nebuliser with glassware', 'Nebulizador de vidrio'),
      usage: t3(
        l,
        'Une pompe que l’on entend, une verrerie fragile à démonter et à nettoyer chaque fois que l’on change d’huile.',
        'A pump you can hear, fragile glassware to take apart and clean every time you change oil.',
        'Una bomba que se oye y unas piezas de vidrio frágiles que hay que desmontar y limpiar cada vez que se cambia de aceite.'
      ),
      result: t3(l, 'Trop contraignant : on garde la même huile, puis on arrête.', 'Too much hassle: people keep the same oil, then stop.', 'Demasiado complicado: se mantiene el mismo aceite y luego se abandona.'),
    },
  ];

  return (
    <section id="probleme" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <LegacyAnchors ids={['closet-syndrome', 'friction-by-tech']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Le constat', 'The problem', 'El problema')}
          </span>
          <h2 className="heading-section text-foreground mb-6" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(
              l,
              'Vos clients aiment diffuser. C’est leur diffuseur qui les décourage.',
              'Your customers love diffusing. It’s their diffuser that puts them off.',
              'A sus clientes les encanta aromatizar su hogar. Es su difusor lo que les desanima.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              l,
              'En 20 ans de métier dans la diffusion, nous avons fait le même constat : l’envie de diffuser est bien là ; ce qui l’éteint, ce sont les gestes que chaque appareil impose. Au bout de quelques semaines, plus de la moitié des diffuseurs finissent dans un placard, et les flacons d’huiles essentielles ne se rachètent plus.',
              'In 20 years of designing diffusers, we have seen the same thing again and again: people want to diffuse; what stops them is the chores each device demands. After a few weeks, more than half of diffusers end up in a cupboard, and the essential oil bottles are no longer repurchased.',
              'En 20 años de experiencia en difusión, hemos llegado siempre a la misma conclusión: las ganas de difundir están ahí; lo que las apaga son los gestos que impone cada aparato. Al cabo de unas semanas, más de la mitad de los difusores acaban en un armario y los frascos de aceites esenciales ya no se vuelven a comprar.'
            )}
          </p>
        </motion.div>

        {/* Une carte par technologie : ce que l'on doit faire, puis ce qui se passe */}
        {/* téléphone : les 4 cartes défilent sur le côté (moins d'écrans de texte) ; tablette et ordinateur : grille */}
        <motion.ul
          className="mt-10 md:mt-12 -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {techs.map((t) => (
            <motion.li key={t.name} className="flex min-w-[82%] snap-start flex-col rounded-2xl border border-border/60 bg-card p-5 sm:min-w-0" variants={fadeBlurUp}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden="true">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold leading-snug text-foreground">{t.name}</h3>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t3(l, 'À l’usage', 'In daily use', 'En el uso diario')}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.usage}</p>
              <p className="mt-auto flex items-start gap-2 border-t border-border/60 pt-3 text-sm font-semibold leading-snug" style={{ color: 'hsl(8 45% 40%)' }}>
                <X className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                <span>{t.result}</span>
              </p>
            </motion.li>
          ))}
        </motion.ul>
        <p className="mt-1 text-center text-xs text-muted-foreground sm:hidden">
          {t3(l, 'Faites glisser pour voir les 4 technologies', 'Swipe to see all 4 technologies', 'Deslice para ver las 4 tecnologías')} →
        </p>

        {/* La réponse de Tolia */}
        <motion.div
          className="mt-4 grid items-center gap-5 rounded-2xl p-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] md:gap-8 md:p-7"
          style={{ background: 'hsl(25 20% 12%)', color: 'hsl(36 40% 96%)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <img
            src={GESTE}
            width={660}
            height={440}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl object-cover"
            style={{ aspectRatio: '3 / 2' }}
            alt={t3(
              l,
              'Le flacon clipsé tête en bas dans la base de Tolia, la brume qui sort, et deux flacons qui attendent avec leur module de diffusion vissé',
              'The bottle clipped upside down into Tolia’s base, mist coming out, and two bottles waiting with their diffusion module screwed on',
              'El frasco encajado boca abajo en la base de Tolia, la bruma saliendo y dos frascos esperando con su módulo de difusión enroscado'
            )}
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: 'hsl(28 55% 66%)' }}>Tolia</p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold leading-tight" style={{ textWrap: 'balance' } as React.CSSProperties}>
              {t3(l, 'Nous avons pris le problème à l’envers.', 'We turned the problem upside down.', 'Le hemos dado la vuelta al problema.')}
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: 'hsl(36 40% 96% / 0.82)' }}>
              {t3(
                l,
                'Au lieu de verser l’huile dans l’appareil, c’est le diffuseur qui vient sur le flacon. Le flacon de votre marque se visse sur un module de diffusion et se clipse dans Tolia ; un appui lance la diffusion. Ni eau, ni chaleur, ni pompe, rien à nettoyer, et une autre huile en une seconde.',
                'Forget pouring oil into a device: with Tolia, the diffuser goes to the bottle. Your brand’s bottle screws onto a diffusion module and clips into Tolia; one press starts diffusion. No water, no heat, no pump, nothing to clean, and a different oil in one second.',
                'En lugar de verter el aceite en el aparato, es el difusor el que va al frasco. El frasco de su marca se enrosca en un módulo de difusión y se encaja en Tolia; una pulsación inicia la difusión. Sin agua, sin calor, sin bomba, nada que limpiar y otro aceite en un segundo.'
              )}
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm md:text-base font-semibold leading-snug" style={{ color: 'hsl(28 60% 70%)' }}>
              <Check className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
              <span>
                {t3(
                  l,
                  'Le geste devient quotidien : les flacons se vident, et vos clients les rachètent.',
                  'It becomes a daily habit: bottles run out, and your customers buy them again.',
                  'El gesto se vuelve diario: los frascos se vacían y sus clientes los vuelven a comprar.'
                )}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeBlurUp}
        >
          <p className="mx-auto max-w-2xl text-lg md:text-xl font-semibold text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(
              l,
              'Quand diffuser ne demande plus aucun effort, on diffuse tous les jours. C’est ce qui ramène vos clients vers vos huiles.',
              'When diffusing takes no effort, people diffuse every day. That is what brings your customers back to your oils.',
              'Cuando aromatizar la casa no cuesta ningún esfuerzo, se hace a diario. Y sus clientes vuelven a comprar sus aceites.'
            )}
          </p>
          <a
            href="#journee"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-2 py-1"
            style={{ color: 'hsl(28 52% 36%)' }}
          >
            {t3(l, 'Voir Tolia en situation, sur une journée', 'See Tolia in action, over one day', 'Ver Tolia en uso, durante un día')}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProblemSection;
