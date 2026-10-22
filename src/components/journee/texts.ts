/* Textes de la visite guidée « Une journée avec Tolia » (version 7, 17/10/2026).
   Refonte demandée par Pierre : textes qui parlent de diffusion d'huiles essentielles et d'aromathérapie, sans style télégraphique ;
   chaque étape décrit le moment, la facilité du geste et le bénéfice ; les caractéristiques techniques sont glissées dans les cadres
   blancs fléchés (« callouts ») au lieu d'une fiche technique. Les explications d'un geste s'affichent AVANT l'animation du geste.
   Ordre des cadres = ordre d'apparition (les positions et les instants sont dans engine.ts). */
export type JourneeLang = 'fr' | 'en' | 'es';

export interface CalloutText { t: string; p: string }
export interface PhotoPageText {
  stop: { time: string; sub: string };
  eyebrow: string;
  h: string;
  p: string;
  alt: string;
  chrono?: string;
  callouts: CalloutText[];
}
export interface GammePageText {
  stop: { time: string; sub: string };
  eyebrow: string;
  recap: { time: string; text: string }[];
  h: string;
  adv: CalloutText[];
  sign: string;
}
export interface BilanPageText {
  stop: { time: string; sub: string };
  eyebrow: string;
  h: string;
  tiles: { big: string; small: string }[];
  p: string;
  cta: string;
  cta2: string;
  note: string;
}
export interface JourneeTexts {
  head: { kicker: string; h2: string; how: string; howFlow: string };
  ui: { next: string; prev: string; skip: string; end: string; hint: string; step: string; tlAria: string; aria: string; seq: string; replay: string; loading: string };
  matin: PhotoPageText;
  journee: PhotoPageText;
  soir: PhotoPageText;
  gamme: GammePageText;
  bilan: BilanPageText;
}

