/* ============================================================
   INDIA IN MOTION — Chart Factory  (bulletproof rewrite)
   All chart functions return null-safe, never throw.
   ============================================================ */

const ChartFactory = (function() {

  var PALETTE = ['#E8770A','#C8A84B','#40916C','#7B9EA6','#B5470B','#A67C52','#5C7C6A','#DFC06A','#E8B34B','#6B9E8A'];

  /* ── get canvas 2d context safely ── */
  function ctx(id) {
    if (typeof Chart === 'undefined') { console.warn('Chart.js not loaded'); return null; }
    var el = document.getElementById(id);
    if (!el) { console.warn('ChartFactory: canvas not found:', id); return null; }
    return el;
  }

  /* ── destroy existing chart on same canvas ── */
  function destroy(id) {
    if (typeof Chart === 'undefined') return;
    var existing = Chart.getChart(id);
    if (existing) { try { existing.destroy(); } catch(e){} }
  }

  /* ── shared tooltip config ── */
  function tooltip() {
    return {
      backgroundColor: '#1C2028',
      borderColor: 'rgba(200,168,75,0.25)',
      borderWidth: 1,
      titleColor: '#E8E6E0',
      bodyColor: '#9A9490',
      titleFont: { family: "'Playfair Display',Georgia,serif", size: 13 },
      bodyFont: { family: "'Inter',sans-serif", size: 11 },
      padding: 12,
      cornerRadius: 6
    };
  }

  /* ── shared legend config ── */
  function legend(show) {
    return {
      display: show !== false,
      position: 'bottom',
      labels: {
        color: '#9A9490',
        font: { family: "'Inter',sans-serif", size: 11 },
        boxWidth: 10, boxHeight: 10, padding: 14,
        usePointStyle: true, pointStyle: 'circle'
      }
    };
  }

  /* ── shared scale config — returns NEW object each call ── */
  function scale() {
    return {
      grid: { color: 'rgba(255,255,255,0.05)', drawTicks: false },
      border: { display: false },
      ticks: { color: '#9A9490', font: { family: "'Inter',sans-serif", size: 11 } }
    };
  }

  /* ── resolve color for dataset index ── */
  function resolveColor(ds, i) {
    return ds.color || PALETTE[i % PALETTE.length];
  }

  /* ── merge user overrides into base options safely ── */
  /* NOTE: we do NOT JSON-clone because callbacks (functions) can't be cloned */
  function buildOptions(base, overrides) {
    if (!overrides) return base;

    // plugins
    if (overrides.plugins) {
      if (!base.plugins) base.plugins = {};
      if (overrides.plugins.legend !== undefined) {
        if (!base.plugins.legend) base.plugins.legend = {};
        if (overrides.plugins.legend.display === false) base.plugins.legend.display = false;
        if (overrides.plugins.legend.position) base.plugins.legend.position = overrides.plugins.legend.position;
      }
      if (overrides.plugins.tooltip) {
        if (!base.plugins.tooltip) base.plugins.tooltip = {};
        if (overrides.plugins.tooltip.callbacks) {
          base.plugins.tooltip.callbacks = overrides.plugins.tooltip.callbacks;
        }
      }
    }

    // scales — direct mutation (safe, object is freshly created per chart call)
    if (overrides.scales) {
      if (!base.scales) base.scales = {};
      Object.keys(overrides.scales).forEach(function(k) {
        var ov = overrides.scales[k];
        if (!base.scales[k]) base.scales[k] = {};
        if (ov.ticks) {
          if (!base.scales[k].ticks) base.scales[k].ticks = { color: '#9A9490', font: { family: "'Inter',sans-serif", size: 11 } };
          // copy all ticks props including callback functions
          Object.keys(ov.ticks).forEach(function(tk) { base.scales[k].ticks[tk] = ov.ticks[tk]; });
        }
        if (ov.min !== undefined) base.scales[k].min = ov.min;
        if (ov.max !== undefined) base.scales[k].max = ov.max;
        if (ov.stacked !== undefined) base.scales[k].stacked = ov.stacked;
        if (ov.reverse !== undefined) base.scales[k].reverse = ov.reverse;
        if (ov.title) {
          base.scales[k].title = Object.assign({ display: true, color: '#9A9490', font: { size: 11 } }, ov.title);
        }
        if (ov.grid) base.scales[k].grid = Object.assign({}, base.scales[k].grid || {}, ov.grid);
      });
    }

    // indexAxis (horizontal bar)
    if (overrides.indexAxis) base.indexAxis = overrides.indexAxis;

    return base;
  }

  /* ══════════════════════════════════════════════
     LINE CHART
  ══════════════════════════════════════════════ */
  function line(id, labels, datasets, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    var base = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: { legend: legend(datasets.length > 1), tooltip: tooltip() },
      scales: {
        x: scale(),
        y: scale()
      }
    };
    var opts = buildOptions(base, overrides);
    try {
      return new Chart(el, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets.map(function(ds, i) {
            var c = resolveColor(ds, i);
            return {
              label: ds.label || '',
              data: ds.data,
              borderColor: c,
              backgroundColor: c + (ds.fill ? '22' : '00'),
              fill: ds.fill || false,
              tension: 0.35,
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              pointBackgroundColor: c,
              pointBorderColor: '#1C2028',
              pointBorderWidth: 2
            };
          })
        },
        options: opts
      });
    } catch(e) { console.error('Chart line error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     AREA CHART (line with fill)
  ══════════════════════════════════════════════ */
  function area(id, labels, datasets, overrides) {
    var filled = datasets.map(function(ds) { return Object.assign({}, ds, { fill: true }); });
    return line(id, labels, filled, overrides);
  }

  /* ══════════════════════════════════════════════
     BAR CHART
  ══════════════════════════════════════════════ */
  function bar(id, labels, datasets, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    var base = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: { legend: legend(datasets.length > 1), tooltip: tooltip() },
      scales: { x: scale(), y: scale() }
    };
    var opts = buildOptions(base, overrides);
    try {
      return new Chart(el, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets.map(function(ds, i) {
            var c = resolveColor(ds, i);
            var bgColors = ds.colors || c;
            return {
              label: ds.label || '',
              data: ds.data,
              backgroundColor: bgColors,
              borderColor: 'transparent',
              borderRadius: 3,
              borderSkipped: false
            };
          })
        },
        options: opts
      });
    } catch(e) { console.error('Chart bar error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     STACKED BAR
  ══════════════════════════════════════════════ */
  function stackedBar(id, labels, datasets, overrides) {
    var ov = overrides || {};
    if (!ov.scales) ov.scales = {};
    if (!ov.scales.x) ov.scales.x = {};
    if (!ov.scales.y) ov.scales.y = {};
    ov.scales.x.stacked = true;
    ov.scales.y.stacked = true;
    return bar(id, labels, datasets, ov);
  }

  /* ══════════════════════════════════════════════
     HORIZONTAL BAR
  ══════════════════════════════════════════════ */
  function horizontalBar(id, labels, datasets, overrides) {
    var ov = overrides || {};
    ov.indexAxis = 'y';
    return bar(id, labels, datasets, ov);
  }

  /* ══════════════════════════════════════════════
     DONUT / PIE
  ══════════════════════════════════════════════ */
  function donut(id, labels, data, colors, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    try {
      return new Chart(el, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors || PALETTE,
            borderColor: '#1A1E26',
            borderWidth: 2,
            hoverOffset: 6
          }]
        },
        options: Object.assign({
          responsive: true, maintainAspectRatio: false,
          cutout: '62%',
          animation: { duration: 700, animateRotate: true },
          plugins: {
            legend: legend(),
            tooltip: tooltip()
          }
        }, overrides || {})
      });
    } catch(e) { console.error('Chart donut error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     RADAR
  ══════════════════════════════════════════════ */
  function radar(id, labels, datasets, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    try {
      return new Chart(el, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: datasets.map(function(ds, i) {
            var c = resolveColor(ds, i);
            return {
              label: ds.label || '',
              data: ds.data,
              borderColor: c,
              backgroundColor: c + '22',
              pointBackgroundColor: c,
              pointBorderColor: '#1C2028',
              borderWidth: 2,
              pointRadius: 4
            };
          })
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          animation: { duration: 700 },
          plugins: { legend: legend(datasets.length > 1), tooltip: tooltip() },
          scales: {
            r: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              angleLines: { color: 'rgba(255,255,255,0.05)' },
              pointLabels: { color: '#9A9490', font: { family: "'Inter',sans-serif", size: 11 } },
              ticks: { display: false }
            }
          }
        }
      });
    } catch(e) { console.error('Chart radar error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     SCATTER
  ══════════════════════════════════════════════ */
  function scatter(id, datasets, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    var base = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: { legend: legend(datasets.length > 1), tooltip: tooltip() },
      scales: { x: scale(), y: scale() }
    };
    var opts = buildOptions(base, overrides);
    try {
      return new Chart(el, {
        type: 'scatter',
        data: {
          datasets: datasets.map(function(ds, i) {
            var c = resolveColor(ds, i);
            return {
              label: ds.label || '',
              data: ds.data,
              backgroundColor: c + 'BB',
              borderColor: c,
              borderWidth: 1,
              pointRadius: ds.radius || 6,
              pointHoverRadius: (ds.radius || 6) + 3
            };
          })
        },
        options: opts
      });
    } catch(e) { console.error('Chart scatter error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     BUBBLE
  ══════════════════════════════════════════════ */
  function bubble(id, datasets, overrides) {
    var el = ctx(id); if (!el) return null; destroy(id);
    var base = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: { legend: legend(datasets.length > 1), tooltip: tooltip() },
      scales: { x: scale(), y: scale() }
    };
    var opts = buildOptions(base, overrides);
    try {
      return new Chart(el, {
        type: 'bubble',
        data: {
          datasets: datasets.map(function(ds, i) {
            var c = resolveColor(ds, i);
            return {
              label: ds.label || '',
              data: ds.data,
              backgroundColor: c + '88',
              borderColor: c,
              borderWidth: 1
            };
          })
        },
        options: opts
      });
    } catch(e) { console.error('Chart bubble error:', id, e); return null; }
  }

  /* ══════════════════════════════════════════════
     UPDATE THEME (called on dark/light toggle)
  ══════════════════════════════════════════════ */
  function updateTheme() {
    if (typeof Chart === 'undefined') return;
    try {
      // Chart.js v4: Chart.instances is an object keyed by id
      var instances = Chart.instances;
      if (!instances) return;
      Object.values(instances).forEach(function(chart) {
        if (!chart || !chart.options) return;
        var sc = chart.options.scales;
        if (sc) {
          Object.values(sc).forEach(function(s) {
            if (s && s.ticks) s.ticks.color = '#9A9490';
            if (s && s.grid)  s.grid.color  = 'rgba(255,255,255,0.05)';
          });
        }
        if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
          chart.options.plugins.legend.labels.color = '#9A9490';
        }
        chart.update('none');
      });
    } catch(e) { console.warn('updateTheme error', e); }
  }

  return {
    line: line,
    area: area,
    bar: bar,
    stackedBar: stackedBar,
    horizontalBar: horizontalBar,
    donut: donut,
    radar: radar,
    scatter: scatter,
    bubble: bubble,
    updateTheme: updateTheme,
    PALETTE: PALETTE
  };

})();
