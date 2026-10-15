/* ============================================================
   INDIA IN MOTION — Animation Engine
   ============================================================ */

/* ── Intersection Observer for scroll animations ────────── */
const AnimationEngine = (() => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Observe elements with .animate-in
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe stagger grids
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  function init() {
    document.querySelectorAll('.animate-in').forEach(el => scrollObserver.observe(el));
    document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));
  }

  // Counter animation
  function animateCounter(el, target, duration = 1600, suffix = '', decimals = 0) {
    if (prefersReducedMotion) {
      el.textContent = decimals > 0 ? target.toFixed(decimals) + suffix : Math.round(target).toLocaleString() + suffix;
      return;
    }
    const start = performance.now();
    const startVal = 0;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * eased;
      el.textContent = decimals > 0
        ? current.toFixed(decimals) + suffix
        : Math.round(current).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Observe KPI values and trigger counter
  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || 0);
        animateCounter(el, target, 1600, suffix, decimals);
        kpiObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  function initCounters() {
    document.querySelectorAll('.counter[data-target]').forEach(el => kpiObserver.observe(el));
  }

  // Scroll progress bar
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
  }

  // Cursor light effect
  function initCursorLight() {
    if (prefersReducedMotion) return;
    const light = document.getElementById('cursor-light');
    if (!light) return;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });
    function moveCursor() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      light.style.left = currentX + 'px';
      light.style.top  = currentY + 'px';
      requestAnimationFrame(moveCursor);
    }
    requestAnimationFrame(moveCursor);
  }

  // Navigation scroll behavior
  function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastY = y;
    }, { passive: true });
  }

  // Draw sparklines using canvas
  function drawSparkline(canvas, data, color = '#C8A84B') {
    if (!canvas || !data || data.length < 2) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;
    const pts = data.map((v, i) => ({
      x: pad + (i / (data.length - 1)) * (cw - pad * 2),
      y: ch - pad - ((v - min) / range) * (ch - pad * 2)
    }));
    ctx.clearRect(0, 0, cw, ch);
    // Fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, ch);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, ch);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, ch);
    grad.addColorStop(0, color + '33');
    grad.addColorStop(1, color + '00');
    ctx.fillStyle = grad;
    ctx.fill();
    // Line
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  return { init, initCounters, initScrollProgress, initCursorLight, initNavScroll, drawSparkline, animateCounter };
})();
