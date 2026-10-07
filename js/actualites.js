// ===== Actualités
// Les articles sont rangés dans actualites/articles.json (modifiable avec Pages CMS,
// voir GUIDE-ACTUALITES.md). Ce script les affiche :
//  - sur l'accueil : <div data-actus="accueil" data-limite="3"> → cartes résumées
//  - sur actualites.html : <div data-actus="liste"> → articles complets
(function () {
  const conteneurs = document.querySelectorAll('[data-actus]');
  if (!conteneurs.length) return;

  const esc = (texte) => String(texte ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const slug = (a) => (String(a.date || '').slice(0, 10) + '-' + String(a.titre || 'article'))
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  // "2026-10-07" → "7 octobre 2026" (sans décalage de fuseau horaire)
  const dateFr = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    if (!m) return '';
    return new Date(+m[1], +m[2] - 1, +m[3])
      .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const tableau = (v) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);

  // Typographie française : pas de retour à la ligne dans « 6 000 € », ni avant « : ! ? ; »
  const insecables = (t) => String(t ?? '')
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ')
    .replace(/(\d) (?=(€|%|m²|kg|km|ha)(?![\wÀ-ÿ]))/g, '$1 ')
    .replace(/ ([:;!?»])/g, ' $1')
    .replace(/« /g, '« ');

  // ----- Vidéos : YouTube, Vimeo, Facebook ou fichier MP4/WebM
  const youtubeId = (url) => {
    const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(url);
    return m ? m[1] : null;
  };
  const videoHtml = (url, titre) => {
    url = String(url || '').trim();
    if (!url) return '';
    const yt = youtubeId(url);
    if (yt) {
      return `<div class="actu-video"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${esc(titre)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    const vimeo = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url);
    if (vimeo) {
      return `<div class="actu-video"><iframe src="https://player.vimeo.com/video/${vimeo[1]}" title="${esc(titre)}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    if (/facebook\.com|fb\.watch/.test(url)) {
      return `<div class="actu-video"><iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false" title="${esc(titre)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) {
      return `<div class="actu-video"><video controls preload="metadata" playsinline src="${esc(url)}"></video></div>`;
    }
    return `<p><a class="btn btn-outline" href="${esc(url)}" target="_blank" rel="noopener">Voir la vidéo ↗</a></p>`;
  };

  // Image de couverture : photo principale, sinon 1re photo de la galerie, sinon miniature YouTube
  const couverture = (a) => {
    if (a.photo) return a.photo;
    const galerie = tableau(a.photos);
    if (galerie.length) return galerie[0];
    const yt = youtubeId(String(a.video || ''));
    return yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : '';
  };

  // ----- Texte de l'article : HTML écrit dans Pages CMS, nettoyé par sécurité
  const IFRAMES_OK = /^https:\/\/(www\.youtube(-nocookie)?\.com|player\.vimeo\.com|www\.facebook\.com\/plugins)\//;
  const nettoyer = (html) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = String(html || '');
    tpl.content.querySelectorAll('script, style, object, embed, form, link, meta').forEach(n => n.remove());
    tpl.content.querySelectorAll('*').forEach(el => {
      [...el.attributes].forEach(attr => {
        const nom = attr.name.toLowerCase();
        const val = attr.value.trim().toLowerCase();
        if (nom.startsWith('on') || ((nom === 'href' || nom === 'src') && val.startsWith('javascript:'))) {
          el.removeAttribute(attr.name);
        }
      });
      if (el.tagName === 'IFRAME' && !IFRAMES_OK.test(el.getAttribute('src') || '')) el.remove();
      if (el.tagName === 'A' && /^https?:/i.test(el.getAttribute('href') || '')) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
      if (el.tagName === 'IMG') el.setAttribute('loading', 'lazy');
    });
    const textes = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT);
    while (textes.nextNode()) textes.currentNode.nodeValue = insecables(textes.currentNode.nodeValue);
    return tpl.innerHTML;
  };

  const extrait = (a) => {
    if (a.resume) return a.resume;
    const div = document.createElement('div');
    div.innerHTML = nettoyer(a.texte);
    const t = div.textContent.replace(/\s+/g, ' ').trim();
    return t.length > 180 ? t.slice(0, 177).replace(/\s+\S*$/, '') + '…' : t;
  };

  // ----- Rendus
  const carte = (a) => {
    const img = couverture(a);
    return `
      <article class="actu-card">
        <a href="actualites.html#${slug(a)}" class="actu-card-lien">
          ${img
            ? `<img class="actu-card-img" src="${esc(img)}" alt="" loading="lazy" />`
            : `<div class="actu-card-img actu-card-img--vide" aria-hidden="true">Paxkoteia</div>`}
          <div class="actu-card-corps">
            <time datetime="${esc(String(a.date).slice(0, 10))}">${dateFr(a.date)}</time>
            <h3>${esc(insecables(a.titre))}</h3>
            <p>${esc(insecables(extrait(a)))}</p>
            <span class="actu-suite">Lire la suite →</span>
          </div>
        </a>
      </article>`;
  };

  const articleComplet = (a) => {
    const galerie = tableau(a.photos);
    const liens = tableau(a.liens).filter(l => l && l.url);
    return `
      <article class="actu-article" id="${slug(a)}">
        <header>
          <time datetime="${esc(String(a.date).slice(0, 10))}">${dateFr(a.date)}</time>
          <h2>${esc(insecables(a.titre))}</h2>
          ${a.resume ? `<p class="actu-chapo">${esc(insecables(a.resume))}</p>` : ''}
        </header>
        ${a.photo ? `<figure class="actu-photo" data-lightbox data-src="${esc(a.photo)}" data-cap="${esc(a.titre)}"><img src="${esc(a.photo)}" alt="${esc(a.titre)}" loading="lazy" /></figure>` : ''}
        <div class="actu-texte">${nettoyer(a.texte)}</div>
        ${videoHtml(a.video, a.titre)}
        ${a.video_fichier ? videoHtml(a.video_fichier, a.titre) : ''}
        ${galerie.length ? `<div class="actu-galerie">${galerie.map(src =>
          `<a href="${esc(src)}" data-lightbox data-src="${esc(src)}" data-cap="${esc(a.titre)}"><img src="${esc(src)}" alt="" loading="lazy" /></a>`).join('')}</div>` : ''}
        ${liens.length ? `<p class="actu-liens">${liens.map(l => {
          const externe = /^https?:/i.test(l.url);
          return `<a class="btn btn-outline" href="${esc(l.url)}"${externe ? ' target="_blank" rel="noopener"' : ''}>${esc(l.texte || l.url)}${externe ? ' ↗' : ''}</a>`;
        }).join('')}</p>` : ''}
        <p class="actu-ancre"><a href="#${slug(a)}">Lien vers cet article</a></p>
      </article>`;
  };

  fetch('actualites/articles.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const articles = tableau(Array.isArray(data) ? data : data.articles)
        .filter(a => a && a.titre && a.publie !== false)
        .sort((x, y) => String(y.date || '').localeCompare(String(x.date || '')));

      conteneurs.forEach(c => {
        if (!articles.length) {
          c.innerHTML = '<p class="actus-attente">Pas encore d\'actualité publiée.</p>';
          return;
        }
        if (c.dataset.actus === 'accueil') {
          const limite = parseInt(c.dataset.limite, 10) || 3;
          c.innerHTML = articles.slice(0, limite).map(carte).join('');
        } else {
          c.innerHTML = articles.map(articleComplet).join('');
        }
      });

      // Le contenu arrive après le chargement : on rejoue le saut vers #article
      if (location.hash) {
        const cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (cible) cible.scrollIntoView();
      }
    })
    .catch(() => {
      conteneurs.forEach(c => {
        c.innerHTML = '<p class="actus-attente">Les actualités n\'ont pas pu être chargées pour le moment.</p>';
      });
    });
})();
