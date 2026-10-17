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
  ui: { next: string; prev: string; skip: string; end: string; hint: string; step: string; tlAria: string; aria: string; seq: string };
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
      h2: 'Suivez Tolia du matin au soir : trois moments, trois huiles essentielles, un seul diffuseur.',
      how: 'La visite se déroule en cinq étapes. Faites défiler la page ou utilisez le bouton « Suivant » : chaque étape s’affiche en entier avant de passer à la suivante.',
      howFlow: 'La visite se déroule en cinq étapes, à lire en faisant défiler : les numéros sur chaque image renvoient aux explications dessous.',
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
    },
    matin: {
      stop: { time: '07:30', sub: 'Matin' },
      eyebrow: '07:30 · Le matin, dans la cuisine',
      h: 'Un appui, et la diffusion commence avant même le café.',
      p: 'Au réveil, personne n’a envie de remplir un réservoir, de compter des gouttes ou d’attendre qu’un appareil chauffe. Avec Tolia, le flacon de menthe poivrée est déjà en place : un appui sur la base, et la brume d’huile essentielle se répand aussitôt dans la cuisine. Rien à préparer, rien à nettoyer ensuite.',
      alt: 'Diffuseur Tolia ouvert sur une table de cuisine au petit matin : le flacon Matin est clipsé dans la base, la brume sort de la buse, deux autres flacons attendent à côté',
      callouts: [
        { t: 'Votre flacon, tel quel', p: 'Le flacon de menthe poivrée est clipsé tête en bas dans la base. Pas de transvasement, pas de gouttes à compter.' },
        { t: 'Un appui pour lancer', p: 'La diffusion démarre aussitôt, sans temps de chauffe. Intensité, durée et pauses se règlent d’une pression.' },
        { t: 'Une brume d’huile pure', p: 'Nébulisation à froid : ni eau, ni chaleur. L’huile essentielle se diffuse telle qu’elle sort du flacon.' },
        { t: 'Les autres huiles attendent leur moment', p: 'Chaque flacon garde son module de diffusion vissé : il est prêt à prendre la place du précédent.' },
      ],
    },
    journee: {
      stop: { time: '18:30', sub: 'Journée' },
      eyebrow: '18:30 · Fin de journée, au salon',
      h: 'Envie d’une autre huile essentielle ? Il suffit d’une seconde.',
      p: 'En fin de journée, on a envie d’une note plus douce. Avec un diffuseur classique, il faudrait vider, rincer, sécher puis remplir le réservoir. Avec Tolia, le module de diffusion reste vissé sur chaque flacon : on retire la menthe poivrée, on clipse l’orange douce, on repose la cloche, et la diffusion repart.',
      alt: 'Au salon, le flacon Matin sort de la base de Tolia, le flacon Journée prend sa place, puis la cloche est reposée et la brume repart',
      chrono: 'pour changer d’huile',
      callouts: [
        { t: 'Un module sur chaque flacon', p: 'Il se visse une fois pour toutes. Ensuite, on ne vide, ne rince et ne mélange plus jamais rien.' },
        { t: 'Clipser, c’est tout', p: 'Le flacon se clipse dans la base comme un téléphone sur son support. Aucune goutte n’est perdue.' },
        { t: 'Pure, intacte, silencieuse', p: 'Sans eau qui la dilue ni chaleur qui l’altère, l’huile garde tout son parfum. Ni pompe ni ventilateur : on n’entend rien.' },
        { t: 'Tout votre catalogue', p: 'Une technologie testée sur plus de 150 huiles essentielles et synergies, capable de diffuser aussi des parfums synthétiques.' },
      ],
    },
    soir: {
      stop: { time: '22:00', sub: 'Soir' },
      eyebrow: '22:00 · Le soir, dans la chambre',
      h: 'Sans fil et sans bruit, Tolia accompagne le coucher.',
      p: 'Le soir, on emporte Tolia dans la chambre comme on emporte un livre : il n’a pas de fil. On clipse la lavande vraie, on choisit une diffusion douce, par intermittence, et rien ne vient troubler l’endormissement. Sa batterie tient jusqu’à 90 heures et se recharge comme un téléphone.',
      alt: 'Dans la chambre, le flacon Journée sort de la base, le flacon Soir prend sa place, puis la cloche est reposée sur le diffuseur',
      chrono: 'encore une seconde',
      callouts: [
        { t: 'Sans fil, jusqu’à 90 h', p: 'Batterie rechargeable en USB-C : 70 à 90 h lumière éteinte, 16 à 20 h avec la lumière d’ambiance.' },
        { t: 'La lavande, déjà prête', p: 'Son module est déjà vissé : elle prend la place de l’orange douce d’un simple clic.' },
        { t: 'Rien ne trouble le sommeil', p: 'Ni pompe, ni ventilateur, ni vibration. La diffusion peut s’arrêter d’elle-même au bout de la durée choisie.' },
        { t: 'Une lumière d’ambiance douce', p: 'Un halo chaleureux sous la base, à allumer ou non. Un voyant de couleur indique le réglage en cours.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Votre gamme' },
      eyebrow: 'Ce que vous venez de voir',
      recap: [
        { time: '07:30', text: 'Un appui, et l’huile du matin se diffuse. Rien à préparer.' },
        { time: '18:30', text: 'Une autre huile en une seconde, sans rien vider ni rincer.' },
        { time: '22:00', text: 'Sans fil et silencieux jusqu’au chevet, jusqu’à 90 h d’autonomie.' },
      ],
      h: 'Ce que Tolia apporte à votre gamme',
      adv: [
        { t: 'Vos flacons deviennent la recharge', p: 'Le module se visse sur les flacons standard (col DIN 18, 5 à 50 ml). Vos clients rachètent vos huiles, pas une cartouche.' },
        { t: 'Tout votre catalogue se diffuse', p: 'Testée sur plus de 150 huiles essentielles et synergies, la technologie diffuse aussi les parfums synthétiques.' },
        { t: 'Une seule référence à gérer', p: 'Un diffuseur universel à la place de plusieurs modèles : moins de stock, moins de SAV, un seul discours en magasin.' },
        { t: 'Un diffuseur à votre image', p: 'Cloche, couleurs, matières, logo, coffret, modes de diffusion : Tolia porte votre marque de bout en bout.' },
      ],
      sign: 'Personne n’avait encore conçu un diffuseur autour du flacon de la marque. C’est ce qui le rend si simple, et ce qui fait revenir vos clients vers vos huiles.',
    },
    bilan: {
      stop: { time: '', sub: 'Bilan' },
      eyebrow: 'Le bilan de la journée',
      h: 'Nous avons conçu Tolia pour qu’il soit formidablement simple. C’est pour cela qu’on s’en sert tous les jours.',
      tiles: [
        { big: '1 diffuseur', small: '3 moments, 3 huiles essentielles, aucun effort' },
        { big: '24+', small: 'flacons achetés par an et par client équipé, contre 2 à 3 avec un diffuseur classique' },
        { big: 'Jusqu’à 8×', small: 'plus d’huiles essentielles consommées' },
      ],
      p: 'Le café l’a montré : le jour où un expresso a tenu en un geste, il est devenu un rituel quotidien et un achat de marque récurrent. Tolia apporte ce geste aux huiles essentielles, sans capsule : avec vos flacons.',
      cta: 'Recevoir un échantillon gratuit',
      cta2: 'Réserver 15 min avec l’équipe',
      note: 'Mesure réelle chez une marque cliente, sur les 6 mois suivant l’achat du diffuseur.',
    },
  },
  en: {
    head: {
      kicker: 'A day with Tolia',
      h2: 'Follow Tolia from morning to night: three moments, three essential oils, one diffuser.',
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
    },
    matin: {
      stop: { time: '07:30', sub: 'Morning' },
      eyebrow: '07:30 · Morning, in the kitchen',
      h: 'One press, and diffusion starts before the coffee does.',
      p: 'First thing in the morning, nobody wants to fill a tank, count drops or wait for a device to warm up. With Tolia, the peppermint bottle is already in place: one press on the base and the essential oil mist spreads through the kitchen at once. Nothing to prepare, nothing to clean afterwards.',
      alt: 'Open Tolia diffuser on a kitchen table early in the morning: the Morning bottle is clipped into the base, mist leaves the nozzle, two other bottles wait beside it',
      callouts: [
        { t: 'Your bottle, as it is', p: 'The peppermint bottle clips upside down into the base. No pouring, no drops to count.' },
        { t: 'One press to start', p: 'Diffusion starts at once, with no warm-up. Intensity, duration and pauses are set with a single press.' },
        { t: 'A mist of pure oil', p: 'Cold nebulisation: no water, no heat. The essential oil is diffused exactly as it leaves the bottle.' },
        { t: 'The other oils wait their turn', p: 'Each bottle keeps its diffusion module screwed on: it is ready to take the previous one’s place.' },
      ],
    },
    journee: {
      stop: { time: '18:30', sub: 'Day' },
      eyebrow: '18:30 · End of the day, in the living room',
      h: 'Fancy a different essential oil? It takes one second.',
      p: 'At the end of the day, you want a softer note. With a classic diffuser you would have to empty, rinse, dry and refill the tank. With Tolia, the diffusion module stays screwed onto each bottle: take out the peppermint, clip in the sweet orange, put the cover back on, and diffusion starts again.',
      alt: 'In the living room, the Morning bottle leaves Tolia’s base, the Day bottle takes its place, then the cover is set back and the mist starts again',
      chrono: 'to change oil',
      callouts: [
        { t: 'One module on every bottle', p: 'It is screwed on once and for all. After that, nothing is ever emptied, rinsed or mixed again.' },
        { t: 'Just clip it in', p: 'The bottle clips into the base like a phone onto its stand. Not a single drop is lost.' },
        { t: 'Pure, intact, silent', p: 'No water to dilute it, no heat to alter it: the oil keeps its full scent. No pump, no fan: you hear nothing.' },
        { t: 'Your whole catalogue', p: 'A technology tested on more than 150 essential oils and blends, which can also diffuse synthetic fragrances.' },
      ],
    },
    soir: {
      stop: { time: '22:00', sub: 'Evening' },
      eyebrow: '22:00 · Evening, in the bedroom',
      h: 'Cordless and silent, Tolia comes along at bedtime.',
      p: 'In the evening, you take Tolia to the bedroom the way you would take a book: it has no cord. Clip in the true lavender, choose a gentle diffusion with pauses, and nothing disturbs falling asleep. The battery lasts up to 90 hours and recharges like a phone.',
      alt: 'In the bedroom, the Day bottle leaves the base, the Evening bottle takes its place, then the cover is set back on the diffuser',
      chrono: 'one more second',
      callouts: [
        { t: 'Cordless, up to 90 h', p: 'USB-C rechargeable battery: 70 to 90 h with the light off, 16 to 20 h with the ambient light on.' },
        { t: 'Lavender, ready to go', p: 'Its module is already screwed on: it replaces the sweet orange with a simple click.' },
        { t: 'Nothing disturbs sleep', p: 'No pump, no fan, no vibration. Diffusion can stop by itself after the chosen duration.' },
        { t: 'A soft ambient light', p: 'A warm glow under the base, on or off as you like. A coloured indicator shows the current setting.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Your range' },
      eyebrow: 'What you have just seen',
      recap: [
        { time: '07:30', text: 'One press and the morning oil diffuses. Nothing to prepare.' },
        { time: '18:30', text: 'A different oil in one second, nothing to empty or rinse.' },
        { time: '22:00', text: 'Cordless and silent at the bedside, up to 90 h of battery.' },
      ],
      h: 'What Tolia brings to your range',
      adv: [
        { t: 'Your bottles become the refill', p: 'The module screws onto standard bottles (DIN 18 neck, 5 to 50 ml). Customers rebuy your oils, not a cartridge.' },
        { t: 'Your whole catalogue diffuses', p: 'Tested on more than 150 essential oils and blends, the technology also diffuses synthetic fragrances.' },
        { t: 'One single reference to manage', p: 'One universal diffuser instead of several models: less stock, less after-sales, one story in store.' },
        { t: 'A diffuser in your image', p: 'Cover, colours, materials, logo, box, diffusion modes: Tolia carries your brand from end to end.' },
      ],
      sign: 'Nobody had yet designed a diffuser around the brand’s own bottle. That is what makes it so simple, and what brings your customers back to your oils.',
    },
    bilan: {
      stop: { time: '', sub: 'Summary' },
      eyebrow: 'The day in summary',
      h: 'We designed Tolia to be wonderfully simple. That is why people use it every day.',
      tiles: [
        { big: '1 diffuser', small: '3 moments, 3 essential oils, no effort at all' },
        { big: '24+', small: 'bottles bought per year by each equipped customer, versus 2 to 3 with a classic diffuser' },
        { big: 'Up to 8×', small: 'more essential oil consumed' },
      ],
      p: 'Coffee proved it: the day an espresso came down to a single gesture, it became a daily ritual and a recurring brand purchase. Tolia brings that gesture to essential oils, with no capsule: with your own bottles.',
      cta: 'Get your free sample',
      cta2: 'Book 15 min with the team',
      note: 'Measured at a client brand, over the 6 months following the diffuser purchase.',
    },
  },
  es: {
    head: {
      kicker: 'Un día con Tolia',
      h2: 'Acompañe a Tolia de la mañana a la noche: tres momentos, tres aceites esenciales, un solo difusor.',
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
    },
    matin: {
      stop: { time: '07:30', sub: 'Mañana' },
      eyebrow: '07:30 · Por la mañana, en la cocina',
      h: 'Una pulsación, y la difusión empieza antes que el café.',
      p: 'Al despertar, nadie tiene ganas de llenar un depósito, contar gotas o esperar a que un aparato se caliente. Con Tolia, el frasco de menta piperita ya está en su sitio: una pulsación en la base y la bruma de aceite esencial se extiende enseguida por la cocina. Nada que preparar, nada que limpiar después.',
      alt: 'Difusor Tolia abierto sobre una mesa de cocina a primera hora: el frasco Mañana está encajado en la base, la bruma sale de la boquilla y otros dos frascos esperan al lado',
      callouts: [
        { t: 'Su frasco, tal cual', p: 'El frasco de menta piperita se encaja boca abajo en la base. Sin trasvases ni gotas que contar.' },
        { t: 'Una pulsación para empezar', p: 'La difusión arranca al instante, sin tiempo de calentamiento. Intensidad, duración y pausas se ajustan con una pulsación.' },
        { t: 'Una bruma de aceite puro', p: 'Nebulización en frío: sin agua ni calor. El aceite esencial se difunde tal como sale del frasco.' },
        { t: 'Los demás aceites esperan su momento', p: 'Cada frasco conserva su módulo de difusión enroscado: está listo para ocupar el lugar del anterior.' },
      ],
    },
    journee: {
      stop: { time: '18:30', sub: 'Día' },
      eyebrow: '18:30 · Al final del día, en el salón',
      h: '¿Le apetece otro aceite esencial? Basta un segundo.',
      p: 'Al final del día, apetece una nota más suave. Con un difusor clásico habría que vaciar, enjuagar, secar y volver a llenar el depósito. Con Tolia, el módulo de difusión permanece enroscado en cada frasco: se retira la menta piperita, se encaja la naranja dulce, se vuelve a colocar la cubierta y la difusión se reanuda.',
      alt: 'En el salón, el frasco Mañana sale de la base de Tolia, el frasco Día ocupa su lugar, luego se vuelve a colocar la cubierta y la bruma sale de nuevo',
      chrono: 'para cambiar de aceite',
      callouts: [
        { t: 'Un módulo en cada frasco', p: 'Se enrosca una sola vez. Después, ya nunca se vacía, se enjuaga ni se mezcla nada.' },
        { t: 'Encajar y listo', p: 'El frasco se encaja en la base como un teléfono en su soporte. No se pierde ni una gota.' },
        { t: 'Pura, intacta, silenciosa', p: 'Sin agua que lo diluya ni calor que lo altere, el aceite conserva todo su aroma. Sin bomba ni ventilador: no se oye nada.' },
        { t: 'Todo su catálogo', p: 'Una tecnología probada con más de 150 aceites esenciales y sinergias, capaz de difundir también perfumes sintéticos.' },
      ],
    },
    soir: {
      stop: { time: '22:00', sub: 'Noche' },
      eyebrow: '22:00 · Por la noche, en el dormitorio',
      h: 'Sin cables y sin ruido, Tolia acompaña la hora de dormir.',
      p: 'Por la noche, Tolia se lleva al dormitorio como se lleva un libro: no tiene cable. Se encaja la lavanda verdadera, se elige una difusión suave con pausas y nada perturba el sueño. Su batería dura hasta 90 horas y se recarga como un teléfono.',
      alt: 'En el dormitorio, el frasco Día sale de la base, el frasco Noche ocupa su lugar y se vuelve a colocar la cubierta sobre el difusor',
      chrono: 'un segundo más',
      callouts: [
        { t: 'Sin cables, hasta 90 h', p: 'Batería recargable por USB-C: de 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental.' },
        { t: 'La lavanda, ya lista', p: 'Su módulo ya está enroscado: sustituye a la naranja dulce con un simple clic.' },
        { t: 'Nada perturba el sueño', p: 'Sin bomba, sin ventilador, sin vibración. La difusión puede detenerse sola al cabo de la duración elegida.' },
        { t: 'Una luz ambiental suave', p: 'Un halo cálido bajo la base, encendido o apagado a su gusto. Un indicador de color muestra el ajuste en curso.' },
      ],
    },
    gamme: {
      stop: { time: '', sub: 'Su gama' },
      eyebrow: 'Lo que acaba de ver',
      recap: [
        { time: '07:30', text: 'Una pulsación y el aceite de la mañana se difunde. Nada que preparar.' },
        { time: '18:30', text: 'Otro aceite en un segundo, sin vaciar ni enjuagar nada.' },
        { time: '22:00', text: 'Sin cables y silencioso junto a la cama, hasta 90 h de batería.' },
      ],
      h: 'Lo que Tolia aporta a su gama',
      adv: [
        { t: 'Sus frascos se convierten en la recarga', p: 'El módulo se enrosca en frascos estándar (cuello DIN 18, de 5 a 50 ml). Sus clientes recompran sus aceites, no un cartucho.' },
        { t: 'Todo su catálogo se difunde', p: 'Probada con más de 150 aceites esenciales y sinergias, la tecnología difunde también perfumes sintéticos.' },
        { t: 'Una sola referencia que gestionar', p: 'Un difusor universal en lugar de varios modelos: menos stock, menos posventa, un solo discurso en tienda.' },
        { t: 'Un difusor a su imagen', p: 'Cubierta, colores, materiales, logotipo, estuche, modos de difusión: Tolia lleva su marca de principio a fin.' },
      ],
      sign: 'Nadie había diseñado todavía un difusor en torno al frasco de la marca. Eso es lo que lo hace tan sencillo, y lo que hace volver a sus clientes a sus aceites.',
    },
    bilan: {
      stop: { time: '', sub: 'Balance' },
      eyebrow: 'Balance del día',
      h: 'Diseñamos Tolia para que sea extraordinariamente sencillo. Por eso se usa todos los días.',
      tiles: [
        { big: '1 difusor', small: '3 momentos, 3 aceites esenciales, ningún esfuerzo' },
        { big: '24+', small: 'frascos comprados al año por cada cliente equipado, frente a 2 o 3 con un difusor clásico' },
        { big: 'Hasta 8×', small: 'más aceites esenciales consumidos' },
      ],
      p: 'El café lo demostró: el día en que un espresso cupo en un solo gesto, se convirtió en un ritual diario y en una compra de marca recurrente. Tolia lleva ese gesto a los aceites esenciales, sin cápsula: con sus propios frascos.',
      cta: 'Reciba su muestra gratuita',
      cta2: 'Reservar 15 min con el equipo',
      note: 'Medición real en una marca cliente, durante los 6 meses posteriores a la compra del difusor.',
    },
  },
};
