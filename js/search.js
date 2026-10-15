/* ============================================================
   INDIA IN MOTION — Search Engine
   ============================================================ */

const SearchEngine = (() => {

  // Search index — populated from data
  const index = [];

  function buildIndex(data) {
    if (data.states) {
      data.states.states.forEach(s => {
        index.push({
          type: 'State',
          title: s.name,
          sub: `${s.dtv_2022?.toFixed(1) || '—'} M domestic visits (2022)`,
          url: `states.html#${s.code.toLowerCase()}`,
          tags: [s.name.toLowerCase(), ...s.categories.map(c => c.toLowerCase()), ...s.top_destinations.map(d => d.toLowerCase())]
        });
      });
    }
    if (data.destinations) {
      data.destinations.destinations.forEach(d => {
        index.push({
          type: 'Destination',
          title: d.name,
          sub: `${d.state} · ${d.category}`,
          url: `destinations.html#${d.id}`,
          tags: [d.name.toLowerCase(), d.state.toLowerCase(), d.category.toLowerCase(), ...d.sub_tags.map(t => t.toLowerCase())]
        });
      });
    }
    if (data.countries) {
      data.countries.top_sources_2022.forEach(c => {
        index.push({
          type: 'Source Market',
          title: c.country,
          sub: `${c.arrivals.toFixed(1)}K arrivals (2022) · ${c.share_pct}% share`,
          url: `tourists.html#country-${c.code.toLowerCase()}`,
          tags: [c.country.toLowerCase(), c.continent.toLowerCase(), 'source market', 'foreign', 'arrivals']
        });
      });
    }
    // Static pages
    const pages = [
      { type: 'Page', title: 'India Tourism Pulse', sub: 'National KPIs and overview', url: 'index.html', tags: ['overview', 'kpi', 'national', 'pulse'] },
      { type: 'Page', title: 'Tourism Economy', sub: 'Revenue, GDP, employment', url: 'pages/economy.html', tags: ['economy', 'gdp', 'revenue', 'employment', 'forex'] },
      { type: 'Page', title: 'Heritage & Culture', sub: 'UNESCO sites, monuments, festivals', url: 'pages/culture.html', tags: ['heritage', 'culture', 'monuments', 'festivals', 'spiritual'] },
      { type: 'Page', title: 'Infrastructure', sub: 'Hotels, airports, government projects', url: 'pages/infrastructure.html', tags: ['infrastructure', 'hotels', 'airports', 'projects'] },
      { type: 'Page', title: 'Sustainability', sub: 'Eco-tourism, protected areas', url: 'pages/sustainability.html', tags: ['sustainability', 'eco', 'environment', 'wildlife'] },
      { type: 'Page', title: 'Data Lab', sub: 'Explore and export tourism data', url: 'pages/data-lab.html', tags: ['data', 'lab', 'export', 'filter', 'table'] },
      { type: 'Page', title: 'Emerging Destinations', sub: 'High-potential tourism destinations', url: 'pages/insights.html', tags: ['emerging', 'opportunities', 'potential', 'new'] }
    ];
    pages.forEach(p => index.push(p));
  }

  function query(q) {
    if (!q || q.length < 2) return [];
    const terms = q.toLowerCase().split(/\s+/);
    const results = [];
    for (const item of index) {
      const score = terms.reduce((s, term) => {
        if (item.title.toLowerCase().includes(term)) return s + 3;
        if (item.tags.some(t => t.includes(term))) return s + 1;
        if (item.sub.toLowerCase().includes(term)) return s + 1;
        return s;
      }, 0);
      if (score > 0) results.push({ ...item, score });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  }

  const typeIcons = {
    'State':        'fa-map',
    'Destination':  'fa-location-dot',
    'Source Market':'fa-globe',
    'Page':         'fa-chart-bar'
  };

  function renderResults(results, container) {
    if (!container) return;
    if (results.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted);font-family:'Inter',sans-serif;font-size:0.85rem;padding:8px 0">No results found. Try "Kerala", "Heritage", or "Rajasthan".</p>`;
      return;
    }
    container.innerHTML = results.map(r => `
      <a href="${r.url}" class="search-result-item">
        <div class="search-result-icon">
          <i class="fas ${typeIcons[r.type] || 'fa-search'}"></i>
        </div>
        <div class="search-result-text">
          <span style="font-size:0.85rem;font-weight:500">${r.title}</span>
          <small>${r.type} · ${r.sub}</small>
        </div>
      </a>
    `).join('');
  }

  function init(data) {
    if (!data) return;
    buildIndex(data);
    const overlay = document.getElementById('search-overlay');
    const input   = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const closeBtn= document.getElementById('search-close');
    const openBtn = document.getElementById('search-open-btn');

    if (!overlay || !input) return;

    function open() {
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 50);
    }
    function close() {
      overlay.classList.remove('open');
      input.value = '';
      if (results) results.innerHTML = '';
    }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const r = query(input.value.trim());
        renderResults(r, results);
      }, 200);
    });
  }

  return { init, query };
})();
