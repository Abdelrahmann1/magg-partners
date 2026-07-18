/* ── 1. بيانات الوظائف (Jobs Data) — loaded from Supabase ── */
let ALL_JOBS = [];

// إعدادات الفلترة والـ Pagination الافتراضية
let filteredJobs = [];
let currentPage = 1;
const jobsPerPage = 4; // عدد الوظائف اللي هتظهر في الصفحة الواحدة

// استدعاء عناصر الوظائف والفلاتر من الـ DOM
const jobsContainer = document.querySelector('.jobs-desc');
const searchInput = document.getElementById('ppSearch');
const deptSelect = document.getElementById('ppType');
const locSelect = document.getElementById('ppLocation');
const jobsSection = document.querySelector('.jobs');

/* ── 2. إنشاء أزرار الـ Pagination الدائرية بعد jobs-desc مباشرة ── */
const paginationWrap = document.createElement('div');
paginationWrap.className = 'jobs-pagination-arrows';
paginationWrap.innerHTML = `
  <button class="jobs-arrow-btn jobs-prev" aria-label="Previous Page">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>
  <button class="jobs-arrow-btn jobs-next" aria-label="Next Page">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>
`;

if (jobsContainer && jobsContainer.parentNode) {
  jobsContainer.parentNode.insertBefore(paginationWrap, jobsContainer.nextSibling);
}

const prevBtn = paginationWrap.querySelector('.jobs-prev');
const nextBtn = paginationWrap.querySelector('.jobs-next');

/* ── 3. دالة بناء وعرض الوظائف (Render) ── */
function renderJobs() {
  if (!jobsContainer) return;
  jobsContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToDisplay = filteredJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (jobsToDisplay.length === 0) {
    jobsContainer.innerHTML = '<p class="no-jobs-found">No opportunities match your criteria.</p>';
    paginationWrap.style.display = 'none';
    return;
  }

  paginationWrap.style.display = totalPages > 1 ? 'flex' : 'none';

  jobsToDisplay.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'job';
    jobDiv.innerHTML = `
      <p class="job-title">${job.title}</p>
      <p class="job-type">${job.type}</p>
      <p class="job-location">${job.location.charAt(0).toUpperCase() + job.location.slice(1)}</p>
    `;
    if (typeof addHover === 'function') addHover(jobDiv);
    jobsContainer.appendChild(jobDiv);
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = endIndex >= filteredJobs.length;
}

/* ── دالة بناء قائمة المواقع ديناميكيًا من الوظائف الفعلية ── */
function populateLocations() {
  if (!locSelect) return;
  const current = locSelect.value;
  const locs = [...new Set(ALL_JOBS.map(j => j.location).filter(Boolean))].sort();
  locSelect.innerHTML = '<option value="">Location</option>' +
    locs.map(l => `<option value="${l}">${l.charAt(0).toUpperCase() + l.slice(1)}</option>`).join('');
  if (locs.includes(current)) locSelect.value = current;
}

/* ── 4. دالة الفلترة الذكية المتزامنة ── */
function filterJobs() {
  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const selectedDept = deptSelect ? deptSelect.value : '';
  const selectedLoc = locSelect ? locSelect.value : '';

  filteredJobs = ALL_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery);
    const matchesDept = selectedDept === "" || job.department === selectedDept;
    const matchesLoc = selectedLoc === "" || job.location === selectedLoc;
    
    return matchesSearch && matchesDept && matchesLoc;
  });

  currentPage = 1; 
  renderJobs();
}

// ربط أحداث الفلاتر والبحث
if (searchInput) searchInput.addEventListener('input', filterJobs);
if (deptSelect) deptSelect.addEventListener('change', filterJobs);
if (locSelect) locSelect.addEventListener('change', filterJobs);

// ربط أحداث الأسهم
prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderJobs(); } });
nextBtn.addEventListener('click', () => { if ((currentPage * jobsPerPage) < filteredJobs.length) { currentPage++; renderJobs(); } });

// تحميل الوظائف من Supabase وتشغيل النظام لأول مرة
async function loadJobs() {
  if (typeof fetchJobsFromDB !== 'function') { renderJobs(); return; }
  ALL_JOBS = await fetchJobsFromDB();
  populateLocations();
  filterJobs();
}
loadJobs();

/* ── Early Careers Register ── */
const ecRegisterBtn = document.getElementById('ecRegisterBtn');
const ecForm = document.getElementById('ecForm');
const ecSubmitBtn = document.getElementById('ecSubmitBtn');
const ecSuccess = document.getElementById('ecSuccess');
if (ecRegisterBtn && ecForm) {
  ecRegisterBtn.addEventListener('click', () => {
    ecForm.style.display = ecForm.style.display === 'none' ? 'flex' : 'none';
  });
}
if (ecSubmitBtn) {
  ecSubmitBtn.addEventListener('click', async () => {
    const name = document.getElementById('ecName').value.trim();
    const email = document.getElementById('ecEmail').value.trim();
    if (!email) return;
    try {
      if (typeof submitEnquiry === 'function') {
        await submitEnquiry({ source: 'careers', name, email, message: 'Early careers interest registration' });
      }
    } catch (err) {
      console.error('Failed to submit registration:', err.message);
    }
    ecForm.style.display = 'none';
    ecRegisterBtn.style.display = 'none';
    if (ecSuccess) ecSuccess.style.display = 'block';
  });
}


