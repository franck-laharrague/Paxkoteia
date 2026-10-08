# Paxkoteia — mémoire du projet

Site vitrine de la ferme Paxkoteia (EARL Paxkoteia, Lohitzun-Oyhercq, Soule, Pays
Basque) d'**Edouard Exilard** et **Séverina**. Conçu et offert par **Franck
Laharrague** (artiste, photographe, ami d'Edouard), propriétaire du dépôt
`franck-laharrague/Paxkoteia`. Tout le site est en français.

Structure des fichiers et test en local : voir `README.md`.
Publier une actualité (Pages CMS) : voir `GUIDE-ACTUALITES.md`.

## Publication

- Site statique, **sans compilation ni dépendance** : HTML, CSS et JavaScript simples.
- Publié par **GitHub Pages depuis la branche `main`** : fusionner dans `main` = mettre en ligne.
- Adresse supposée : `https://franck-laharrague.github.io/Paxkoteia/`, utilisée dans
  `og:url`, `og:image` et `canonical` des trois pages. À changer partout si un nom de
  domaine est ajouté.

## Conventions

- **Pages** : `index.html`, `ecrin-protecteur.html`, `actualites.html`. Pour une nouvelle
  page, partir de `actualites.html` (en-tête, menu, pied de page, balises de partage).
  Depuis une page intérieure, les liens vers l'accueil s'écrivent `./#ancre`.
- **Styles** : tout est dans `css/site.css` (palette en variables `:root` : `--terre`,
  `--ocre`, `--mousse`… ; polices Cormorant Garamond pour les titres, Inter pour le texte).
  Pas de styles dans les pages, sauf petits réglages ponctuels.
- **Scripts** : `js/site.js` (menu, apparitions, visionneuse), `js/actualites.js`
  (actualités). La visionneuse fonctionne avec l'attribut `data-lightbox`.
- **Typographie française** : espaces insécables dans les montants (`7 295 €`),
  pourcentages, unités. `js/actualites.js` les ajoute automatiquement aux articles.
- **Photos** : `assets/photos/` pour le site, `assets/actualites/` pour les actualités
  (dossier géré par Pages CMS). Viser 1600 px maximum, qualité JPEG ~82.
- **Vidéos** : ré-encoder avant d'ajouter (largeur 960 px, H.264, `-crf 28 -maxrate 750k
  -movflags +faststart`), créer une image d'affiche (`poster`), `preload="none"`.
- **Actualités** : données dans `actualites/articles.json` (`{ "articles": [...] }`),
  formulaire décrit par `.pages.yml`. Renommer un champ oblige à modifier **les deux**
  fichiers et `js/actualites.js`. Le texte des articles est du HTML (nettoyé à l'affichage).
- **Ne rien inventer sur la ferme** : chiffres, noms et dates doivent venir d'une source
  (campagne Bluebees, agneau-bio-edouard.eu, presse, Franck ou Edouard). Signaler les doutes.
- Toujours vérifier dans un navigateur (ordinateur et mobile 390 px) avant de publier.

## Historique

- **Avril 2026** — v1 puis v2 du site par Franck (une seule page, 16 photos, 2 vidéos).
- **Octobre 2026** — session Claude, branche `mise-a-jour-actualites-bluebees` :
  - campagne Bluebees terminée : « Un écrin protecteur pour les jeunes de l'Aide Sociale
    à l'Enfance » (https://bluebees.fr/fr/project/1474-paxkoteia) — bandeau « Merci »,
    résultat, paliers ; nouvelle page `ecrin-protecteur.html` ;
  - section et page Actualités, éditables par Edouard avec Pages CMS, plus une action
    GitHub qui réduit les photos envoyées ;
  - vidéos allégées (25,6 Mo → 8,3 Mo), aperçu au partage, favicon ;
  - CSS/JS sortis des pages ; chiffres mis à jour (46 ha, 35 ans) ; maïs population,
    charcuterie, réseau Fermes d'Avenir ;
  - correctifs : marges du haut de l'accueil sur mobile, montants insécables.

## À faire / à vérifier

- [ ] Fusionner `mise-a-jour-actualites-bluebees` dans `main` pour publier.
- [ ] Vérifier sur la page Bluebees les chiffres repris sur le site : **7 295 €**
      collectés, objectif **6 000 €**, **51** contributeurs, paliers 6 000 € (sols et
      carrelage) et 7 500 € (électricité). Ils ont été lus dans des extraits de recherche
      web, bluebees.fr n'étant pas accessible depuis la session cloud.
- [ ] **Séverina ou Séverine ?** La campagne écrit « Séverine », le site « Séverina »
      (orthographe gardée en attendant).
- [ ] Confirmer **46 hectares** et **35 ans** (avant : 40 ha et 30 ans).
- [ ] Confirmer l'adresse publique du site (voir « Publication »).
- [ ] Mettre en place Pages CMS et inviter Edouard (`GUIDE-ACTUALITES.md`, partie 1).
- [ ] Idée : rendre les vignettes de la galerie accessibles au clavier (aujourd'hui des
      `<div>` cliquables).
