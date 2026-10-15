/* ============================================================
   INDIA IN MOTION — Map Engine
   Handles Leaflet.js India map, state interactions
   ============================================================ */

const MapEngine = (() => {

  let heroMap = null;
  let stateLayer = null;
  let currentLayer = 'total';
  let statesData = null;

  // Color scales for choropleth
  function getColor(value, min, max, palette) {
    const t = max === min ? 0.5 : (value - min) / (max - min);
    // Interpolate from low to high using saffron/gold scale
    const colors = palette || [
      [28, 35, 48],    // dark
      [92, 52, 11],    // terracotta-dark
      [181, 71, 11],   // terracotta
      [232, 119, 10],  // saffron
      [245, 160, 58]   // saffron-light
    ];
    const idx = Math.min(Math.floor(t * (colors.length - 1)), colors.length - 2);
    const frac = t * (colors.length - 1) - idx;
    const c1 = colors[idx], c2 = colors[idx + 1];
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * frac);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * frac);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * frac);
    return `rgb(${r},${g},${b})`;
  }

  function getStateValue(stateName, layer, data) {
    if (!data) return 0;
    const s = data.states.find(st =>
      st.name.toLowerCase() === stateName.toLowerCase() ||
      st.code.toLowerCase() === stateName.toLowerCase().slice(0, 2)
    );
    if (!s) return 0;
    switch(layer) {
      case 'total':    return (s.dtv_2022 || 0) + (s.fta_2022 || 0);
      case 'domestic': return s.dtv_2022 || 0;
      case 'foreign':  return s.fta_2022 || 0;
      case 'growth':   return s.growth_dtv_pct || 0;
      default:         return s.dtv_2022 || 0;
    }
  }

  function initHeroMap(containerId, stData) {
    statesData = stData;
    const mapEl = document.getElementById(containerId);
    if (!mapEl) return;

    heroMap = L.map(containerId, {
      center: [22.5, 82.5],
      zoom: 4.5,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(heroMap);

    // Zoom control (custom position)
    L.control.zoom({ position: 'topright' }).addTo(heroMap);

    loadGeoJSON();
    addMajorCities();
  }

  async function loadGeoJSON() {
    try {
      // Use reliable India states GeoJSON from GitHub via jsDelivr
      const urls = [
        'https://cdn.jsdelivr.net/gh/geohacker/india@master/state/india_telengana.geojson',
        'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States'
      ];
      // Try primary source - simplified india states
      const res = await fetch('https://cdn.jsdelivr.net/gh/datta07/INDIAN-SHAPEFILES@master/STATES/STATES.json');
      if (!res.ok) throw new Error('GeoJSON fetch failed');
      const geo = await res.json();
      renderStateLayer(geo);
    } catch (e) {
      // Fallback: markers only — works without internet too
      console.info('Map: GeoJSON unavailable, using city markers only');
    }
  }

  function renderStateLayer(geo) {
    if (!heroMap) return;
    if (stateLayer) { heroMap.removeLayer(stateLayer); }

    const values = [];
    if (statesData) {
      statesData.states.forEach(s => values.push((s.dtv_2022 || 0) + (s.fta_2022 || 0)));
    }
    const min = Math.min(...values) || 0;
    const max = Math.max(...values) || 1;

    stateLayer = L.geoJSON(geo, {
      style: feature => {
        const name = feature.properties.NAME_1 || feature.properties.state || '';
        const val = getStateValue(name, currentLayer, statesData);
        return {
          fillColor: statesData ? getColor(val, min, max) : '#2A3040',
          weight: 1,
          opacity: 0.7,
          color: 'rgba(200,168,75,0.2)',
          fillOpacity: 0.75
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME_1 || feature.properties.state || 'India';
        layer.on({
          mouseover: e => {
            e.target.setStyle({ fillOpacity: 0.95, weight: 2, color: '#E8770A' });
            const stateInfo = statesData?.states.find(s =>
              s.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(s.name.toLowerCase())
            );
            showMapTooltip(e, name, stateInfo);
          },
          mouseout: e => {
            stateLayer.resetStyle(e.target);
            hideMapTooltip();
          },
          click: e => {
            const stateInfo = statesData?.states.find(s =>
              s.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(s.name.toLowerCase())
            );
            if (stateInfo) openStatePanel(stateInfo);
          }
        });
      }
    }).addTo(heroMap);
  }

  function switchLayer(layer) {
    currentLayer = layer;
    if (stateLayer && statesData) {
      const values = statesData.states.map(s => getStateValue(s.name, layer, statesData));
      const min = Math.min(...values);
      const max = Math.max(...values);
      stateLayer.setStyle(feature => {
        const name = feature.properties.NAME_1 || feature.properties.state || '';
        const val = getStateValue(name, layer, statesData);
        return {
          fillColor: getColor(val, min, max),
          weight: 1, opacity: 0.7,
          color: 'rgba(200,168,75,0.2)',
          fillOpacity: 0.75
        };
      });
    }
    document.querySelectorAll('.map-layer-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layer === layer);
    });
  }

  function addMajorCities() {
    if (!heroMap) return;
    const cities = [
      { name: 'Delhi',     lat: 28.6139, lng: 77.2090, label: 'Delhi',      type: 'gateway' },
      { name: 'Mumbai',    lat: 19.0760, lng: 72.8777, label: 'Mumbai',     type: 'gateway' },
      { name: 'Kolkata',   lat: 22.5726, lng: 88.3639, label: 'Kolkata',    type: 'gateway' },
      { name: 'Chennai',   lat: 13.0827, lng: 80.2707, label: 'Chennai',    type: 'gateway' },
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, label: 'Bengaluru',  type: 'gateway' },
      { name: 'Agra',      lat: 27.1767, lng: 78.0081, label: 'Agra',       type: 'heritage' },
      { name: 'Varanasi',  lat: 25.3176, lng: 82.9739, label: 'Varanasi',   type: 'spiritual' },
      { name: 'Jaipur',    lat: 26.9124, lng: 75.7873, label: 'Jaipur',     type: 'heritage' },
      { name: 'Goa',       lat: 15.2993, lng: 74.1240, label: 'Goa',        type: 'beach' },
      { name: 'Kochi',     lat: 9.9312,  lng: 76.2673, label: 'Kochi',      type: 'nature' },
      { name: 'Amritsar',  lat: 31.6340, lng: 74.8723, label: 'Amritsar',   type: 'spiritual' },
      { name: 'Khajuraho', lat: 24.8318, lng: 79.9199, label: 'Khajuraho',  type: 'heritage' }
    ];

    cities.forEach(city => {
      const colors = {
        gateway:  '#E8770A',
        heritage: '#C8A84B',
        spiritual:'#7B9EA6',
        beach:    '#40916C',
        nature:   '#5C7C6A'
      };
      const color = colors[city.type] || '#C8A84B';

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:10px;height:10px;
          background:${color};
          border:2px solid rgba(255,255,255,0.3);
          border-radius:50%;
          box-shadow:0 0 8px ${color}66;
          cursor:pointer;
          transition:transform 0.2s;
        " title="${city.label}"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      });

      const marker = L.marker([city.lat, city.lng], { icon }).addTo(heroMap);
      marker.bindTooltip(`<span style="font-family:'Inter',sans-serif;font-size:12px;color:#E8E6E0;background:#1C2028;border:1px solid rgba(200,168,75,0.25);padding:4px 10px;border-radius:4px">${city.label}</span>`, {
        permanent: false,
        direction: 'top',
        offset: [0, -8],
        opacity: 1,
        className: 'leaflet-tooltip-clean'
      });
    });
  }

  // ── Map tooltip ───────────────────────────────────────────
  let tooltipEl = null;

  function showMapTooltip(e, name, stateInfo) {
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'map-hover-tooltip';
      tooltipEl.style.cssText = `
        position:fixed; z-index:500; pointer-events:none;
        background:#1C2028; border:1px solid rgba(200,168,75,0.25);
        border-radius:8px; padding:14px 16px;
        font-family:'Inter',sans-serif; font-size:12px;
        box-shadow:0 8px 32px rgba(0,0,0,0.6);
        min-width:180px; transition:opacity 0.15s;
        opacity:0;
      `;
      document.body.appendChild(tooltipEl);
    }

    let html = `<div style="font-family:'Playfair Display',serif;font-size:14px;font-weight:600;color:#E8E6E0;margin-bottom:8px">${name}</div>`;
    if (stateInfo) {
      html += `
        <div style="color:#9A9490;display:flex;justify-content:space-between;gap:16px;margin-bottom:4px">
          <span>Domestic Visits</span>
          <strong style="color:#E8E6E0">${stateInfo.dtv_2022?.toFixed(1) || '—'} M</strong>
        </div>
        <div style="color:#9A9490;display:flex;justify-content:space-between;gap:16px;margin-bottom:4px">
          <span>Foreign Arrivals</span>
          <strong style="color:#E8E6E0">${stateInfo.fta_2022?.toFixed(2) || '—'} M</strong>
        </div>
        <div style="color:#9A9490;display:flex;justify-content:space-between;gap:16px;margin-bottom:4px">
          <span>YoY Growth</span>
          <strong style="color:${stateInfo.growth_dtv_pct > 0 ? '#40916C' : '#E05252'}">${stateInfo.growth_dtv_pct > 0 ? '+' : ''}${stateInfo.growth_dtv_pct?.toFixed(1) || '—'}%</strong>
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06)">
          ${stateInfo.categories?.map(c => `<span style="font-size:10px;color:#C8A84B;margin-right:6px">${c}</span>`).join('') || ''}
        </div>
      `;
    } else {
      html += `<div style="color:#9A9490;font-size:11px">No data available</div>`;
    }

    tooltipEl.innerHTML = html;
    tooltipEl.style.opacity = '1';
    document.addEventListener('mousemove', moveTooltip);
  }

  function moveTooltip(e) {
    if (!tooltipEl) return;
    tooltipEl.style.left = (e.clientX + 18) + 'px';
    tooltipEl.style.top  = (e.clientY - 60) + 'px';
  }

  function hideMapTooltip() {
    if (tooltipEl) tooltipEl.style.opacity = '0';
    document.removeEventListener('mousemove', moveTooltip);
  }

  // ── State Detail Panel ────────────────────────────────────
  function openStatePanel(stateInfo) {
    const panel = document.getElementById('state-detail-panel');
    if (!panel) return;
    panel.innerHTML = buildStatePanelHTML(stateInfo);
    panel.classList.add('open');
    document.getElementById('panel-close-btn')?.addEventListener('click', closeStatePanel);
  }

  function closeStatePanel() {
    const panel = document.getElementById('state-detail-panel');
    if (panel) panel.classList.remove('open');
  }

  function buildStatePanelHTML(s) {
    const recovery = s.dtv_2019 ? ((s.dtv_2022 / s.dtv_2019) * 100).toFixed(0) : null;
    return `
      <button id="panel-close-btn" class="state-panel-close" aria-label="Close panel">
        <i class="fas fa-times"></i>
      </button>
      <div style="margin-bottom:16px">
        <p class="label-caps-accent" style="margin-bottom:8px">${s.categories?.join(' · ') || 'Tourism'}</p>
        <h2 class="display-md">${s.name}</h2>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">${s.tourism_tagline || ''}</p>
      </div>
      <div class="divider" style="margin:16px 0"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <div style="background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;padding:12px">
          <p class="label-caps" style="margin-bottom:6px">Domestic Visits</p>
          <p style="font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--text-primary)">${s.dtv_2022?.toFixed(1)}M</p>
          <p style="font-size:0.68rem;color:var(--text-muted)">2022 · Ministry of Tourism</p>
        </div>
        <div style="background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;padding:12px">
          <p class="label-caps" style="margin-bottom:6px">Foreign Arrivals</p>
          <p style="font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--text-primary)">${s.fta_2022?.toFixed(2)}M</p>
          <p style="font-size:0.68rem;color:var(--text-muted)">2022 · Ministry of Tourism</p>
        </div>
      </div>
      ${recovery ? `
        <div style="background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:20px">
          <p class="label-caps" style="margin-bottom:8px">2022 vs Pre-Pandemic (2019)</p>
          <div class="inline-bar">
            <div class="inline-bar-track"><div class="inline-bar-fill" style="width:${Math.min(parseInt(recovery),100)}%"></div></div>
            <span class="inline-bar-value">${recovery}%</span>
          </div>
          <p style="font-size:0.68rem;color:var(--text-muted);margin-top:4px">Derived metric — Ministry of Tourism data</p>
        </div>
      ` : ''}
      <div style="margin-bottom:16px">
        <p class="label-caps" style="margin-bottom:10px">Top Destinations</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${s.top_destinations?.map(d => `<span style="background:var(--bg-elevated);border:1px solid var(--border-light);border-radius:4px;padding:4px 10px;font-family:'Inter',sans-serif;font-size:0.72rem;color:var(--text-secondary)">${d}</span>`).join('') || '—'}
        </div>
      </div>
      <div class="divider" style="margin:16px 0"></div>
      <p style="font-size:0.68rem;color:var(--text-muted)">
        <strong style="color:var(--text-secondary)">Source:</strong> Ministry of Tourism, Government of India
        &nbsp;·&nbsp; Year: 2022
      </p>
    `;
  }

  // Light mode tile switch
  function switchTileLayer(theme) {
    if (!heroMap) return;
    heroMap.eachLayer(layer => {
      if (layer instanceof L.TileLayer) heroMap.removeLayer(layer);
    });
    const url = theme === 'light'
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    L.tileLayer(url, {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
      subdomains: 'abcd', maxZoom: 18
    }).addTo(heroMap);
  }

  return { initHeroMap, switchLayer, switchTileLayer, openStatePanel, closeStatePanel };
})();