/* ── 5. الأكواد الأصلية لصفحات الموقع (بدون أي تكرار) ── */

document.querySelectorAll('.cf-row-select').forEach(row => {
  const select = row.querySelector('.cf-select');
  if (select) {
    select.addEventListener('change', () => {
      select.blur();
    });
  }
});

/* ── Custom Cursor ── */
const dot = document.getElementById('cDot'), ring = document.getElementById('cRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (dot && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  document.addEventListener('mousedown', () => document.body.classList.add('c-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('c-click'));
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

function addHover(el) {
  if (!el) return;
  el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
}
document.querySelectorAll('a, button').forEach(addHover);

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
}

/* ── Mobile menu ── */
const hamBtn = document.getElementById('hamBtn'), mobMenu = document.getElementById('mobMenu');
let mobOpen = false;
function closeMob() { 
  mobOpen = false; 
  if (hamBtn) hamBtn.classList.remove('open'); 
  if (mobMenu) mobMenu.classList.remove('open'); 
  document.body.style.overflow = ''; 
}
if (hamBtn && mobMenu) {
  hamBtn.addEventListener('click', () => {
    mobOpen = !mobOpen;
    hamBtn.classList.toggle('open', mobOpen);
    mobMenu.classList.toggle('open', mobOpen);
    document.body.style.overflow = mobOpen ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-lnk').forEach(a => a.addEventListener('click', closeMob));
}

/* ── Search Overlay ── */
const so = document.getElementById('searchOverlay'),
      sb = document.getElementById('searchBtn'),
      sc = document.getElementById('searchClose'),
      si = document.getElementById('searchInput'),
      sr = document.getElementById('searchResults');
      
function openSearch()  { closeMob(); if(so) so.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => { if(si) si.focus(); }, 60); renderSearch(''); }
function closeSearch() { if(so) so.classList.remove('open'); document.body.style.overflow = ''; if(si) si.value = ''; }

if (sb) sb.addEventListener('click', openSearch);
if (sc) sc.addEventListener('click', closeSearch);
if (so) so.addEventListener('click', e => { if (e.target === so) closeSearch(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});
if (si) si.addEventListener('input', () => renderSearch(si.value));

function renderSearch(q) {
  if (!sr) return;
  q = q.trim().toLowerCase(); sr.innerHTML = '';
  if (typeof PROJECTS === 'undefined') return; 
  
  const matched = q.length < 1
    ? PROJECTS.slice(0, 8)
    : PROJECTS.filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q)).slice(0, 10);
  if (!matched.length) { sr.innerHTML = '<p class="search-empty">No results found.</p>'; return; }
  const grp = document.createElement('div');
  grp.className = 'search-grp';
  grp.innerHTML = '<div class="search-grp-label">Projects</div>';
  matched.forEach(p => {
    const a = document.createElement('a');
    a.className = 'search-item';
    a.href = 'project.html?id=' + p.id;
    a.innerHTML = `<span class="s-name">${p.name}</span><span class="s-meta">${p.location} · ${p.year}</span>`;
    a.addEventListener('click', closeSearch);
    addHover(a);
    grp.appendChild(a);
  });
  sr.appendChild(grp);
}

/* ── Hero scroll-reveal ── */
const heroEl = document.getElementById('hero');
const heroBgReveal = document.getElementById('heroBgReveal');
if (heroEl && heroBgReveal) {
  window.addEventListener('scroll', () => {
    const heroH = heroEl.offsetHeight;
    const scrolled = window.scrollY;
    const revealStart = heroH * 0.4;
    const revealEnd   = heroH * 0.85;
    const progress = Math.min(1, Math.max(0, (scrolled - revealStart) / (revealEnd - revealStart)));
    heroBgReveal.style.opacity = progress;
  }, { passive: true });
}

/* ── Contact Form Fallback ── */
const cfSubmit = document.getElementById('cfSubmit');
if (cfSubmit) {
  cfSubmit.addEventListener('click', () => {
    const name    = document.getElementById('cfName').value.trim();
    const email   = document.getElementById('cfEmail').value.trim();
    if (!name || !email) return;
    document.getElementById('cfSuccess').classList.add('show');
    const form = document.getElementById('cfForm');
    if (form) form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    document.querySelectorAll('.cf-select').forEach(sel => sel.classList.remove('filled'));
  });
}