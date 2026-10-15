/* ============================================================
   INDIA IN MOTION — Page Common
   Loaded by every sub-page. Handles: theme, nav, scroll,
   cursor, animate-in, counters, tabs, search.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

  /* ── Theme ── */
  var saved = localStorage.getItem('itip-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.querySelector('i').className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeBtn.addEventListener('click', function() {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('itip-theme', next);
      themeBtn.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      if (typeof ChartFactory !== 'undefined') ChartFactory.updateTheme();
    });
  }

  /* ── Mobile nav ── */
  var mBtn = document.getElementById('mobile-menu-btn');
  var mDrawer = document.getElementById('mobile-nav-drawer');
  if (mBtn && mDrawer) {
    mBtn.addEventListener('click', function() {
      var open = mDrawer.classList.toggle('open');
      mBtn.setAttribute('aria-expanded', open);
    });
  }

  /* ── Nav scroll ── */
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
    var bar = document.getElementById('scroll-progress');
    if (bar) {
      var pct = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100);
      bar.style.width = pct + '%';
    }
  }, { passive: true });

  /* ── Cursor light ── */
  var light = document.getElementById('cursor-light');
  if (light && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var mx = 0, my = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      light.style.left = cx + 'px'; light.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ── Fullscreen ── */
  var fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fsBtn.querySelector('i').className = 'fas fa-compress';
      } else {
        document.exitFullscreen();
        fsBtn.querySelector('i').className = 'fas fa-expand';
      }
    });
  }

  /* ── Animate-in ── */
  var animObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); animObs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  var staggerObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); staggerObs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.animate-in').forEach(function(el) { animObs.observe(el); });
  document.querySelectorAll('.stagger-children').forEach(function(el) { staggerObs.observe(el); });

  /* ── Counters ── */
  var cntObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseFloat(el.dataset.target || 0);
      var dec = parseInt(el.dataset.decimals || 0);
      var dur = 1400, t0 = performance.now();
      if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
        el.textContent = dec > 0 ? target.toFixed(dec) : Math.round(target).toLocaleString();
        return;
      }
      (function step(now) {
        var prog = Math.min((now - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - prog, 3);
        var val = target * ease;
        el.textContent = dec > 0 ? val.toFixed(dec) : Math.round(val).toLocaleString();
        if (prog < 1) requestAnimationFrame(step);
      })(t0);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter[data-target]').forEach(function(el) { cntObs.observe(el); });

  /* ── Tabs ── */
  document.querySelectorAll('.tab-nav').forEach(function(tabNav) {
    var btns = Array.from(tabNav.querySelectorAll('.tab-btn'));
    var container = tabNav.parentElement;
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btns.forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
        var panelId = btn.dataset.tab;
        if (!panelId) return;
        container.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
        var target = document.getElementById(panelId);
        if (target) target.classList.add('active');
      });
    });
  });

  /* ── Search ── */
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput   = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var openBtn       = document.getElementById('search-open-btn');
  var closeBtn      = document.getElementById('search-close');

  if (openBtn) openBtn.addEventListener('click', function() { searchOverlay.classList.add('open'); setTimeout(function() { searchInput.focus(); }, 50); });
  if (closeBtn) closeBtn.addEventListener('click', function() { searchOverlay.classList.remove('open'); searchInput.value = ''; searchResults.innerHTML = ''; });
  if (searchOverlay) searchOverlay.addEventListener('click', function(e) { if (e.target === searchOverlay) { searchOverlay.classList.remove('open'); } });
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchOverlay.classList.add('open'); setTimeout(function() { searchInput.focus(); }, 50); }
    if (e.key === 'Escape') { searchOverlay.classList.remove('open'); }
  });

  var searchTimer;
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimer);
      var q = this.value.trim();
      searchTimer = setTimeout(function() {
        if (!q || q.length < 2) { searchResults.innerHTML = ''; return; }
        var D = window.TOURISM_DATA || {};
        var results = [];
        (D['states'] ? D['states'].states : []).forEach(function(s) {
          if (s.name.toLowerCase().indexOf(q.toLowerCase()) >= 0)
            results.push({ title: s.name, sub: 'State · ' + s.dtv_2022 + 'M domestic visits', url: 'states.html', icon: 'fa-map' });
        });
        (D['destinations'] ? D['destinations'].destinations : []).forEach(function(d) {
          if (d.name.toLowerCase().indexOf(q.toLowerCase()) >= 0)
            results.push({ title: d.name, sub: d.state + ' · ' + d.category, url: 'destinations.html', icon: 'fa-location-dot' });
        });
        (D['countries'] ? D['countries'].top_sources_2022 : []).forEach(function(c) {
          if (c.country.toLowerCase().indexOf(q.toLowerCase()) >= 0)
            results.push({ title: c.country, sub: 'Source Market · ' + c.share_pct + '% share', url: 'tourists.html', icon: 'fa-globe' });
        });
        searchResults.innerHTML = results.slice(0, 6).map(function(r) {
          return '<a href="' + r.url + '" class="search-result-item"><div class="search-result-icon"><i class="fas ' + r.icon + '"></i></div><div class="search-result-text"><span style="font-size:.85rem;font-weight:500;">' + r.title + '</span><small>' + r.sub + '</small></div></a>';
        }).join('') || '<p style="color:var(--text-muted);font-size:.85rem;padding:8px;">No results for "' + q + '"</p>';
      }, 180);
    });
  }
});
