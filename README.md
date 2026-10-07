# Ferme Paxkoteia — site vitrine

Site de la ferme d'Edouard Exilard à Lohitzun-Oyhercq (Soule, Pays Basque),
conçu par Franck Laharrague. Site statique publié avec GitHub Pages depuis la
branche `main` : pas de compilation, pas de dépendance à installer.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : histoire, engagement, chiffres, productions, campagne Bluebees, 3 dernières actualités, agrotourisme, vidéos, presse, contact, galerie |
| `ecrin-protecteur.html` | Le projet d'accueil des jeunes de l'Aide Sociale à l'Enfance (campagne Bluebees terminée) |
| `actualites.html` | Toutes les actualités |

## Organisation

- `css/site.css` : styles communs à toutes les pages
- `js/site.js` : menu mobile, apparitions au défilement, visionneuse photo
- `js/actualites.js` : affichage des actualités à partir de `actualites/articles.json`
- `assets/photos/` : photos du site ; `assets/actualites/` : médias des actualités
- `assets/partage-paxkoteia.jpg` : image d'aperçu quand on partage le site (1200 × 630)
- `.pages.yml` : configuration de l'éditeur en ligne Pages CMS
- `GUIDE-ACTUALITES.md` : **mode d'emploi pour publier une actualité**

## Adresse du site

Les balises d'aperçu au partage (`og:url`, `og:image`, `canonical`) utilisent
`https://franck-laharrague.github.io/Paxkoteia/`. Si le site passe sur un nom de
domaine à lui, remplacer cette adresse dans les trois fichiers `.html`.

## Tester en local

Les actualités sont chargées par le navigateur : ouvrir le fichier directement
(`file://`) ne les affiche pas. Lancer un petit serveur à la racine :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
