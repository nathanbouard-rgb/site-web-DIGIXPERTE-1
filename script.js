// ===== DIGIXPERTE - JavaScript =====

// ===== COOKIE BANNER =====
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookieBanner');
  if (banner && !localStorage.getItem('dxp_cookies')) {
    setTimeout(() => banner.style.display = 'flex', 1000);
  }
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('dxp_cookies', 'accepted');
    banner.style.display = 'none';
  });
  document.getElementById('cookieRefuse')?.addEventListener('click', () => {
    localStorage.setItem('dxp_cookies', 'refused');
    banner.style.display = 'none';
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== STEPS ACCORDION =====
document.querySelectorAll('.step-item').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => mobileMenu?.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu?.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== QUOTE SIMULATOR =====
const simInputs = document.querySelectorAll('[data-sim]');
const simChecks = document.querySelectorAll('.sim-check');
const simPriceEl = document.getElementById('simPrice');
const simRangeEl = document.getElementById('simRange');

function calcSimulator() {
  const serviceEl = document.querySelector('[data-sim="service"]');
  const typeEl = document.querySelector('[data-sim="type"]');
  const pagesEl = document.querySelector('[data-sim="pages"]');
  if (!serviceEl || !simPriceEl) return;

  const service = serviceEl.value;
  const type = typeEl?.value || 'vitrine';
  const pages = parseInt(pagesEl?.value || 5);

  let base = 0;
  if (service === 'site') {
    base = type === 'vitrine' ? 1500 : 3500;
    base += (pages - 1) * 200;
  } else if (service === 'seo') base = 800;
  else if (service === 'sea') base = 600;
  else if (service === 'meta') base = 500;
  else if (service === 'cm') base = 700;
  else if (service === 'branding') base = 1200;
  else if (service === 'pack') base = 4500;

  let extras = 0;
  simChecks.forEach(check => {
    if (check.classList.contains('active')) {
      const val = parseInt(check.dataset.price || 0);
      extras += val;
    }
  });

  const total = base + extras;
  const low = Math.round(total * 0.85);
  const high = Math.round(total * 1.20);
  if (simPriceEl) simPriceEl.textContent = total.toLocaleString('fr-FR');
  if (simRangeEl) simRangeEl.textContent = `Fourchette estimée : ${low.toLocaleString('fr-FR')} € – ${high.toLocaleString('fr-FR')} €`;
}

simInputs.forEach(el => el.addEventListener('change', calcSimulator));

simChecks.forEach(check => {
  check.addEventListener('click', () => {
    check.classList.toggle('active');
    calcSimulator();
  });
});

// Toggle pages field based on service
document.querySelector('[data-sim="service"]')?.addEventListener('change', function() {
  const pagesRow = document.getElementById('simPagesRow');
  const typeRow = document.getElementById('simTypeRow');
  if (pagesRow) pagesRow.style.display = ['site', 'pack'].includes(this.value) ? 'block' : 'none';
  if (typeRow) typeRow.style.display = ['site', 'pack'].includes(this.value) ? 'block' : 'none';
  calcSimulator();
});

// Init simulator
setTimeout(calcSimulator, 200);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .case-card, .testimonial-card, .blog-card, .step-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.style.background = window.scrollY > 40
      ? 'rgba(13,15,31,0.97)'
      : 'rgba(13,15,31,0.85)';
  }
});
