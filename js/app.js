/* ============================================================
   INDIA IN MOTION — Main Application
   Homepage orchestrator
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

  // ── Theme Management ───────────────────────────────────── //
  const ThemeManager = {
    current: localStorage.getItem('itip-theme') || 'dark',
    init() {
      document.documentElement.setAttribute('data-theme', this.current);
      const btn = document.getElementById('theme-toggle');
      if (btn) {
        btn.querySelector('i').className = this.current === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        btn.addEventListener('click', () => this.toggle());
      }
    },
    toggle() {
      this.current = this.current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.current);
      localStorage.setItem('itip-theme', this.current);
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.querySelector('i').className = this.current === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      if (typeof ChartFactory !== 'undefined') ChartFactory.updateTheme();
      if (typeof MapEngine !== 'undefined') MapEngine.switchTileLayer(this.current);
    }
  };
  ThemeManager.init();

  // ── Mobile Nav ─────────────────────────────────────────── //
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const open = mobileNavDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', open);
    });
  }

  // ── Year Selector ──────────────────────────────────────── //
  const yearSelector = document.getElementById('year-selector');
  if (yearSelector) {
    yearSelector.addEventListener('change', e => {
      const year = parseInt(e.target.value);
      document.dispatchEvent(new CustomEvent('yearchange', { detail: { year } }));
    });
  }

  // ── Fullscreen ─────────────────────────────────────────── //
  const fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fsBtn.querySelector('i').className = 'fas fa-compress';
      } else {
        document.exitFullscreen();
        fsBtn.querySelector('i').className = 'fas fa-expand';
      }
    });
  }

  // ── Init animations ────────────────────────────────────── //
  AnimationEngine.init();
  AnimationEngine.initScrollProgress();
  AnimationEngine.initCursorLight();
  AnimationEngine.initNavScroll();

  // ── Load Data ──────────────────────────────────────────── //
  const data = await DataLoader.loadAll([
    'national-tourism.json',
    'states.json',
    'countries.json',
    'destinations.json',
    'economy.json',
    'infrastructure.json',
    'heritage.json',
    'sustainability.json',
    'projects.json'
  ]);

  // ── Fix key access — DataLoader strips .json ─────────── //
  data['national-tourism'] = data['national-tourism'] || data['national-tourism.json'];

  // ── Intro Screen ───────────────────────────────────────── //
  const introScreen = document.getElementById('intro-screen');
  const exploreBtn  = document.getElementById('explore-btn');
  const mainNav     = document.getElementById('main-nav');

  // Draw particles on intro canvas
  drawIntroCanvas();

  if (exploreBtn && introScreen) {
    exploreBtn.addEventListener('click', () => {
      introScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      introScreen.style.opacity = '0';
      introScreen.style.transform = 'scale(1.02)';
      setTimeout(() => {
        introScreen.style.display = 'none';
        mainNav?.classList.add('visible');
        document.body.style.overflow = '';
        initDashboard(data);
      }, 800);
    });
  } else {
    mainNav?.classList.add('visible');
    initDashboard(data);
  }

  // ── Search ─────────────────────────────────────────────── //
  SearchEngine.init({
    states: data['states'],
    destinations: data['destinations'],
    countries: data['countries']
  });

  // ── Map Layer Controls ─────────────────────────────────── //
  document.querySelectorAll('.map-layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      MapEngine.switchLayer(btn.dataset.layer);
    });
  });

});

// ── Intro Canvas Animation ─────────────────────────────────
function drawIntroCanvas() {
  const canvas = document.getElementById('intro-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, points, animFrame;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initPoints() {
    points = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    points.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${p.alpha})`;
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(200,168,75,${0.08 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initPoints(); }, { passive: true });
  resize(); initPoints(); draw();
}

// ── Dashboard Initialization ───────────────────────────────
async function initDashboard(data) {
  const national = data['national-tourism'];
  const states   = data['states'];
  const countries= data['countries'];
  const economy  = data['economy'];

  // ── Populate KPIs ──────────────────────────────────────── //
  if (national) {
    const kpi = national.kpi_2023;
    populateKPI('kpi-fta',       kpi.fta.value,             kpi.fta.prev_year,       'M',    1);
    populateKPI('kpi-fte',       kpi.fte.value,             kpi.fte.prev_year,       'M',    1);
    populateKPI('kpi-dtv',       kpi.dtv.value,             kpi.dtv.prev_year,       'M',    0);
    populateKPI('kpi-forex-usd', kpi.forex_usd.value,       kpi.forex_usd.prev_year, 'B USD',1);
    populateKPI('kpi-forex-inr', kpi.forex_inr.value,       kpi.forex_inr.prev_year, 'B INR',0);
    populateKPI('kpi-gdp',       kpi.tourism_gdp_pct.value, kpi.tourism_gdp_pct.prev_year, '% GDP', 1);
    populateKPI('kpi-employment',kpi.employment_million.value,kpi.employment_million.prev_year,'M Jobs',1);
    populateKPI('kpi-avg-stay',  kpi.avg_stay_days.value,   kpi.avg_stay_days.prev_year, ' days', 1);
  }

  AnimationEngine.initCounters();

  // ── Draw Overview Charts ──────────────────────────────────//
  if (national) {
    drawOverviewCharts(national);
  }

  // ── Sparklines ────────────────────────────────────────────//
  if (national) {
    const yearly = national.yearly;
    const ftaData = yearly.map(y => y.fta);
    const dtvData = yearly.map(y => y.dtv);
    const fxData  = yearly.map(y => y.forex_usd);
    ['kpi-fta-spark','kpi-fte-spark'].forEach(id => {
      const c = document.getElementById(id);
      if (c) AnimationEngine.drawSparkline(c, ftaData, '#E8770A');
    });
    const dtvSpark = document.getElementById('kpi-dtv-spark');
    if (dtvSpark) AnimationEngine.drawSparkline(dtvSpark, dtvData, '#C8A84B');
    const fxSpark = document.getElementById('kpi-forex-spark');
    if (fxSpark) AnimationEngine.drawSparkline(fxSpark, fxData, '#40916C');
  }

  // ── Init India Map ────────────────────────────────────────//
  if (states) {
    MapEngine.initHeroMap('hero-map', states);
  }

  // ── Auto Insights ─────────────────────────────────────────//
  if (national && states) {
    const insights = [
      ...InsightsEngine.generateNationalInsights(national),
      ...InsightsEngine.generateStateInsights(states)
    ];
    renderInsights(insights);
  }

  // ── Source Countries Chart ────────────────────────────────//
  if (countries) {
    const top10 = countries.top_sources_2022.slice(0, 10);
    ChartFactory.horizontalBar('chart-source-countries',
      top10.map(c => c.country),
      [{
        label: 'Arrivals (Thousand)',
        data: top10.map(c => c.arrivals),
        colors: top10.map((_, i) => ChartFactory.PALETTE[i % ChartFactory.PALETTE.length])
      }],
      {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { callback: v => v + 'K' } }
        }
      }
    );
  }

  // ── Init animate-in ────────────────────────────────────── //
  setTimeout(() => {
    document.querySelectorAll('.animate-in').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }, 200);
}

// ── KPI Populator ──────────────────────────────────────────
function populateKPI(id, value, prevValue, unit, decimals) {
  const card = document.getElementById(id);
  if (!card) return;
  const valEl    = card.querySelector('.counter');
  const changeEl = card.querySelector('.kpi-change');
  if (valEl) {
    valEl.dataset.target   = value;
    valEl.dataset.decimals = decimals;
    valEl.dataset.suffix   = '';
    valEl.textContent      = '—';
  }
  if (changeEl && prevValue) {
    const pct = ((value - prevValue) / Math.abs(prevValue) * 100).toFixed(1);
    const pos  = parseFloat(pct) >= 0;
    changeEl.className = `kpi-change ${pos ? 'positive' : 'negative'}`;
    changeEl.innerHTML = `<i class="fas fa-arrow-${pos ? 'up' : 'down'}"></i>${pos ? '+' : ''}${pct}% vs prior year`;
  }
}

// ── Overview Charts ────────────────────────────────────────
function drawOverviewCharts(national) {
  const years   = national.yearly.map(y => y.year);
  const fta     = national.yearly.map(y => y.fta);
  const dtv     = national.yearly.map(y => y.dtv / 100); // scale DTV
  const fx      = national.yearly.map(y => y.forex_usd);
  const gdp     = national.yearly.map(y => y.tourism_gdp_pct);
  const emp     = national.yearly.map(y => y.employment_million);

  // Chart 1: Tourism Growth Line
  ChartFactory.line('chart-tourism-growth', years, [
    { label: 'Foreign Tourist Arrivals (M)', data: fta, color: '#E8770A' },
    { label: 'Domestic Visits (×100M)',      data: dtv, color: '#C8A84B' },
    { label: 'Tourism Revenue (USD B)',       data: fx,  color: '#40916C' }
  ], { plugins: { legend: { display: true } } });

  // Chart 2: Annual Growth Bar
  const growth = national.yearly.map((y, i) => {
    if (i === 0) return 0;
    const prev = national.yearly[i-1];
    return prev.fta ? ((y.fta - prev.fta) / Math.abs(prev.fta) * 100).toFixed(1) : 0;
  });
  ChartFactory.bar('chart-annual-growth', years, [{
    label: 'FTA Growth (%)', data: growth,
    colors: growth.map(g => parseFloat(g) >= 0 ? '#40916C' : '#E05252')
  }], {
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => v + '%' } } }
  });

  // Chart 4: Tourism Revenue Area
  ChartFactory.area('chart-revenue', years, [
    { label: 'Revenue (USD B)', data: fx, color: '#C8A84B', fill: true }
  ], {
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => '$' + v + 'B' } } }
  });

  // Chart 5: Tourism GDP
  ChartFactory.line('chart-tourism-gdp', years, [
    { label: 'Tourism GDP Contribution (%)', data: gdp, color: '#E8770A' }
  ], {
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => v + '%' }, min: 0, max: 10 } }
  });

  // Chart 6: Tourism Employment
  ChartFactory.line('chart-employment', years, [
    { label: 'Total Tourism Employment (M)', data: emp, color: '#40916C', fill: true }
  ], {
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => v + 'M' } } }
  });

  // Chart 7: Economic Composition
  ChartFactory.donut('chart-economic-composition',
    ['Accommodation', 'Food & Beverage', 'Transport', 'Shopping', 'Entertainment', 'Other'],
    [28, 22, 18, 14, 8, 10],
    ChartFactory.PALETTE
  );

  // Chart 3: Domestic vs Foreign 100% Stacked
  const ftaTotal = national.yearly.map(y => y.fta);
  const dtvTotal = national.yearly.map(y => Math.min(y.dtv / 200, 100 - (y.fta / (y.fta + y.dtv/200) * 100)));
  ChartFactory.stackedBar('chart-dom-foreign', years.slice(-8), [
    { label: 'Foreign Arrivals (M)', data: ftaTotal.slice(-8), color: '#E8770A' },
    { label: 'Domestic Visits (×100M)', data: national.yearly.slice(-8).map(y => +(y.dtv/100).toFixed(1)), color: '#C8A84B' }
  ], {});
}

// ── Insights Renderer ──────────────────────────────────────
function renderInsights(insights) {
  const container = document.getElementById('auto-insights');
  if (!container || !insights.length) return;
  container.innerHTML = insights.map(ins => `
    <div class="insight-item animate-in" style="
      display:flex;align-items:flex-start;gap:12px;
      padding:14px 16px;
      background:var(--bg-card);
      border:1px solid var(--border-subtle);
      border-left:3px solid ${ins.type === 'positive' ? 'var(--positive)' : ins.type === 'negative' ? 'var(--negative)' : 'var(--gold)'};
      border-radius:6px;
      margin-bottom:10px;
    ">
      <i class="fas fa-${ins.type === 'positive' ? 'arrow-trend-up' : ins.type === 'negative' ? 'arrow-trend-down' : 'circle-info'}" 
         style="color:${ins.type === 'positive' ? 'var(--positive)' : ins.type === 'negative' ? 'var(--negative)' : 'var(--gold)'};
                margin-top:2px;flex-shrink:0;font-size:0.85rem"></i>
      <div>
        <p style="font-family:'Manrope',sans-serif;font-size:0.85rem;color:var(--text-primary);line-height:1.5">${ins.text}</p>
        <p style="font-family:'Inter',sans-serif;font-size:0.65rem;color:var(--text-muted);margin-top:4px">Source: ${ins.source}</p>
      </div>
    </div>
  `).join('');
}
