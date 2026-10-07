// ===== Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Header background on scroll
const topHeader = document.querySelector('header.top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) topHeader.style.boxShadow = '0 2px 20px rgba(42,36,32,0.08)';
  else topHeader.style.boxShadow = 'none';
});

// ===== Lightbox galerie
// Délégation d'événement : fonctionne aussi pour les photos ajoutées après coup
// (galeries des actualités, chargées par js/actualites.js).
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-cap');
if (lightbox) {
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-lightbox]');
    if (!el) return;
    e.preventDefault();
    lightboxImg.src = el.dataset.src || el.querySelector('img').src;
    lightboxCap.textContent = el.dataset.cap || '';
    lightbox.classList.add('open');
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}
