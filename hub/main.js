// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Mobile Menu ----------
const menuToggle = document.getElementById('menu-toggle');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
menuClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---------- Scroll Reveal ----------
const revealEls = document.querySelectorAll(
  '.hero-tag, .hero-title, .hero-desc, .hero-actions, .hero-stats, .player-card, ' +
  '.section-title, .see-all, .section-tag, ' +
  '.album-card, .feature-card, .artist-card, .pricing-card, ' +
  '.footer-logo, .footer-tagline, .footer-copy'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));
