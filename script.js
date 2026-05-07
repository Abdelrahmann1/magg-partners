/* ── Loader ──────────────────────────────────────────── */
const loader = document.getElementById('loader');
const lPct   = document.getElementById('lPct');
const hero   = document.getElementById('hero');

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

document.querySelectorAll('a, button, .exp-item, .proj-card, .person, .news-feat, .news-card, .job, .search-result-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
});

/* ── Nav scroll ──────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 72);
}, { passive: true });

/* ── Nav Menu (universal burger) ─────────────────────── */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
let mobOpen = false;

function closeMenu() {
  mobOpen = false;
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

ham.addEventListener('click', () => {
  mobOpen = !mobOpen;
  ham.classList.toggle('open', mobOpen);
  mob.classList.toggle('open', mobOpen);
  document.body.style.overflow = mobOpen ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', closeMenu);
});

/* ── Search Overlay ───────────────────────────────────── */
const searchOverlay = document.getElementById('searchOverlay');
const searchBtn     = document.getElementById('searchBtn');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

/* Static pages / sections always searchable */
const PAGES = [
  { name: 'Projects Gallery', meta: 'All Projects', href: 'projects.html' },
  { name: 'Careers',          meta: 'Join The Team', href: 'careers.html' },
  { name: 'News & Press',     meta: 'Latest Articles & Awards', href: 'news.html' },
  { name: 'Studio',           meta: 'About Magg+Partners', href: 'index.html#studio' },
  { name: 'People',           meta: 'Our Team', href: 'index.html#people' },
  { name: 'Contact',          meta: 'Get In Touch', href: 'index.html#contact' },
];

function openSearch() {
  closeMenu();
  searchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 100);
  runSearch('');
}
function closeSearch() {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
  searchInput.value = '';
}

if (searchBtn)   searchBtn.addEventListener('click', openSearch);
if (searchClose) searchClose.addEventListener('click', closeSearch);
searchOverlay && searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) closeSearch();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});
searchInput && searchInput.addEventListener('input', () => runSearch(searchInput.value));

function runSearch(q) {
  q = q.trim().toLowerCase();
  searchResults.innerHTML = '';

  /* ── Project results ── */
  const projects = (typeof PROJECTS !== 'undefined') ? PROJECTS : [];
  const matchedProjects = q.length < 1
    ? projects.slice(0, 8)
    : projects.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.type && p.type.toLowerCase().includes(q)) ||
        p.year.includes(q)
      ).slice(0, 10);

  /* ── Page results ── */
  const matchedPages = q.length < 1
    ? PAGES
    : PAGES.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.meta.toLowerCase().includes(q)
      );

  if (!matchedProjects.length && !matchedPages.length) {
    searchResults.innerHTML = '<p class="search-empty">No results for "' + searchInput.value + '"</p>';
    return;
  }

  if (matchedProjects.length) {
    const grp = document.createElement('div');
    grp.className = 'search-group';
    grp.innerHTML = '<div class="search-group-label">Projects</div>';
    matchedProjects.forEach(p => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = 'project.html?id=' + p.id;
      a.innerHTML = `<span class="sri-name">${p.name}</span><span class="sri-meta">${p.location} · ${p.year}</span>`;
      a.addEventListener('click', closeSearch);
      a.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
      a.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
      grp.appendChild(a);
    });
    searchResults.appendChild(grp);
  }

  if (matchedPages.length) {
    const grp = document.createElement('div');
    grp.className = 'search-group';
    grp.innerHTML = '<div class="search-group-label">Pages</div>';
    matchedPages.forEach(p => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = p.href;
      a.innerHTML = `<span class="sri-name">${p.name}</span><span class="sri-meta">${p.meta}</span>`;
      a.addEventListener('click', closeSearch);
      a.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
      a.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
      grp.appendChild(a);
    });
    searchResults.appendChild(grp);
  }
}

/* ── Scroll Reveal ───────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Homepage Hero Carousel ──────────────────────────── */
(function initHeroCarousel() {
  const heroCarousel = document.getElementById('heroCarousel');
  const heroDots     = document.getElementById('heroDots');
  if (!heroCarousel || !heroDots) return;

  /* Pick up to 8 real project images (local files only) */
  const allProjects = (typeof PROJECTS !== 'undefined') ? PROJECTS : [];
  const localProjects = allProjects.filter(p => p.hero && !p.hero.startsWith('http')).slice(0, 8);
  const heroImages = localProjects.length
    ? localProjects.map(p => ({ src: p.hero, label: p.name }))
    : [{ src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2400&q=85', label: 'Architecture' }];

  let heroIdx   = 0;
  let heroTimer = null;

  /* Build slides + dots */
  heroImages.forEach((img, i) => {
    /* slide */
    const slide = document.createElement('div');
    slide.className = 'hc-slide' + (i === 0 ? ' active' : '');
    const im = document.createElement('img');
    im.src = img.src;
    im.alt = img.label;
    slide.appendChild(im);
    heroCarousel.appendChild(slide);

    /* dot */
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => heroGoTo(i));
    heroDots.appendChild(dot);
  });

  function heroGoTo(n) {
    const slides = heroCarousel.querySelectorAll('.hc-slide');
    const dots   = heroDots.querySelectorAll('.carousel-dot');
    slides[heroIdx].classList.remove('active');
    slides[heroIdx].classList.add('exit');
    const exiting = heroIdx;
    setTimeout(() => slides[exiting] && slides[exiting].classList.remove('exit'), 1300);
    dots[heroIdx].classList.remove('active');
    heroIdx = ((n % heroImages.length) + heroImages.length) % heroImages.length;
    slides[heroIdx].classList.add('active');
    dots[heroIdx].classList.add('active');
    clearInterval(heroTimer);
    heroTimer = setInterval(() => heroGoTo(heroIdx + 1), 5500);
  }

  heroTimer = setInterval(() => heroGoTo(heroIdx + 1), 5500);

  /* Arrow buttons */
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  if (heroPrev) heroPrev.addEventListener('click', () => heroGoTo(heroIdx - 1));
  if (heroNext) heroNext.addEventListener('click', () => heroGoTo(heroIdx + 1));

  /* Subtle parallax on the carousel container */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroCarousel.style.transform = `translateY(${y * 0.22}px)`;
    }
  }, { passive: true });
})();

/* ── Projects Horizontal Drag ────────────────────────── */
const projScroll = document.getElementById('projScroll');
const pFill      = document.getElementById('pFill');

if (projScroll) {
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
    if (!pFill) return;
    const max = projScroll.scrollWidth - projScroll.clientWidth;
    pFill.style.width = (projScroll.scrollLeft / max * 100) + '%';
  }, { passive: true });

  /* Touch support */
  let touchStartX = 0, touchScrollLeft = 0;
  projScroll.addEventListener('touchstart', e => {
    touchStartX     = e.touches[0].pageX;
    touchScrollLeft = projScroll.scrollLeft;
  }, { passive: true });
  projScroll.addEventListener('touchmove', e => {
    const dx = touchStartX - e.touches[0].pageX;
    projScroll.scrollLeft = touchScrollLeft + dx;
  }, { passive: true });
}

