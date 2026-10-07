# Publier une actualité sur le site Paxkoteia

Les actualités s'écrivent dans **Pages CMS**, un formulaire en ligne gratuit. On
remplit un titre, un texte, on ajoute des photos ou une vidéo, on clique sur
**Save** : l'article est en ligne sur le site **1 à 2 minutes plus tard**.

Pas besoin de toucher au code ni d'avoir de compte GitHub. Ça marche sur
ordinateur comme sur téléphone.

---

## 1. Pour Franck : la mise en place (une seule fois, 10 minutes)

1. **Publier cette version du site** : fusionner la branche dans `main` (le site
   est publié par GitHub Pages depuis `main`).
2. Aller sur **https://app.pagescms.org** → **Sign in with GitHub** avec le compte
   `franck-laharrague`.
3. Accepter d'installer l'application GitHub **Pages CMS**, en choisissant
   *Only select repositories* → `Paxkoteia`.
4. Ouvrir le dépôt **Paxkoteia** dans Pages CMS : le menu **Actualités** apparaît
   tout seul (il est décrit dans le fichier `.pages.yml`).
5. Dans le menu de gauche, **Collaborators** → saisir l'adresse e-mail d'Edouard →
   l'inviter. Edouard reçoit un e-mail d'invitation.

## 2. Pour Edouard : se connecter

1. Ouvrir **https://app.pagescms.org** (on peut l'ajouter à l'écran d'accueil du
   téléphone).
2. Taper son adresse e-mail puis **Continue with email**.
3. Recopier le **code reçu par e-mail**. C'est tout : pas de mot de passe à retenir.
4. Ouvrir **Paxkoteia**, puis **Actualités** dans le menu.

## 3. Écrire un article

1. Tout en bas de la liste des articles, cliquer sur **Add an item**.
2. Remplir les cases :

   | Case | À quoi ça sert |
   | --- | --- |
   | **Titre** | Obligatoire. Court et parlant : « Le carrelage est posé ! » |
   | **Date** | Obligatoire. Les articles sont rangés du plus récent au plus ancien, peu importe leur place dans la liste. |
   | **Visible sur le site** | Décocher = brouillon, l'article reste invisible. |
   | **Résumé** | 1 à 3 phrases. Elles s'affichent sur la page d'accueil. |
   | **Photo principale** | La grande photo en haut de l'article et sur la page d'accueil. |
   | **Texte de l'article** | Le texte, avec gras, italique, intertitres, listes, **liens** (icône chaîne 🔗 après avoir sélectionné les mots) et photos dans le texte. |
   | **Vidéo (lien)** | Coller l'adresse d'une vidéo **YouTube**, **Vimeo** ou **Facebook** : elle s'affiche directement dans l'article. |
   | **Vidéo (fichier)** | Seulement pour une vidéo **courte** (MP4, moins de 50 Mo). Pour une vidéo longue, la mettre sur YouTube et coller le lien au-dessus. |
   | **Galerie de photos** | Autant de photos que vous voulez ; sur le site, un clic les agrandit. |
   | **Boutons de liens** | Des boutons en bas de l'article : « Commander un colis d'agneau », « Lire l'article de La République »… Texte du bouton + adresse complète (`https://…`). |

3. Cliquer sur **Save** en haut à droite. C'est publié ! Le site se met à jour en
   1 à 2 minutes (rafraîchir la page si besoin).

Seuls **Titre** et **Date** sont obligatoires : un article peut être un simple
texte, une photo avec deux lignes, ou juste une vidéo.

## 4. Modifier ou supprimer un article

- **Modifier** : cliquer sur l'article dans la liste, changer ce qu'il faut, **Save**.
- **Cacher** sans supprimer : décocher **Visible sur le site**, **Save**.
- **Supprimer** : ouvrir l'article, utiliser l'icône corbeille du bloc, **Save**.

## 5. Bon à savoir

- **Photos du téléphone** : envoyez-les telles quelles. Une fois publiées, le site
  les réduit tout seul (1600 px maximum, et la position GPS est retirée).
- **iPhone** : si une photo est refusée (format HEIC), choisir dans *Réglages →
  Appareil photo → Formats* l'option **« Le plus compatible »**, ou faire une
  capture d'écran de la photo.
- **Un lien vers un article** à partager (Facebook, WhatsApp…) : sur la page
  Actualités, chaque article a en bas un « Lien vers cet article ».
- **Erreur ?** Rien n'est jamais perdu : chaque enregistrement est gardé dans
  l'historique, Franck peut revenir en arrière.

---

## Pour les curieux : comment ça marche

- Tous les articles sont rangés dans un seul fichier : `actualites/articles.json`.
- Les photos et vidéos envoyées vont dans `assets/actualites/`.
- Le script `js/actualites.js` lit ce fichier et affiche les 3 derniers articles
  sur l'accueil (section « Actualités ») et tous les articles sur `actualites.html`.
- L'action GitHub `.github/workflows/optimiser-photos-actualites.yml` réduit les
  photos de plus de 900 Ko après chaque publication.
- Sans Pages CMS, on peut aussi modifier `actualites/articles.json` directement
  sur GitHub (bouton crayon) en recopiant un article existant.
