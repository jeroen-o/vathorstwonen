// ===== Smooth scroll for in-page nav =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        closeMenu();
      }
    }
  });
});

// ===== Mobile menu =====
const toggle   = document.querySelector('.menu-toggle');
const nav      = document.getElementById('mainNav');
const backdrop = document.getElementById('navBackdrop');

function openMenu(){
  nav.classList.add('open');
  backdrop.classList.add('show');
  document.body.classList.add('nav-open');
  toggle.setAttribute('aria-expanded','true');
  toggle.setAttribute('aria-label','Menu sluiten');
}
function closeMenu(){
  nav.classList.remove('open');
  backdrop.classList.remove('show');
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Menu openen');
}
toggle.addEventListener('click', () => {
  toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
});
backdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ===== FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded','false'));
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

// ===== Subtle entrance animations =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.1});

document.querySelectorAll('.service-card, .situatie-card, .trust-item, .cred, .wijk, .faq-item').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
  io.observe(el);
});
