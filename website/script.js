/* ============================================================
   GTR by Vero UK — standalone behaviour
   Page navigation, data-driven lists, FAQ accordion, contact form.
   Plain vanilla JS — no framework.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Data ---------- */
  var navDefs = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'services', label: 'Services' },
    { key: 'programme', label: 'Programme' },
    { key: 'contact', label: 'Contact' }
  ];

  var whoFor = [
    'Architects',
    'Interior & spatial designers',
    'Urban & masterplanning designers',
    'Landscape & built-environment specialists',
    'Visualisers & computational designers',
    'Architecture researchers & academics',
    'Design leaders & studio principals',
    'Advanced creative professionals',
    'Any creative professional in architecture & design'
  ];

  var evidence = [
    { num: '01', title: 'Authored projects', body: 'Work where your design authorship and decisions are clearly your own.' },
    { num: '02', title: 'Leadership & influence', body: 'Roles where you shaped teams, studios, or the direction of a project.' },
    { num: '03', title: 'Awards & honours', body: 'Competitions, prizes, and professional recognition in your field.' },
    { num: '04', title: 'Publications & media', body: 'Coverage, features, and writing that document your contribution.' },
    { num: '05', title: 'Exhibitions & talks', body: 'Public presentation of your work to a professional audience.' },
    { num: '06', title: 'Innovation & research', body: 'New methods, tools, or thinking that advance the discipline.' }
  ];

  var trustItems = [
    { stat: 'Endorsed', label: 'Team of UK Global Talent endorsed leaders' },
    { stat: '16 yrs', label: 'In architecture & design' },
    { stat: '35+', label: 'Professionals supported' },
    { stat: 'Independent', label: 'Not affiliated with any endorsing body' }
  ];

  var founderStats = [
    { stat: '15 yrs', label: 'Average international experience' },
    { stat: 'Endorsed', label: 'Team of Global Talent holders' },
    { stat: '35+', label: 'Professionals supported & welcomed' }
  ];

  var veroMeaning = [
    { word: 'Truth', body: 'Your achievements are real. The work is recognising and stating them clearly.' },
    { word: 'Authenticity', body: 'A profile grounded in genuine authorship and contribution, not inflation.' },
    { word: 'Clarity', body: 'Turning a complex career into a structured, legible case.' },
    { word: 'Potential', body: 'Seeing the pathway your record already supports — and preparing for it.' }
  ];

  var approach = [
    { title: 'Strategy-led', body: 'Every step is about positioning and evidence, not box-ticking.' },
    { title: 'Honest & responsible', body: 'We use careful language and never overpromise an outcome.' },
    { title: 'Personal', body: 'Built around your individual record, discipline, and ambitions.' }
  ];

  var responsibleTags = ['Strengthen your readiness', 'Prepare strategically', 'Improve clarity', 'Structure your evidence', 'Understand your pathway', 'Support your decision-making'];

  var steps = [
    { num: '01', name: 'Assess', desc: 'Understand your background, achievements, professional route, and current readiness — an honest baseline to build from.' },
    { num: '02', name: 'Position', desc: 'Identify whether your profile should be positioned around leadership, promise, impact, innovation, design excellence, authorship, or contribution.' },
    { num: '03', name: 'Map evidence', desc: 'Organise achievements, projects, awards, publications, media, exhibitions, leadership roles, and professional recognition into a structured evidence framework.' },
    { num: '04', name: 'Build portfolio strategy', desc: 'Transform your portfolio from a design presentation into a strategic evidence document that communicates authorship, value, impact, and credibility.' },
    { num: '05', name: 'Structure letters', desc: 'Identify the right recommenders and align letters with your professional narrative and evidence.' },
    { num: '06', name: 'Develop narrative', desc: 'Build a clear, convincing personal story that connects your past achievements, current position, and future contribution.' },
    { num: '07', name: 'Review and refine', desc: 'Review the overall pack for clarity, consistency, structure, and readiness.' },
    { num: '08', name: 'Move forward', desc: 'Understand your next steps and prepare for submission with a clearer, more confident strategy.' }
  ];

  var services = [
    { num: '01', name: 'Global Talent Assessment', tagline: 'The entry point',
      desc: 'A focused assessment for professionals who are unsure whether they are ready for the UK Global Talent Route.',
      includes: ['CV and background review', 'Professional experience review', 'Achievement and evidence check', 'Current visa status discussion, if relevant', 'Possible pathway direction', 'Exceptional Leader (Talent) vs Potential Leader (Promise)', 'Evidence gap overview', 'Recommended next step'],
      bestFor: 'People who are exploring the route or unsure if they qualify.', cta: 'Book assessment' },
    { num: '02', name: '1:1 Guidance', tagline: 'Personalised strategy',
      desc: 'Personalised guidance for professionals who want to understand how to structure their application journey and prepare strategically. Normally two to three sessions of around 40 minutes, up to a maximum of six, taken at your own pace.',
      includes: ['Route clarity', 'Evidence planning', 'Portfolio direction', 'Recommendation letter strategy', 'Career narrative development', 'Timeline planning', 'Normally 2–3 sessions of ~40 min, up to 6 maximum'],
      bestFor: 'Professionals who are ready, or close to ready.', cta: 'Start 1:1 guidance' },
    { num: '03', name: 'Document Review', tagline: 'Strategic feedback',
      desc: 'A focused review for applicants who have already started preparing documents and need strategic feedback.',
      includes: ['Portfolio review', 'Evidence pack review', 'Recommendation letter structure review', 'Career narrative feedback', 'Readiness comments', 'Improvement recommendations'],
      bestFor: 'Applicants who already have draft documents.', cta: 'Review my documents' },
    { num: '04', name: 'Full Mentorship', tagline: 'End-to-end · up to 4 weeks',
      desc: 'A complete, end-to-end pathway over up to four weeks — from readiness review to a fully structured evidence pack, with guidance tailored to your individual experience using proven, endorsed frameworks.',
      includes: ['Full profile and evidence strategy', 'Document structure guidance', 'Proven, endorsed structural frameworks', 'Portfolio and letters guidance', 'Career narrative development', 'Up to 3 mentorship sessions', 'Final readiness review', 'Priority support'],
      bestFor: 'Advanced professionals who want full structure at a considered pace.', cta: 'Apply for mentorship' },
    { num: '05', name: 'Accelerated Mentorship', tagline: 'Fast-track · within 5 days',
      desc: 'An intensive fast-track delivered within five days. You receive our structured document templates — the proven, endorsed structures we use — so every document can be built and tailored to your experience at speed.',
      includes: ['Structured document templates', 'Rapid readiness and gap review', 'Document structure tailored to your profile', 'Proven, endorsed structural frameworks', 'Portfolio and evidence prioritisation', 'Recommendation letter structure', 'Career narrative development', 'Daily working sessions', 'Priority, time-critical support'],
      bestFor: 'Professionals working to a tight deadline who need to prepare within days.', cta: 'Request fast-track' }
  ];

  var pricing = [
    { name: 'Eligibility Snapshot', price: 'Free', unit: 'no cost', note: 'Start here', cta: 'Get free snapshot', feature: false,
      feats: ['Short readiness snapshot', 'Honest view of where you stand', 'Recommended next step'] },
    { name: 'Global Talent Assessment', price: '£49', unit: 'one-off', note: 'Paid deep-dive', cta: 'Book assessment', feature: false,
      feats: ['CV and background review', 'Achievement and evidence check', 'Possible pathway direction', 'Exceptional Leader (Talent) vs Potential Leader (Promise)', 'Recommended next step'] },
    { name: '1:1 Guidance', price: '£119', unit: 'per 40-min session · normally 2–3, up to 6', note: 'Strategy on demand', cta: 'Start 1:1 guidance', feature: false,
      feats: ['Route clarity', 'Evidence planning', 'Portfolio direction', 'Career narrative development', 'Normally 2–3 sessions of ~40 min, up to 6 maximum'] },
    { name: 'Document Review', price: '£149', unit: 'full document review', note: 'For draft documents', cta: 'Review my documents', feature: false,
      feats: ['Portfolio review', 'Evidence pack review', 'Recommendation letter structure review', 'Career narrative feedback', 'Improvement recommendations'] },
    { name: 'Full Mentorship', price: '£349', unit: 'up to 4 weeks', note: 'Most popular', cta: 'Apply for mentorship', feature: true,
      feats: ['Full profile and evidence strategy', 'Portfolio and letters guidance', 'Career narrative development', 'Up to 3 mentorship sessions', 'Final readiness review', 'Priority support'] },
    { name: 'Accelerated Mentorship', price: '£949', unit: 'within 5 days · templates', note: 'Fast-track + templates', cta: 'Request fast-track', feature: false,
      feats: ['Structured document templates', 'Document structure tailored to you', 'Daily working sessions', 'Career narrative development', 'Priority, time-critical support'] }
  ];

  var faqs = [
    { q: 'Is this legal or immigration advice?', a: 'No. GTR by Vero UK provides educational and experience-based guidance only. For legal matters, you should consult a regulated immigration adviser and refer to official UK Government guidance.' },
    { q: 'Do I need to be in the UK already?', a: 'No. The programme supports professionals internationally. Where relevant, we will discuss your current visa status as part of the assessment.' },
    { q: 'Can you guarantee endorsement or a visa?', a: 'No. We help you prepare strategically and structure your evidence, but the decision rests entirely with the relevant endorsing body and the Home Office.' },
    { q: 'Where should I start?', a: 'Most people begin with the Global Talent Assessment. It is the simplest way to understand whether the route fits you and what to do next.' }
  ];

  /* ---------- Helpers ---------- */
  var CHECK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="flex:none;margin-top:3px;"><path d="M3 8.5l3 3 7-7.5" stroke="#c2b196" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function el(id) { return document.getElementById(id); }
  function setHTML(node, html) { if (node) node.innerHTML = html; }

  /* ---------- Navigation ---------- */
  var current = 'home';

  function go(page) {
    current = page;
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
      pages[i].classList.toggle('is-active', pages[i].getAttribute('data-page') === page);
    }
    var nav = el('nav');
    nav.className = page === 'home' ? 'nav--home' : 'nav--inner';
    renderNav();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderNav() {
    var menu = navDefs.map(function (n) {
      var op = n.key === current ? 1 : 0.55;
      return '<button class="navlink" data-nav="' + n.key + '" style="background:none;border:none;cursor:pointer;padding:0;font-family:var(--font-body);font-size:14px;white-space:nowrap;color:#1c1813;opacity:' + op + ';">' + esc(n.label) + '</button>';
    }).join('');
    setHTML(el('nav-menu'), menu);

    var foot = navDefs.map(function (n) {
      return '<button class="h-footlink" data-nav="' + n.key + '" style="background:none;border:none;cursor:pointer;padding:0;font-family:var(--font-body);font-size:15px;color:rgba(255,255,255,.7);">' + esc(n.label) + '</button>';
    }).join('');
    setHTML(el('footer-nav'), foot);
  }

  /* ---------- Renderers ---------- */
  function renderMarquees() {
    var who = whoFor.concat(whoFor).map(function (label) {
      return '<div style="flex:none;margin-right:14px;background:#fff;border:1px solid #e6dfd2;border-radius:14px;padding:18px 28px;display:flex;align-items:center;gap:12px;white-space:nowrap;">' +
        '<span style="width:7px;height:7px;border-radius:50%;background:var(--vero-coral);flex:none;"></span>' +
        '<span style="font-family:var(--font-display);font-size:19px;font-weight:500;letter-spacing:-.3px;color:#1c1813;">' + esc(label) + '</span></div>';
    }).join('');
    setHTML(el('who-marquee'), who);

    var ev = evidence.concat(evidence).map(function (e) {
      return '<div style="flex:none;margin-right:18px;width:340px;background:#fff;border:1px solid #e6dfd2;border-radius:20px;padding:30px;display:flex;flex-direction:column;min-height:236px;">' +
        '<div style="font-family:var(--font-mono);font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--vero-coral);">' + esc(e.num) + '</div>' +
        '<h3 style="font-family:var(--font-display);font-weight:500;font-size:24px;letter-spacing:-.4px;color:#1c1813;margin:auto 0 10px;line-height:1.12;">' + esc(e.title) + '</h3>' +
        '<p style="font-size:15px;line-height:1.5;color:#6b6258;margin:0;text-wrap:pretty;">' + esc(e.body) + '</p></div>';
    }).join('');
    setHTML(el('evidence-marquee'), ev);
  }

  function renderTrust() {
    setHTML(el('trust-stats'), trustItems.map(function (t) {
      return '<div style="border-left:1px solid #d3cabb;padding:4px 0 4px 18px;">' +
        '<div style="font-family:var(--font-display);font-size:clamp(28px,3vw,40px);font-weight:500;letter-spacing:-1px;color:#1c1813;line-height:1;">' + esc(t.stat) + '</div>' +
        '<div style="font-size:13px;color:#6b6258;margin-top:10px;line-height:1.4;">' + esc(t.label) + '</div></div>';
    }).join(''));
  }

  function renderPricing() {
    var html = pricing.map(function (p) {
      var card = 'border-radius:22px;padding:clamp(26px,3vw,34px);display:flex;flex-direction:column;height:100%;' +
        (p.feature ? 'background:#9b8c77;' : 'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);');
      var cta = (p.feature ? 'background:#fff;color:#1a1611;' : 'background:#f0ece4;color:#1a1611;') +
        'border:none;border-radius:999px;padding:13px 24px;font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;width:100%;';
      var feats = p.feats.map(function (ft) {
        return '<div style="display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.4;color:rgba(255,255,255,.82);">' + CHECK + '<span>' + esc(ft) + '</span></div>';
      }).join('');
      return '<div style="' + card + '">' +
        '<div style="font-family:var(--font-mono);font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--vero-coral);margin-bottom:14px;">' + esc(p.note) + '</div>' +
        '<h3 style="font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.4vw,27px);letter-spacing:-.5px;color:#fff;margin:0 0 14px;line-height:1.08;">' + esc(p.name) + '</h3>' +
        '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px;">' +
        '<span style="font-family:var(--font-display);font-size:clamp(34px,4vw,46px);font-weight:500;letter-spacing:-1.5px;color:#fff;line-height:1;">' + esc(p.price) + '</span>' +
        '<span style="font-size:13px;color:rgba(255,255,255,.55);">' + esc(p.unit) + '</span></div>' +
        '<div style="height:1px;background:rgba(255,255,255,.14);margin:22px 0;"></div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;flex:1 1 auto;">' + feats + '</div>' +
        '<div style="margin-top:26px;"><button data-nav="contact" style="' + cta + '">' + esc(p.cta) + '</button></div></div>';
    }).join('');
    var grids = document.querySelectorAll('.pricing-grid');
    for (var i = 0; i < grids.length; i++) grids[i].innerHTML = html;
  }

  function renderServices() {
    setHTML(el('services-list'), services.map(function (s) {
      var includes = s.includes.map(function (inc) {
        return '<div style="display:flex;gap:12px;align-items:flex-start;padding:13px 0;border-bottom:1px solid #e6e0d4;font-size:15px;line-height:1.4;color:#1c1813;">' + CHECK + '<span>' + esc(inc) + '</span></div>';
      }).join('');
      return '<div style="background:#fff;border-radius:22px;padding:clamp(28px,4vw,44px);display:flex;gap:48px;flex-wrap:wrap;">' +
        '<div style="flex:1 1 300px;">' +
        '<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">' +
        '<span style="font-family:var(--font-body);font-size:12px;color:var(--vero-coral);">' + esc(s.num) + '</span>' +
        '<span style="font-family:var(--font-mono);font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#6b6258;border:1px solid #ddd6c8;border-radius:999px;padding:5px 14px;">' + esc(s.tagline) + '</span></div>' +
        '<h2 style="font-family:var(--font-display);font-weight:500;font-size:clamp(26px,3vw,38px);letter-spacing:-.8px;color:#1c1813;margin:0 0 16px;line-height:1.05;">' + esc(s.name) + '</h2>' +
        '<p style="font-size:17px;line-height:1.55;color:#1c1813;margin:0 0 24px;max-width:42ch;">' + esc(s.desc) + '</p>' +
        '<div style="background:#f4f1eb;border-radius:14px;padding:16px 18px;margin-bottom:24px;max-width:42ch;">' +
        '<span style="font-family:var(--font-mono);font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#6b6258;">Best for</span>' +
        '<div style="font-size:15px;line-height:1.45;color:#1c1813;margin-top:6px;">' + esc(s.bestFor) + '</div></div>' +
        '<button data-nav="contact" class="h-darken" style="background:#17150f;color:#fff;border:none;border-radius:999px;padding:14px 28px;font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;">' + esc(s.cta) + '</button></div>' +
        '<div style="flex:1 1 260px;">' +
        '<span style="font-family:var(--font-mono);font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#6b6258;">What is included</span>' +
        '<div style="display:flex;flex-direction:column;margin-top:16px;border-top:1px solid #e6e0d4;">' + includes + '</div></div></div>';
    }).join(''));
  }

  function renderSteps() {
    setHTML(el('steps-list'), steps.map(function (st) {
      return '<div style="display:flex;gap:40px;flex-wrap:wrap;padding:36px 0;border-bottom:1px solid #d3cabb;">' +
        '<div style="flex:0 0 130px;">' +
        '<div style="font-family:var(--font-body);font-size:12px;color:var(--vero-coral);margin-bottom:8px;">Step ' + esc(st.num) + '</div>' +
        '<div class="it" style="font-size:clamp(28px,3vw,40px);color:#1c1813;line-height:1.02;">' + esc(st.name) + '</div></div>' +
        '<div style="flex:1 1 420px;"><p style="font-size:18px;line-height:1.6;color:#1c1813;margin:0;max-width:60ch;">' + esc(st.desc) + '</p></div></div>';
    }).join(''));
  }

  function renderFounderStats() {
    setHTML(el('founder-stats'), founderStats.map(function (fs) {
      return '<div><div style="font-family:var(--font-display);font-size:30px;font-weight:500;letter-spacing:-.6px;color:#fff;">' + esc(fs.stat) + '</div>' +
        '<div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:6px;">' + esc(fs.label) + '</div></div>';
    }).join(''));
  }

  function renderVeroMeaning() {
    setHTML(el('vero-meaning'), veroMeaning.map(function (v) {
      return '<div style="background:#ffffff;border:1px solid #e6dfd2;border-radius:18px;padding:30px 26px;">' +
        '<div class="it" style="font-size:26px;color:#1c1813;margin-bottom:12px;">' + esc(v.word) + '</div>' +
        '<div style="font-size:15px;line-height:1.5;color:#6b6258;">' + esc(v.body) + '</div></div>';
    }).join(''));
  }

  function renderApproach() {
    setHTML(el('approach-list'), approach.map(function (a) {
      return '<div style="border-top:1px solid #1c1813;padding-top:24px;">' +
        '<h3 style="font-family:var(--font-display);font-weight:500;font-size:22px;letter-spacing:-.4px;color:#1c1813;margin:0 0 12px;">' + esc(a.title) + '</h3>' +
        '<p style="font-size:16px;line-height:1.55;color:#6b6258;margin:0;">' + esc(a.body) + '</p></div>';
    }).join(''));
  }

  function renderResponsibleTags() {
    setHTML(el('responsible-tags'), responsibleTags.map(function (r) {
      return '<span style="font-family:var(--font-body);font-size:14px;color:#1c1813;background:#fff;border:1px solid #ddd6c8;border-radius:999px;padding:9px 18px;">' + esc(r) + '</span>';
    }).join(''));
  }

  /* ---------- FAQ accordion ---------- */
  var openFaq = 0;
  function renderFaq() {
    setHTML(el('faq-list'), faqs.map(function (f, i) {
      var isOpen = i === openFaq;
      var answer = isOpen
        ? '<p style="font-size:16px;line-height:1.6;color:#5f574c;margin:0;padding:0 40px 26px 0;max-width:60ch;">' + esc(f.a) + '</p>'
        : '';
      return '<div style="border-bottom:1px solid #d3cabb;">' +
        '<button data-faq="' + i + '" style="width:100%;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px 0;text-align:left;">' +
        '<span style="font-family:var(--font-display);font-size:clamp(17px,1.6vw,20px);font-weight:500;letter-spacing:-.3px;color:#1c1813;line-height:1.3;">' + esc(f.q) + '</span>' +
        '<span style="width:26px;height:26px;flex:none;color:#1c1813;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;font-family:var(--font-body);">' + (isOpen ? '–' : '+') + '</span>' +
        '</button>' + answer + '</div>';
    }).join(''));
  }

  /* ---------- Contact form ---------- */
  function initForm() {
    var form = el('contact-form');
    var thanks = el('contact-thanks');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.style.display = 'none';
        thanks.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    }
    var reset = el('reset-form');
    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        thanks.style.display = 'none';
        form.style.display = 'flex';
      });
    }
  }

  /* ---------- Delegated clicks ---------- */
  document.addEventListener('click', function (e) {
    var navBtn = e.target.closest('[data-nav]');
    if (navBtn) { go(navBtn.getAttribute('data-nav')); return; }
    var faqBtn = e.target.closest('[data-faq]');
    if (faqBtn) {
      var i = parseInt(faqBtn.getAttribute('data-faq'), 10);
      openFaq = openFaq === i ? -1 : i;
      renderFaq();
    }
  });

  /* ---------- Boot ---------- */
  function init() {
    renderNav();
    renderMarquees();
    renderTrust();
    renderPricing();
    renderServices();
    renderSteps();
    renderFounderStats();
    renderVeroMeaning();
    renderApproach();
    renderResponsibleTags();
    renderFaq();
    initForm();
    go('home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
