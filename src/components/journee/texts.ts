/* Textes de la séquence « Une journée avec Tolia » (FR validés par Pierre le 14/10/2026 ; EN et ES traduits).
   Deux écarts volontaires avec le texte validé, signalés dans le compte rendu :
   - bouton final : « Recevez votre échantillon gratuit » (libellé validé, repris du site) ;
   - écran « Pour votre marque » : « Une version unique, à votre image. » (formule de repli prévue tant que l'exclusivité
     contractuelle du design n'est pas confirmée). */
export type JourneeLang = 'fr' | 'en' | 'es';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JOURNEE_TEXTS: Record<JourneeLang, Record<string, any>> = {
 "fr": {
  "day.kicker": "Une journée avec Tolia",
  "day.h2": "Matin. Journée. Soir. Trois huiles, trois pièces, un seul diffuseur.",
  "day.skip": "Passer la séquence",
  "day.aria": "Une journée avec Tolia",
  "st.hint": "Faites défiler",
  "st.tl.aria": "Moments de la journée",
  "st.tl": [
   {
    "time": "07:30",
    "sub": "Cuisine"
   },
   {
    "time": "18:30",
    "sub": "Salon"
   },
   {
    "time": "22:00",
    "sub": "Chambre"
   },
   {
    "time": "Bilan",
    "sub": "Pour votre marque"
   }
  ],
  "st.A.eyebrow": "07:30 · Matin",
  "st.A.lines": [
   "Un geste,",
   "et la cuisine s’éveille."
  ],
  "st.A.oil": "Menthe poivrée",
  "st.A.bottle": "Flacon Matin",
  "st.A.wait": "Les huiles essentielles de la journée attendent leur tour.",
  "st.A.alt": "Diffuseur Tolia sur une table de cuisine au petit matin, flacon Matin enclenché, flacons Journée et Soir posés à côté, la brume sort en jet oblique de la buse",
  "st.B.l1": "Pas de gouttes à compter.",
  "st.B.l2": "Pas de temps de chauffe.",
  "st.B.l3": "Pas de mode d’emploi.",
  "st.B.big": "Toujours prêt.",
  "st.B.para": "Entre l’envie et la diffusion, il n’y a plus qu’un geste : un appui, et l’huile essentielle se diffuse aussitôt. Le matin, l’après-midi, le soir, sans jamais rien préparer.",
  "st.C.eyebrow": "18:30 · Journée",
  "st.C.lines1": [
   "Envie d’une autre",
   "huile essentielle ?"
  ],
  "st.C.lines2": [
   "Le salon passe",
   "aux notes solaires."
  ],
  "st.C.chrono": "pour changer d’huile",
  "st.C.para": "Ailleurs, changer d’huile, c’est vider, rincer, sécher, puis remplir. Avec Tolia, c’est <strong>1 seconde</strong> : le module de diffusion reste vissé sur chaque flacon, et l’on échange simplement un flacon contre un autre, d’un clic.",
  "st.C.oil": "Orange douce",
  "st.C.bottle": "Flacon Journée",
  "st.C.alt": "Le même diffuseur Tolia au salon : le flacon Matin sort de la base, le flacon Journée prend sa place, puis la cloche est reposée sur le diffuseur et la brume repart",
  "st.D.big": [
   "Pure. Intacte.",
   "Silencieuse."
  ],
  "st.D.para": "Sans eau qui la dilue, sans chaleur qui l’altère, sans bruit qui dérange : votre huile essentielle est diffusée telle qu’elle sort du flacon.",
  "st.D.alt": "Gros plan sur le diffuseur Tolia refermé : la brume sort de la buse en jet oblique",
  "st.E.eyebrow": "22:00 · Soir",
  "st.E.lines1": [
   "Il vous suit",
   "jusqu’au chevet."
  ],
  "st.E.lines2": [
   "La chambre",
   "se met au calme."
  ],
  "st.E.chrono1": "d’autonomie, sans fil",
  "st.E.chrono2": "encore un clic",
  "st.E.para1": "Sans fil, sur batterie : jusqu’à 90 heures d’autonomie.",
  "st.E.para2": "70 à 90 h lumière éteinte, 16 à 20 h lumière d’ambiance allumée, selon l’intensité.",
  "st.E.oil": "Lavande vraie",
  "st.E.bottle": "Flacon Soir",
  "st.E.alt": "Le même diffuseur Tolia sur une table de chevet la nuit : le flacon Journée sort de la base, le flacon Soir prend sa place, puis la cloche est reposée sur le diffuseur",
  "st.F.eyebrow": "Pour votre marque",
  "st.F.big": "Votre diffuseur.<br>Vos huiles essentielles.<br><em>Votre marque.</em>",
  "st.F.p1": "Notre nouvelle technologie de diffusion se visse directement sur les flacons standard du marché (col DIN 18). Chaque huile essentielle de votre gamme devient diffusable telle quelle, sous votre marque.",
  "st.F.p2": "Le diffuseur lui-même s’adapte entièrement à votre identité : couleurs, matières, finitions, programmation, logo et coffret. <strong>Une version unique, à votre image.</strong>",
  "st.F.alt": "Sept diffuseurs Tolia personnalisés : motifs de cloche, couleurs et matières différents",
  "st.F.alt2": "Diffuseur Tolia avec « YOUR BRAND » inscrit sous le module de diffusion",
  "st.F.cap1": "Motifs de la cloche · Couleurs · Matières",
  "st.F.cap2": "Votre marque, sous le module de diffusion",
  "st.G.p1": "Aujourd’hui, une maison qui diffuse accumule les appareils : un diffuseur à eau au salon, un autre dans la chambre, des bâtonnets dans l’entrée. Chacun avec ses contraintes.",
  "st.G.big": "Tolia les remplace <em>tous.</em>",
  "st.G.p2": "Sans fil, il passe d’une pièce à l’autre. En 1 seconde, il change d’huile essentielle pour chaque moment.",
  "st.G.rooms": [
   "07:30 · Cuisine",
   "18:30 · Salon",
   "22:00 · Chambre"
  ],
  "st.G.p3": "<strong>Pour votre marque :</strong> un seul diffuseur à référencer, au lieu d’une gamme entière.",
  "st.G.sign": "Le seul diffuseur qui réunit tout : sans fil, sans eau, sans nettoyage, et une huile différente en 1 seconde.",
  "st.H.big": "La simplicité<br><em>fait consommer.</em>",
  "st.H.p1": "Le café l’a prouvé. Le jour où un expresso a tenu en un geste, le café est devenu un rituel quotidien et un achat de marque récurrent.",
  "st.H.p2": "Tolia apporte ce geste aux huiles essentielles. <strong>Sans capsule : avec vos flacons.</strong>",
  "st.I.eyebrow": "Bilan de la journée",
  "st.I.h": "<em>1</em> diffuseur · <em>3</em> moments<br><em>3</em> huiles essentielles",
  "st.I.tiles": [
   {
    "t": "07:30",
    "o": "Menthe poivrée",
    "alt": "Le diffuseur Tolia à 07:30, menthe poivrée"
   },
   {
    "t": "18:30",
    "o": "Orange douce",
    "alt": "Le diffuseur Tolia à 18:30, orange douce"
   },
   {
    "t": "22:00",
    "o": "Lavande vraie",
    "alt": "Le diffuseur Tolia à 22:00, lavande vraie"
   }
  ],
  "st.I.p": "Quand diffuser ne demande plus aucun effort, on diffuse chaque jour, à chaque moment : au réveil, au travail, pour recevoir, au coucher. Chaque moment appelle son flacon, et chaque flacon vidé se rachète.",
  "st.I.stat": "<strong>24+</strong><span>flacons par an et par client équipé, contre 2&nbsp;à&nbsp;3 avec un diffuseur classique.</span>",
  "st.I.x8": "Jusqu’à <em>8×</em> plus d’huiles essentielles consommées.",
  "st.I.cta": "Recevez votre échantillon gratuit",
  "st.I.note": "Mesure réelle chez une marque cliente, sur les 6&nbsp;mois suivant l’achat du diffuseur."
 },
 "en": {
  "day.kicker": "A day with Tolia",
  "day.h2": "Morning. Day. Evening. Three oils, three rooms, one diffuser.",
  "day.skip": "Skip the sequence",
  "day.aria": "A day with Tolia",
  "st.hint": "Scroll",
  "st.tl.aria": "Moments of the day",
  "st.tl": [
   {
    "time": "07:30",
    "sub": "Kitchen"
   },
   {
    "time": "18:30",
    "sub": "Living room"
   },
   {
    "time": "22:00",
    "sub": "Bedroom"
   },
   {
    "time": "Summary",
    "sub": "For your brand"
   }
  ],
  "st.A.eyebrow": "07:30 · Morning",
  "st.A.lines": [
   "One touch,",
   "and the kitchen wakes up."
  ],
  "st.A.oil": "Peppermint",
  "st.A.bottle": "Morning bottle",
  "st.A.wait": "The day’s other essential oils wait their turn.",
  "st.A.alt": "Tolia diffuser on a kitchen table in the early morning, the Morning bottle clicked in, the Day and Evening bottles standing beside it, the mist leaving the nozzle in an oblique jet",
  "st.B.l1": "No drops to count.",
  "st.B.l2": "No warm-up time.",
  "st.B.l3": "No instructions.",
  "st.B.big": "Always ready.",
  "st.B.para": "Between the wish and the mist there is now a single gesture: one touch, and the essential oil diffuses at once. Morning, afternoon, evening, without ever preparing anything.",
  "st.C.eyebrow": "18:30 · Day",
  "st.C.lines1": [
   "Fancy a different",
   "essential oil?"
  ],
  "st.C.lines2": [
   "The living room",
   "turns to sunny notes."
  ],
  "st.C.chrono": "to change oil",
  "st.C.para": "Elsewhere, changing oil means emptying, rinsing, drying, then refilling. With Tolia it takes <strong>1 second</strong>: the diffusion module stays screwed onto each bottle, and you simply swap one bottle for another with a click.",
  "st.C.oil": "Sweet orange",
  "st.C.bottle": "Day bottle",
  "st.C.alt": "The same Tolia diffuser in the living room: the Morning bottle leaves the base, the Day bottle takes its place, then the cover is set back on the diffuser and the mist starts again",
  "st.D.big": [
   "Pure. Intact.",
   "Silent."
  ],
  "st.D.para": "No water to dilute it, no heat to alter it, no noise to disturb: your essential oil is diffused exactly as it comes out of the bottle.",
  "st.D.alt": "Close-up of the closed Tolia diffuser: the mist leaves the nozzle in an oblique jet",
  "st.E.eyebrow": "22:00 · Evening",
  "st.E.lines1": [
   "It follows you",
   "to the bedside."
  ],
  "st.E.lines2": [
   "The bedroom",
   "settles down."
  ],
  "st.E.chrono1": "of battery, cordless",
  "st.E.chrono2": "one more click",
  "st.E.para1": "Cordless, on battery: up to 90 hours.",
  "st.E.para2": "70 to 90 h with the light off, 16 to 20 h with the ambient light on, depending on intensity.",
  "st.E.oil": "True lavender",
  "st.E.bottle": "Evening bottle",
  "st.E.alt": "The same Tolia diffuser on a bedside table at night: the Day bottle leaves the base, the Evening bottle takes its place, then the cover is set back on the diffuser",
  "st.F.eyebrow": "For your brand",
  "st.F.big": "Your diffuser.<br>Your essential oils.<br><em>Your brand.</em>",
  "st.F.p1": "Our new diffusion technology screws straight onto standard market bottles (DIN 18 neck). Every essential oil in your range becomes diffusable as it is, under your brand.",
  "st.F.p2": "The diffuser itself adapts fully to your identity: colours, materials, finishes, programming, logo and box. <strong>A version of your own, unique to your brand.</strong>",
  "st.F.alt": "Seven customised Tolia diffusers: different cover patterns, colours and materials",
  "st.F.alt2": "Tolia diffuser with “YOUR BRAND” printed under the diffusion module",
  "st.F.cap1": "Cover patterns · Colours · Materials",
  "st.F.cap2": "Your brand, under the diffusion module",
  "st.G.p1": "Today, a home that diffuses piles up devices: a water diffuser in the living room, another in the bedroom, reed sticks in the hall. Each with its own constraints.",
  "st.G.big": "Tolia replaces <em>them all.</em>",
  "st.G.p2": "Cordless, it moves from room to room. In 1 second, it changes essential oil for every moment.",
  "st.G.rooms": [
   "07:30 · Kitchen",
   "18:30 · Living room",
   "22:00 · Bedroom"
  ],
  "st.G.p3": "<strong>For your brand:</strong> a single diffuser to list, instead of a whole range.",
  "st.G.sign": "The only diffuser that brings it all together: cordless, waterless, no cleaning, and a different oil in 1 second.",
  "st.H.big": "Simplicity<br><em>drives consumption.</em>",
  "st.H.p1": "Coffee proved it. The day an espresso came down to a single gesture, coffee became a daily ritual and a recurring brand purchase.",
  "st.H.p2": "Tolia brings that gesture to essential oils. <strong>No capsule: with your own bottles.</strong>",
  "st.I.eyebrow": "The day in summary",
  "st.I.h": "<em>1</em> diffuser · <em>3</em> moments<br><em>3</em> essential oils",
  "st.I.tiles": [
   {
    "t": "07:30",
    "o": "Peppermint",
    "alt": "The Tolia diffuser at 07:30, peppermint"
   },
   {
    "t": "18:30",
    "o": "Sweet orange",
    "alt": "The Tolia diffuser at 18:30, sweet orange"
   },
   {
    "t": "22:00",
    "o": "True lavender",
    "alt": "The Tolia diffuser at 22:00, true lavender"
   }
  ],
  "st.I.p": "When diffusing takes no effort, people diffuse every day, at every moment: on waking, at work, when hosting, at bedtime. Each moment calls for its bottle, and every empty bottle gets bought again.",
  "st.I.stat": "<strong>24+</strong><span>bottles a year per equipped customer, versus 2&nbsp;to&nbsp;3 with a classic diffuser.</span>",
  "st.I.x8": "Up to <em>8×</em> more essential oil consumed.",
  "st.I.cta": "Get your free sample",
  "st.I.note": "Measured at a client brand, over the 6&nbsp;months following the diffuser purchase."
 },
 "es": {
  "day.kicker": "Un día con Tolia",
  "day.h2": "Mañana. Día. Noche. Tres aceites, tres estancias, un solo difusor.",
  "day.skip": "Saltar la secuencia",
  "day.aria": "Un día con Tolia",
  "st.hint": "Desplácese",
  "st.tl.aria": "Momentos del día",
  "st.tl": [
   {
    "time": "07:30",
    "sub": "Cocina"
   },
   {
    "time": "18:30",
    "sub": "Salón"
   },
   {
    "time": "22:00",
    "sub": "Dormitorio"
   },
   {
    "time": "Resumen",
    "sub": "Para su marca"
   }
  ],
  "st.A.eyebrow": "07:30 · Mañana",
  "st.A.lines": [
   "Un gesto,",
   "y la cocina despierta."
  ],
  "st.A.oil": "Menta piperita",
  "st.A.bottle": "Frasco Mañana",
  "st.A.wait": "Los aceites esenciales del día esperan su turno.",
  "st.A.alt": "Difusor Tolia sobre una mesa de cocina a primera hora, con el frasco Mañana acoplado y los frascos Día y Noche a su lado; la bruma sale de la boquilla en un chorro oblicuo",
  "st.B.l1": "Sin gotas que contar.",
  "st.B.l2": "Sin tiempo de calentamiento.",
  "st.B.l3": "Sin instrucciones.",
  "st.B.big": "Siempre listo.",
  "st.B.para": "Entre las ganas y la difusión solo queda un gesto: una pulsación y el aceite esencial se difunde al instante. Por la mañana, por la tarde, por la noche, sin preparar nada.",
  "st.C.eyebrow": "18:30 · Día",
  "st.C.lines1": [
   "¿Ganas de otro",
   "aceite esencial?"
  ],
  "st.C.lines2": [
   "El salón pasa",
   "a las notas solares."
  ],
  "st.C.chrono": "para cambiar de aceite",
  "st.C.para": "En otros difusores, cambiar de aceite significa vaciar, enjuagar, secar y volver a llenar. Con Tolia son <strong>1 segundo</strong>: el módulo de difusión permanece enroscado en cada frasco y basta con cambiar un frasco por otro, con un clic.",
  "st.C.oil": "Naranja dulce",
  "st.C.bottle": "Frasco Día",
  "st.C.alt": "El mismo difusor Tolia en el salón: el frasco Mañana sale de la base, el frasco Día ocupa su lugar, después se vuelve a colocar la cubierta sobre el difusor y la bruma sale de nuevo",
  "st.D.big": [
   "Pura. Intacta.",
   "Silenciosa."
  ],
  "st.D.para": "Sin agua que la diluya, sin calor que la altere, sin ruido que moleste: su aceite esencial se difunde tal como sale del frasco.",
  "st.D.alt": "Primer plano del difusor Tolia cerrado: la bruma sale de la boquilla en un chorro oblicuo",
  "st.E.eyebrow": "22:00 · Noche",
  "st.E.lines1": [
   "Le acompaña",
   "hasta la mesita de noche."
  ],
  "st.E.lines2": [
   "El dormitorio",
   "se serena."
  ],
  "st.E.chrono1": "de autonomía, sin cables",
  "st.E.chrono2": "un clic más",
  "st.E.para1": "Sin cables, con batería: hasta 90 horas de autonomía.",
  "st.E.para2": "De 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental encendida, según la intensidad.",
  "st.E.oil": "Lavanda verdadera",
  "st.E.bottle": "Frasco Noche",
  "st.E.alt": "El mismo difusor Tolia sobre una mesita de noche: el frasco Día sale de la base, el frasco Noche ocupa su lugar y se vuelve a colocar la cubierta sobre el difusor",
  "st.F.eyebrow": "Para su marca",
  "st.F.big": "Su difusor.<br>Sus aceites esenciales.<br><em>Su marca.</em>",
  "st.F.p1": "Nuestra nueva tecnología de difusión se enrosca directamente en los frascos estándar del mercado (cuello DIN 18). Cada aceite esencial de su gama se puede difundir tal cual, bajo su marca.",
  "st.F.p2": "El propio difusor se adapta por completo a su identidad: colores, materiales, acabados, programación, logotipo y estuche. <strong>Una versión única, a su imagen.</strong>",
  "st.F.alt": "Siete difusores Tolia personalizados: distintos motivos de cubierta, colores y materiales",
  "st.F.alt2": "Difusor Tolia con «YOUR BRAND» impreso bajo el módulo de difusión",
  "st.F.cap1": "Motivos de la cubierta · Colores · Materiales",
  "st.F.cap2": "Su marca, bajo el módulo de difusión",
  "st.G.p1": "Hoy, un hogar que difunde acumula aparatos: un difusor de agua en el salón, otro en el dormitorio, varillas en la entrada. Cada uno con sus limitaciones.",
  "st.G.big": "Tolia los sustituye <em>a todos.</em>",
  "st.G.p2": "Sin cables, pasa de una estancia a otra. En 1 segundo cambia de aceite esencial para cada momento.",
  "st.G.rooms": [
   "07:30 · Cocina",
   "18:30 · Salón",
   "22:00 · Dormitorio"
  ],
  "st.G.p3": "<strong>Para su marca:</strong> un solo difusor que referenciar, en lugar de una gama entera.",
  "st.G.sign": "El único difusor que lo reúne todo: sin cables, sin agua, sin limpieza y con un aceite distinto en 1 segundo.",
  "st.H.big": "La sencillez<br><em>hace consumir.</em>",
  "st.H.p1": "El café lo demostró. El día en que un espresso cupo en un solo gesto, el café se convirtió en un ritual diario y en una compra de marca recurrente.",
  "st.H.p2": "Tolia lleva ese gesto a los aceites esenciales. <strong>Sin cápsula: con sus propios frascos.</strong>",
  "st.I.eyebrow": "Balance del día",
  "st.I.h": "<em>1</em> difusor · <em>3</em> momentos<br><em>3</em> aceites esenciales",
  "st.I.tiles": [
   {
    "t": "07:30",
    "o": "Menta piperita",
    "alt": "El difusor Tolia a las 07:30, menta piperita"
   },
   {
    "t": "18:30",
    "o": "Naranja dulce",
    "alt": "El difusor Tolia a las 18:30, naranja dulce"
   },
   {
    "t": "22:00",
    "o": "Lavanda verdadera",
    "alt": "El difusor Tolia a las 22:00, lavanda verdadera"
   }
  ],
  "st.I.p": "Cuando difundir no exige ningún esfuerzo, se difunde cada día, en cada momento: al despertar, en el trabajo, al recibir, al acostarse. Cada momento pide su frasco, y cada frasco vacío se vuelve a comprar.",
  "st.I.stat": "<strong>24+</strong><span>frascos al año por cliente equipado, frente a 2&nbsp;o&nbsp;3 con un difusor clásico.</span>",
  "st.I.x8": "Hasta <em>8×</em> más aceites esenciales consumidos.",
  "st.I.cta": "Reciba su muestra gratuita",
  "st.I.note": "Medición real en una marca cliente, durante los 6&nbsp;meses posteriores a la compra del difusor."
 }
};
