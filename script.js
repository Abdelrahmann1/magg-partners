/* ── Loader ──────────────────────────────────────────── */
const loader = document.getElementById('loader');
const lPct   = document.getElementById('lPct');
const hero   = document.getElementById('hero');
const heroBg = document.getElementById('heroBg');

let count = 0;
const counterInterval = setInterval(() => {
  count = Math.min(count + Math.floor(Math.random() * 12) + 4, 100);
  lPct.textContent = count + '%';
  if (count >= 100) clearInterval(counterInterval);
}, 60);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('done');
    hero.classList.add('ready');
    heroBg.classList.add('ready');
    document.querySelectorAll('.h1-inner').forEach((el, i) => {
      setTimeout(() => el.classList.add('out'), 650 + i * 180);
    });
  }, 2100);
});

/* ── Custom Cursor ───────────────────────────────────── */
const cDot  = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top  = my + 'px';
});
document.addEventListener('mousedown', () => document.body.classList.add('c-click'));
document.addEventListener('mouseup',   () => document.body.classList.remove('c-click'));

(function animateCursor() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  cRing.style.left = rx + 'px';
  cRing.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .exp-item, .proj-card, .person, .news-feat, .news-card, .job').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
});

/* ── Nav scroll ──────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 72);
}, { passive: true });

/* ── Mobile Menu ─────────────────────────────────────── */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
let mobOpen = false;

ham.addEventListener('click', () => {
  mobOpen = !mobOpen;
  ham.classList.toggle('open', mobOpen);
  mob.classList.toggle('open', mobOpen);
  document.body.style.overflow = mobOpen ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => {
    mobOpen = false;
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll Reveal ───────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax Hero ───────────────────────────────────── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${y * 0.38}px)`;
  }
}, { passive: true });

/* ── Projects Horizontal Drag ────────────────────────── */
const projScroll = document.getElementById('projScroll');
const pFill      = document.getElementById('pFill');
let isDown = false, startX = 0, sl = 0;

projScroll.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - projScroll.offsetLeft;
  sl = projScroll.scrollLeft;
});
projScroll.addEventListener('mouseleave', () => isDown = false);
projScroll.addEventListener('mouseup',    () => isDown = false);
projScroll.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - projScroll.offsetLeft;
  projScroll.scrollLeft = sl - (x - startX) * 1.6;
});
projScroll.addEventListener('scroll', () => {
  const max = projScroll.scrollWidth - projScroll.clientWidth;
  pFill.style.width = (projScroll.scrollLeft / max * 100) + '%';
}, { passive: true });

/* ── Touch scroll (mobile) ───────────────────────────── */
let touchStartX = 0, touchScrollLeft = 0;
projScroll.addEventListener('touchstart', e => {
  touchStartX     = e.touches[0].pageX;
  touchScrollLeft = projScroll.scrollLeft;
}, { passive: true });
projScroll.addEventListener('touchmove', e => {
  const dx = touchStartX - e.touches[0].pageX;
  projScroll.scrollLeft = touchScrollLeft + dx;
}, { passive: true });