export const JOURNEE_TEXTS: Record<JourneeLang, JourneeTexts> = {
  fr: {
    head: {
      kicker: 'Une journée avec Tolia',
      h2: 'Voici une journée parmi d’autres. Chacun diffuse les huiles qu’il aime, quand il le souhaite : Tolia s’adapte à toutes les habitudes.',
      how: 'La visite se déroule en cinq étapes. Faites défiler la page ou utilisez le bouton « Suivant » : chaque étape s’affiche en entier avant de passer à la suivante.',
      howFlow: 'La visite se déroule en cinq étapes, à lire en faisant défiler : les numéros sur chaque image renvoient aux explications dessous.',
    },
    ui: {
      next: 'Suivant',
      prev: 'Étape précédente',
      skip: 'Passer la visite',
      end: 'Continuer',
      hint: 'ou faites défiler',
      step: 'Étape {n} sur {N}',
      tlAria: 'Étapes de la visite',
      aria: 'Une journée avec Tolia, visite guidée',
      seq: 'Suite de la journée',
      replay: 'Revoir le geste',
      loading: 'chargement de l’animation…',
    },
    matin: {
      stop: { time: '07:30', sub: 'Matin' },
      eyebrow: '07:30 · Le matin, pour bien démarrer',
      h: 'Un appui, et la journée démarre avec une huile tonifiante.',
      p: 'Le matin, beaucoup choisissent une huile essentielle tonifiante, comme la menthe poivrée, pour bien démarrer la journée ; en hiver, d’autres préfèrent une huile que l’on diffuse traditionnellement à cette saison, comme le ravintsara. Avec Tolia, le flacon est déjà en place : un appui sur la base, et la brume se répand aussitôt. Rien à remplir, rien à doser, rien à nettoyer ensuite.',
      alt: 'Diffuseur Tolia ouvert sur une table, le matin : le flacon Matin est clipsé dans la base, la brume sort de la buse, deux autres flacons attendent à côté',
      callouts: [
        { t: 'Votre flacon, tel quel', p: 'Nous avons retiré la cloche pour vous le montrer : le flacon de menthe poivrée est clipsé tête en bas dans la base. Rien à transvaser, aucune goutte à compter.' },
        { t: 'Un appui pour lancer', p: 'La diffusion démarre aussitôt, sans temps de chauffe. La durée, la puissance et l’intermittence se règlent très simplement.' },
        { t: 'Une brume d’huile pure', p: 'Nébulisation à froid : ni eau, ni chaleur. L’huile essentielle se diffuse telle qu’elle sort du flacon.' },
      ],
    },
    journee: {
      stop: { time: '14:00', sub: 'Après-midi' },
      eyebrow: '14:00 · En début d’après-midi, au salon',
      h: 'Envie d’une autre huile essentielle ? Il suffit d’une seconde.',
      p: 'En début d’après-midi, on a souvent envie de changer d’ambiance : une note d’agrume plus douce pour une pause, ou une huile plus fraîche pour rester concentré. Avec un diffuseur classique, il faudrait vider, rincer, sécher puis remplir le réservoir. Avec Tolia, le module de diffusion reste vissé sur chaque flacon : on retire la menthe poivrée, on clipse l’orange douce, on repose la cloche, et la diffusion repart.',
      alt: 'Au salon, le flacon Matin sort de la base de Tolia, le flacon Journée prend sa place, puis la cloche est reposée et la brume repart',
      chrono: 'pour changer d’huile',
      callouts: [
        { t: 'Un module sur chaque flacon', p: 'Chaque flacon garde son module vissé : plus rien à vider, à rincer ni à mélanger.' },
        { t: 'Clipser, c’est tout', p: 'Le flacon se clipse dans la base d’un seul geste, puis la cloche se repose par-dessus.' },
        { t: 'Pure, intacte, silencieuse', p: 'Sans eau qui la dilue ni chaleur qui l’altère, l’huile garde tout son parfum. Ni pompe ni ventilateur : aucun bruit de moteur.' },
      ],
    },
    soir: {
      stop: { time: '21:00', sub: 'Soir' },
      eyebrow: '21:00 · Le soir, dans la chambre',
      h: 'Sans fil et silencieux, Tolia accompagne le coucher.',
      p: 'Vers 21 h, on emporte Tolia dans la chambre comme on emporte un livre : il n’a pas de fil. On clipse la lavande vraie et on choisit une diffusion douce, par intermittence, qui s’arrête d’elle-même au bout de la durée choisie. Sa batterie tient jusqu’à 90 heures et se recharge en USB‑C.',
      alt: 'Dans la chambre, le flacon Journée sort de la base, le flacon Soir prend sa place, puis la cloche est reposée sur le diffuseur',
      chrono: 'pour changer d’huile',
      callouts: [
        { t: 'Sans fil, jusqu’à 90 h', p: 'Batterie rechargeable en USB‑C : 70 à 90 h lumière éteinte, 16 à 20 h avec la lumière d’ambiance.' },
        { t: 'Arrêt automatique', p: 'La diffusion s’arrête d’elle-même au bout de la durée choisie. Et sans pompe ni ventilateur, aucun bruit de moteur.' },
        { t: 'Une lumière d’ambiance douce', p: 'Un halo chaleureux sous la base, que l’on allume ou non, selon l’envie.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Votre gamme' },
      eyebrow: 'Ce que vous venez de voir',
      recap: [
        { time: '07:30', text: 'Une huile tonifiante pour bien démarrer, d’un seul appui.' },
        { time: '14:00', text: 'Une autre huile en une seconde, sans rien vider ni rincer.' },
        { time: '21:00', text: 'Sans fil et silencieux au chevet, avec jusqu’à 90 h d’autonomie.' },
      ],
      h: 'Ce que Tolia apporte à votre gamme',
      adv: [
        { t: 'Vos flacons, directement', p: 'Le module se visse sur les flacons standard (col DIN 18, de 5 à 50 ml) : vos clients rachètent simplement vos huiles.' },
        { t: 'Un seul appareil pour votre gamme', p: 'La technologie a été testée sur plus de 150 huiles essentielles et synergies : le même appareil diffuse vos huiles pures et vos synergies.' },
        { t: 'Une seule référence à gérer', p: 'Un seul diffuseur pour toutes vos huiles, au lieu de plusieurs appareils : moins de stock, moins de SAV, un seul discours, en magasin comme en ligne.' },
        { t: 'Un diffuseur à votre image', p: 'Cloche, couleurs, matières, logo, coffret, modes de diffusion : Tolia porte votre marque de bout en bout.' },
      ],
      sign: 'D’habitude, c’est l’huile qui s’adapte au diffuseur. Avec Tolia, c’est l’inverse : tout part du flacon de la marque. C’est ce qui le rend si simple, et ce qui ramène vos clients vers vos huiles.',
    },
    bilan: {
      stop: { time: '', sub: 'Bilan' },
      eyebrow: 'Le bilan de la journée',
      h: 'Nous avons conçu Tolia pour qu’il soit formidablement simple, et qu’on s’en serve tous les jours.',
      tiles: [
        { big: '1 diffuseur', small: 'pour toutes vos huiles, au moment que chacun choisit' },
        { big: '24+*', small: 'flacons achetés par an par un client équipé de Tolia, contre 2 à 3 avec un diffuseur classique' },
        { big: 'Jusqu’à 8×*', small: 'plus d’huiles essentielles consommées' },
      ],
      p: 'Le café l’a montré : quand préparer un expresso s’est réduit à un seul geste, c’est devenu un rituel quotidien et un achat de marque régulier. Tolia fait de même pour les huiles essentielles, sans capsule : avec vos propres flacons.',
      cta: 'Recevoir mon échantillon gratuit',
      cta2: 'Réserver 30 min avec Simon',
      note: '* Rythme annuel calculé à partir des achats mesurés chez une marque cliente pendant les 6 mois suivant l’achat du diffuseur.',
    },
  },
  en: {
    head: {
      kicker: 'A day with Tolia',
      h2: 'Here is one day among many. Everyone diffuses the oils they like, whenever they like: Tolia adapts to every habit.',
      how: 'The tour has five steps. Scroll down or use the “Next” button: each step plays in full before moving on.',
      howFlow: 'The tour has five steps, read as you scroll: the numbers on each picture match the explanations below it.',
    },
    ui: {
      next: 'Next',
      prev: 'Previous step',
      skip: 'Skip the tour',
      end: 'Continue',
      hint: 'or scroll',
      step: 'Step {n} of {N}',
      tlAria: 'Tour steps',
      aria: 'A day with Tolia, guided tour',
      seq: 'The day goes on',
      replay: 'Watch again',
      loading: 'loading the animation…',
    },
    matin: {
      stop: { time: '07:30', sub: 'Morning' },
      eyebrow: '07:30 · Morning, a fresh start',
      h: 'One press, and the day starts with an invigorating oil.',
      p: 'In the morning, many people choose an invigorating essential oil, such as peppermint, to start the day; in winter, others prefer an oil traditionally diffused at that time of year, such as ravintsara. With Tolia, the bottle is already in place: one press on the base and the mist spreads at once. Nothing to fill, nothing to measure, nothing to clean afterwards.',
      alt: 'Open Tolia diffuser on a table in the morning: the Morning bottle is clipped into the base, mist leaves the nozzle, two other bottles wait beside it',
      callouts: [
        { t: 'Your bottle, as it is', p: 'We lifted the cover so you can see it: the peppermint bottle is clipped upside down into the base. Nothing to decant, no drops to count.' },
        { t: 'One press to start', p: 'Diffusion starts at once, with no warm-up. Time, strength and on/off cycles are easy to adjust.' },
        { t: 'A mist of pure oil', p: 'Cold nebulisation: no water, no heat. The essential oil is diffused exactly as it leaves the bottle.' },
      ],
    },
    journee: {
      stop: { time: '14:00', sub: 'Afternoon' },
      eyebrow: '14:00 · Early afternoon, in the living room',
      h: 'Fancy a different essential oil? It takes one second.',
      p: 'In the early afternoon, you often want a change of atmosphere: a softer citrus note for a break, or a fresher oil to stay focused. With a classic diffuser you would have to empty, rinse and dry the tank, then fill it again. With Tolia, the diffusion module stays screwed onto each bottle: take out the peppermint, clip in the sweet orange, put the cover back on, and diffusion starts again.',
      alt: 'In the living room, the Morning bottle leaves Tolia’s base, the Day bottle takes its place, then the cover is set back and the mist starts again',
      chrono: 'to change oil',
      callouts: [
        { t: 'One module on every bottle', p: 'Each bottle keeps its module screwed on: nothing left to empty, rinse or mix.' },
        { t: 'Just clip it in', p: 'The bottle clips into the base in one move, then the cover goes back on top.' },
        { t: 'Pure, intact, quiet', p: 'No water to dilute it, no heat to alter it: the oil keeps its full scent. No pump, no fan: no motor noise.' },
      ],
    },
    soir: {
      stop: { time: '21:00', sub: 'Evening' },
      eyebrow: '21:00 · Evening, in the bedroom',
      h: 'Cordless and quiet, Tolia follows you to bed.',
      p: 'At around 9 pm, you take Tolia to the bedroom the way you would take a book: it has no cord. Clip in the true lavender and choose a gentle diffusion with on/off cycles that stops by itself after the chosen time. The battery lasts up to 90 hours and recharges via USB‑C.',
      alt: 'In the bedroom, the Day bottle leaves the base, the Evening bottle takes its place, then the cover is set back on the diffuser',
      chrono: 'to change oil',
      callouts: [
        { t: 'Cordless, up to 90 h', p: 'USB‑C rechargeable battery: 70 to 90 h with the light off, 16 to 20 h with the ambient light on.' },
        { t: 'Auto shut-off', p: 'Diffusion stops by itself after the chosen time. And with no pump or fan, there is no motor noise.' },
        { t: 'A soft ambient light', p: 'A warm glow under the base, on or off as you like.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Your range' },
      eyebrow: 'What you have just seen',
      recap: [
        { time: '07:30', text: 'An invigorating oil to start the day, in one press.' },
        { time: '14:00', text: 'A different oil in one second, nothing to empty or rinse.' },
        { time: '21:00', text: 'Cordless and quiet at the bedside, up to 90 h of battery.' },
      ],
      h: 'What Tolia brings to your range',
      adv: [
        { t: 'Your bottles, used directly', p: 'The module screws onto standard bottles (DIN 18 neck, 5 to 50 ml): your customers simply buy your oils again.' },
        { t: 'One device for your range', p: 'Tested on more than 150 essential oils and blends: the same device diffuses your single oils and your blends.' },
        { t: 'Just one SKU to manage', p: 'One diffuser for all your oils instead of several devices: less stock, fewer after-sales issues, one simple pitch, in store and online.' },
        { t: 'A diffuser that is unmistakably yours', p: 'Cover, colours, materials, logo, box, diffusion modes: Tolia carries your brand throughout.' },
      ],
      sign: 'Usually, the oil adapts to the diffuser. Tolia works the other way round: everything starts from the brand’s own bottle. That is what makes it so simple, and what brings your customers back to your oils.',
    },
    bilan: {
      stop: { time: '', sub: 'Summary' },
      eyebrow: 'The day in summary',
      h: 'We designed Tolia to be wonderfully simple, so that people use it every day.',
      tiles: [
        { big: '1 diffuser', small: 'for all your oils, at whatever time each person chooses' },
        { big: '24+*', small: 'bottles bought per year by each Tolia owner, versus 2 to 3 with a classic diffuser' },
        { big: 'Up to 8×*', small: 'more essential oil consumed' },
      ],
      p: 'Coffee proved it: once making an espresso took a single touch, it became a daily ritual and a recurring brand purchase. Tolia brings that simplicity to essential oils, with no capsule: just your own bottles.',
      cta: 'Get my free sample',
      cta2: 'Book 30 min with Simon',
      note: '* Annual rate, calculated from purchases measured at a client brand over the 6 months following the diffuser purchase.',
    },
  },
  es: {
    head: {
      kicker: 'Un día con Tolia',
      h2: 'Este es un día entre muchos. Cada uno difunde los aceites que le gustan, cuando quiere: Tolia se adapta a todos los hábitos.',
      how: 'La visita tiene cinco etapas. Desplácese hacia abajo o utilice el botón «Siguiente»: cada etapa se muestra completa antes de pasar a la siguiente.',
      howFlow: 'La visita tiene cinco etapas, para leer desplazándose: los números de cada imagen remiten a las explicaciones de debajo.',
    },
    ui: {
      next: 'Siguiente',
      prev: 'Etapa anterior',
      skip: 'Saltar la visita',
      end: 'Continuar',
      hint: 'o desplácese',
      step: 'Etapa {n} de {N}',
      tlAria: 'Etapas de la visita',
      aria: 'Un día con Tolia, visita guiada',
      seq: 'El día continúa',
      replay: 'Ver de nuevo',
      loading: 'cargando la animación…',
    },
    matin: {
      stop: { time: '07:30', sub: 'Mañana' },
      eyebrow: '07:30 · Por la mañana, para empezar bien',
      h: 'Una pulsación, y el día empieza con un aceite tonificante.',
      p: 'Por la mañana, muchos eligen un aceite esencial tonificante, como la menta piperita, para empezar bien el día; en invierno, otros prefieren un aceite que se difunde tradicionalmente en esa época del año, como el ravintsara. Con Tolia, el frasco ya está en su sitio: una pulsación en la base y la bruma se extiende enseguida. Nada que llenar, nada que dosificar, nada que limpiar después.',
      alt: 'Difusor Tolia abierto sobre una mesa por la mañana: el frasco Mañana está encajado en la base, la bruma sale de la boquilla y otros dos frascos esperan al lado',
      callouts: [
        { t: 'Su frasco, tal cual', p: 'Hemos quitado la cubierta para que lo vea: el frasco de menta piperita está encajado boca abajo en la base. Nada que trasvasar, ninguna gota que contar.' },
        { t: 'Una pulsación para empezar', p: 'La difusión arranca al instante, sin tiempo de calentamiento. La duración, la potencia y la intermitencia se ajustan de forma muy sencilla.' },
        { t: 'Una bruma de aceite puro', p: 'Nebulización en frío: sin agua ni calor. El aceite esencial se difunde tal como sale del frasco.' },
      ],
    },
    journee: {
      stop: { time: '14:00', sub: 'Tarde' },
      eyebrow: '14:00 · A primera hora de la tarde, en el salón',
      h: '¿Le apetece otro aceite esencial? Basta un segundo.',
      p: 'A primera hora de la tarde, a menudo apetece cambiar de ambiente: una nota cítrica más suave para una pausa, o un aceite más fresco para mantener la concentración. Con un difusor clásico habría que vaciar, enjuagar, secar y volver a llenar el depósito. Con Tolia, el módulo de difusión permanece enroscado en cada frasco: se retira la menta piperita, se encaja la naranja dulce, se vuelve a colocar la cubierta y la difusión se reanuda.',
      alt: 'En el salón, el frasco Mañana sale de la base de Tolia, el frasco Día ocupa su lugar, luego se vuelve a colocar la cubierta y la bruma sale de nuevo',
      chrono: 'para cambiar de aceite',
      callouts: [
        { t: 'Un módulo en cada frasco', p: 'Cada frasco conserva su módulo enroscado: ya no hay nada que vaciar, enjuagar ni mezclar.' },
        { t: 'Encajar y listo', p: 'El frasco se encaja en la base con un solo gesto y la cubierta se vuelve a colocar encima.' },
        { t: 'Aceite puro, difusión silenciosa', p: 'Sin agua que lo diluya ni calor que lo altere, el aceite conserva todo su aroma. Sin bomba ni ventilador: ningún ruido de motor.' },
      ],
    },
    soir: {
      stop: { time: '21:00', sub: 'Noche' },
      eyebrow: '21:00 · Por la noche, en el dormitorio',
      h: 'Sin cables y silencioso, Tolia acompaña la hora de dormir.',
      p: 'Hacia las 21 h, Tolia se lleva al dormitorio como se lleva un libro: no tiene cable. Se encaja la lavanda verdadera y se elige una difusión suave e intermitente que se detiene sola al cabo del tiempo elegido. Su batería dura hasta 90 horas y se recarga por USB‑C.',
      alt: 'En el dormitorio, el frasco Día sale de la base, el frasco Noche ocupa su lugar y se vuelve a colocar la cubierta sobre el difusor',
      chrono: 'para cambiar de aceite',
      callouts: [
        { t: 'Sin cables, hasta 90 h', p: 'Batería recargable por USB‑C: de 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental.' },
        { t: 'Apagado automático', p: 'La difusión se detiene sola al cabo del tiempo elegido. Y sin bomba ni ventilador, no hay ruido de motor.' },
        { t: 'Una luz ambiental suave', p: 'Un halo cálido bajo la base, encendido o apagado a su gusto.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Su gama' },
      eyebrow: 'Lo que acaba de ver',
      recap: [
        { time: '07:30', text: 'Un aceite tonificante para empezar bien, con una sola pulsación.' },
        { time: '14:00', text: 'Otro aceite en un segundo, sin vaciar ni enjuagar nada.' },
        { time: '21:00', text: 'Sin cables y silencioso junto a la cama, hasta 90 h de batería.' },
      ],
      h: 'Lo que Tolia aporta a su gama',
      adv: [
        { t: 'Sus frascos, directamente', p: 'El módulo se enrosca en frascos estándar (cuello DIN 18, de 5 a 50 ml): sus clientes simplemente vuelven a comprar sus aceites.' },
        { t: 'Un solo aparato para su gama', p: 'Probado con más de 150 aceites esenciales y sinergias: el mismo aparato difunde sus aceites puros y sus sinergias.' },
        { t: 'Una sola referencia que gestionar', p: 'Un solo difusor para todos sus aceites en lugar de varios aparatos: menos stock, menos posventa, un solo discurso, en tienda y en línea.' },
        { t: 'Un difusor a su imagen', p: 'Cubierta, colores, materiales, logotipo, estuche, modos de difusión: Tolia lleva su marca de principio a fin.' },
      ],
      sign: 'Normalmente, el aceite se adapta al difusor. Con Tolia es al revés: todo parte del frasco de la marca. Eso es lo que lo hace tan sencillo, y lo que hace que sus clientes vuelvan a comprar sus aceites.',
    },
    bilan: {
      stop: { time: '', sub: 'Balance' },
      eyebrow: 'Balance del día',
      h: 'Hemos diseñado Tolia para que sea extraordinariamente sencillo, y para que se use todos los días.',
      tiles: [
        { big: '1 difusor', small: 'para todos sus aceites, en el momento que cada uno elija' },
        { big: '24+*', small: 'frascos comprados al año por cada cliente equipado con Tolia, frente a 2 o 3 con un difusor clásico' },
        { big: 'Hasta 8×*', small: 'más aceites esenciales consumidos' },
      ],
      p: 'El café lo demostró: el día en que preparar un espresso se redujo a un solo gesto, se convirtió en un ritual diario y en una compra de marca recurrente. Tolia lleva ese gesto a los aceites esenciales, sin cápsula: con sus propios frascos.',
      cta: 'Recibir mi muestra gratuita',
      cta2: 'Reservar 30 min con Simon',
      note: '* Ritmo anual, calculado a partir de las compras medidas en una marca cliente durante los 6 meses posteriores a la compra del difusor.',
    },
  },
};
