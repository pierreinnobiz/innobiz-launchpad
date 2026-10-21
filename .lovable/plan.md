# Audit www.innobiz-tolia.com — préconisations classées par priorité

Audit en lecture seule (aucun fichier modifié). Constats vérifiés sur le site publié le 21/10/2026, sauf mention « à confirmer ». Chaque point : problème, impact, correction, risque, type (Réglage Lovable / Code).

## Constats vérifiés sur la production

- HTTPS forcé (http vers https en 301), HSTS, nosniff et Referrer-Policy présents. Compression gzip active (pas de Brotli observé).
- Fichiers JS/CSS versionnés : cache 1 an « immutable ». Pages HTML : no-cache. Correct.
- /fr/ sert bien sa propre page avec canonical et hreflang FR/EN/ES/x-default.
- JS principal : environ 216 Ko compressés (environ 780 Ko bruts), CSS 17 Ko.
- Animation « journée » : 409 fichiers, 24 Mo dans public/journee/anim (bedroom + living).
- innobiz-tolia.com (sans www) répond 200 au lieu de rediriger vers www.
- Une adresse inexistante (/xyz-404) répond 200 au lieu de 404.
- Images d'animation servies sans en-tête de cache explicite.

## Priorité 1 (impact fort, à traiter d'abord)

1. Redirection sans-www vers www absente
   - Impact : contenu en double pour Google, autorité partagée entre deux adresses.
   - Correction : définir www.innobiz-tolia.com comme domaine principal dans Paramètres > Domaines (redirection 301 automatique de l'autre).
   - Risque : très faible. Type : Réglage Lovable.

2. Fausses pages 404 (« soft 404 »)
   - Impact : Google indexe des adresses vides, signal qualité dégradé.
   - Correction : la page « introuvable » ajoute une balise noindex ; à terme, une page 404 statique. Le statut HTTP 200 de l'hébergement ne peut pas être changé côté projet.
   - Risque : faible. Type : Code (+ limite d'hébergement).

3. Poids de l'animation « journée » (24 Mo, 409 images)
   - Impact : LCP/INP sur mobile, consommation data, risque de saccades.
   - Correction : charger uniquement la séquence de l'appareil (mobile ou ordinateur) et seulement à l'approche de la section ; en mouvement réduit, une seule image fixe ; réduire le nombre d'images (une sur deux) ou passer à une courte vidéo. Images réelles conservées, aucune génération IA.
   - Risque : moyen (fluidité de l'animation à valider visuellement). Type : Code.

4. Lecteur Vimeo du haut de page
   - Impact : élément principal du LCP mobile ; le fond noir retarde l'affichage perçu (le poster a été retiré à votre demande).
   - Correction : héberger le film en MP4/WebM compressé servi par le site (lecture native, sans script Vimeo d'environ 300 Ko), en gardant le même film et aucun poster.
   - Risque : moyen (poids du fichier, compatibilité iOS à tester). Type : Code.

## Priorité 2

5. JavaScript principal (216 Ko compressés)
   - Correction : sortir du premier chargement les pages admin/audit déjà séparées, l'animation (framer-motion) hors du haut de page, la bibliothèque de base de données chargée seulement à l'ouverture du formulaire, les traductions des langues non affichées.
   - Impact : INP et temps d'interactivité mobile. Risque : faible à moyen. Type : Code.

6. Polices
   - Inter est chargée depuis Google (connexion externe). Correction : héberger Inter sur le site, limiter aux graisses utilisées (probablement 400/500/600/700), précharger une seule graisse.
   - Risque : faible. Type : Code.

7. Cache des images et vidéos de public/
   - Correction : renommer les fichiers lourds avec une empreinte (import dans le code) pour bénéficier du cache 1 an ; les en-têtes personnalisés ne sont pas configurables dans Lovable.
   - Risque : faible. Type : Code.

8. Données structurées JSON-LD
   - Le bloc Product n'a ni prix ni avis : Google peut le signaler comme incomplet. Correction : passer en Organization + WebSite + FAQPage (FAQ déjà présente) par langue, sans nouvelle affirmation produit. « logo » pointe vers l'image de partage : utiliser le vrai logo.
   - Risque : faible. Type : Code.

9. Sitemap
   - Vérifier qu'il liste /fr/, /en/, /es/ (et non plus ?lang=) avec hreflang réciproques, et retirer /faq (redirection).
   - Risque : faible. Type : Code (fichier public/sitemap.xml).

10. Consentement cookies et GA4
   - gtag.js est chargé même en cas de refus (Consent Mode avancé, pings sans cookie). Conforme au mode avancé mais à valider avec votre DPO ; alternative : mode basique (aucun chargement avant accord).
   - Vérifier dans GA4 DebugView les événements form_start / form_step_complete / form_submit dans les 3 langues.
   - Risque : faible. Type : Code + vérification analytics.

11. Formulaire d'échantillon (send-qualification-form)
   - Ajouter une protection anti-spam invisible (champ piège + limite de fréquence par adresse IP), un message d'erreur clair si le CRM ne répond pas (la demande est quand même enregistrée, règle « ne jamais bloquer »), et un journal en base des échecs CRM pour relance.
   - Risque : faible. Type : Code (fonction backend).

## Priorité 3

12. Accessibilité
   - Contraste : vérifier les textes beige/ambre clairs sur fond crème et les textes gris sur le hero sombre (WCAG AA 4,5:1).
   - Clavier : lien « Aller au contenu », contour de focus visible sur boutons et sélecteur de langue, menu mobile fermable par Échap.
   - Cibles tactiles : boutons icône (menu, langue, carrousels, points de navigation) à 44 × 44 px minimum.
   - Textes alternatifs : logos de marques et images d'animation (décoratives : alt vide).
   - Mouvement réduit : l'animation journée et le défilement doux doivent s'arrêter (à confirmer en test).
   - Risque : faible, sans changement de texte. Type : Code.

13. Mode sombre du système
   - Le site n'a pas de thème sombre : rendu identique, aucun défaut attendu. Ajouter `color-scheme: light` et une balise theme-color pour éviter que certains navigateurs mobiles inversent des couleurs.
   - Risque : très faible. Type : Code.

14. Favicon et icônes
   - Aucune balise favicon / apple-touch-icon dans la page. Correction : icône à partir du vrai logo Innobiz.
   - Risque : très faible. Type : Code.

15. Titres et descriptions
   - Le titre /fr/ ressort vide dans le HTML brut lors de notre lecture (à confirmer : peut être une balise multi-ligne). Vérifier titre et description propres à chaque langue dans les pages /fr/ /en/ /es/ générées.
   - Type : Code.

16. Autres réglages Lovable
   - Google Search Console : connecter, soumettre le sitemap, demander l'indexation de /fr/ /en/ /es/.
   - Onglet SEO de Lovable : lancer un scan complet.
   - Scan de sécurité : relancer (certains résultats sont anciens).
   - Analytics Lovable : suivre le trafic par langue.
   - Type : Réglage Lovable.

## Contraintes respectées

Aucun texte commercial ni affirmation produit modifiés, aucune image générée par IA, aucun changement dans seo/ ni public/llms-full.txt, adresses existantes conservées.

## Étape suivante proposée

Valider la priorité 1 (points 1 à 4) ; je fais d'abord un test mobile/tablette/ordinateur et mouvement réduit dans les 3 langues pour mesurer LCP/CLS/INP avant et après chaque correction.
