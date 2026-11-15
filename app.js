/* ═════════════════════════════════════════════════════════════
   Flame in Freefall — app.js (v5 — Hackathon Winning Edition)
   SI-Powered Fire Safety & Microgravity Combustion Physics
   Global namespace: App
   ═════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     1. SOUND SYNTHESIS ENGINE (Zero-dependency Web Audio API)
     ───────────────────────────────────────────────────────────── */
  const Sound = {
    ctx: null,
    enabled: true,
    init() {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.ctx = new AudioContextClass();
      } catch (_) {}
    },
    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    },
    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
      if (!this.enabled || !this.ctx) return;
      try {
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (_) {}
    },
    click() { this.playTone(880, 'sine', 0.04, 0.03); },
    chime() {
      if (!this.enabled || !this.ctx) return;
      this.playTone(523.25, 'triangle', 0.12, 0.06);
      setTimeout(() => this.playTone(659.25, 'triangle', 0.16, 0.07), 80);
      setTimeout(() => this.playTone(783.99, 'sine', 0.28, 0.08), 160);
      setTimeout(() => this.playTone(1046.50, 'sine', 0.35, 0.09), 240);
    },
    alert() {
      if (!this.enabled || !this.ctx) return;
      this.playTone(480, 'sawtooth', 0.14, 0.04);
      setTimeout(() => this.playTone(320, 'sine', 0.2, 0.05), 100);
    }
  };

  /* ─────────────────────────────────────────────────────────────
     2. MICROGRAVITY FLAME PHYSICS SIMULATOR
     ───────────────────────────────────────────────────────────── */
  const FlameSim = {
    sandboxAnimId: null,
    dualAnimId: null,
    modalAnimId: null,
    earthGravity: false,

    drawFlameOrb(ctx, width, height, opts = {}) {
      const {
        temp = 1650,
        o2 = 30,
        pressure = 10.2,
        spread = 2.0,
        quench = 7.0,
        fuel = 'liquid',
        coolFlame = false,
        isEarth = false,
        airflow = 0,
        time = 0
      } = opts;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + Math.min(20, Math.max(-20, airflow * 10));
      const cy = isEarth ? height * 0.65 : height / 2;
      const oxygenFactor = Math.max(0.2, Math.min(1, o2 / 40));
      const pressureFactor = Math.max(0.75, Math.min(1.25, 10.2 / pressure));
      const intensity = Math.max(0.25, Math.min(1, (temp - 500) / 1500));
      const flicker = Math.sin(time * 0.019) + Math.sin(time * 0.037 + 1.3) * 0.45;
      const baseR = (22 + o2 * 0.17 + (15 - pressure) * 0.45) * oxygenFactor * pressureFactor;
      const r = Math.max(5, baseR + flicker * (coolFlame ? 1.2 : 2.8));
      const quenchRadius = Math.min(r * 1.65 + quench * 2.8, height * 0.47);

      ctx.save();
      ctx.strokeStyle = coolFlame ? 'rgba(78, 205, 196, 0.28)' : 'rgba(255, 107, 53, 0.24)';
      ctx.setLineDash([4, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, quenchRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (isEarth) {
        const baseY = height * 0.9;
        const flameHeight = Math.min(height * 0.78, (58 + r * 1.55) * (0.8 + intensity * 0.35) * (1 + airflow * 0.12));
        const sway = Math.sin(time * 0.018) * (4 + airflow * 3);
        const flameAlpha = o2 < 18 ? 0.24 : 0.65 + intensity * 0.35;
        const gasFuel = fuel === 'gaseous';
        const outerColors = gasFuel
          ? ['rgba(255,245,190,0.95)', 'rgba(255,170,45,0.92)', 'rgba(255,70,20,0.72)', 'rgba(255,60,10,0)']
          : ['rgba(255,250,195,0.98)', 'rgba(255,194,55,0.96)', 'rgba(255,91,20,0.82)', 'rgba(180,28,8,0)'];
        const innerColors = gasFuel
          ? ['rgba(255,255,235,0.95)', 'rgba(255,214,105,0.9)', 'rgba(255,116,32,0)']
          : ['rgba(255,255,235,1)', 'rgba(255,223,105,0.98)', 'rgba(255,144,30,0)'];

        const drawTongue = (offset, widthScale, heightScale, phase, colors) => {
          const tongueWidth = r * widthScale;
          const tongueHeight = flameHeight * heightScale * (1 + Math.sin(time * 0.024 + phase) * 0.07);
          const baseX = cx + offset;
          const tipX = baseX + sway + Math.sin(time * 0.013 + phase) * r * 0.2;
          const tipY = baseY - tongueHeight;
          const gradient = ctx.createLinearGradient(0, baseY, 0, tipY);
          colors.forEach((color, index) => gradient.addColorStop(index / (colors.length - 1), color));

          ctx.beginPath();
          ctx.moveTo(baseX - tongueWidth, baseY);
          ctx.bezierCurveTo(baseX - tongueWidth * 1.25, baseY - tongueHeight * 0.28, tipX - tongueWidth * 0.45, tipY + tongueHeight * 0.3, tipX, tipY);
          ctx.bezierCurveTo(tipX + tongueWidth * 0.4, tipY + tongueHeight * 0.32, baseX + tongueWidth * 1.2, baseY - tongueHeight * 0.22, baseX + tongueWidth, baseY);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        };

        ctx.save();
        ctx.globalAlpha = flameAlpha;
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = gasFuel ? 'rgba(255,150,35,0.65)' : 'rgba(255,82,20,0.7)';
        ctx.shadowBlur = 24 + intensity * 18;
        drawTongue(-r * 0.28, 0.48, 0.68, 1.7, outerColors);
        drawTongue(r * 0.3, 0.42, 0.76, 3.2, outerColors);
        drawTongue(0, 0.82, 1, 0.3, outerColors);
        ctx.shadowBlur = 8;
        drawTongue(0, 0.4, 0.68, 2.4, innerColors);

        for (let i = 0; i < 10; i++) {
          const progress = (time * 0.00035 + i * 0.137) % 1;
          const emberX = cx + Math.sin(time * 0.008 + i * 2.1) * r * 0.8 + sway * progress;
          const emberY = baseY - progress * flameHeight * 1.1;
          ctx.globalAlpha = (1 - progress) * 0.75 * flameAlpha;
          ctx.fillStyle = i % 3 === 0 ? '#fff1b0' : '#ff8b38';
          ctx.beginPath();
          ctx.arc(emberX, emberY, 0.8 + (i % 3) * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else {
        const cool = coolFlame || o2 >= 60;
        const hotSolid = fuel === 'solid' || temp > 1800;
        const pulse = Math.sin(time * (cool ? 0.003 : 0.006)) * (cool ? 2.4 : 1.8);
        const orbRadius = Math.max(5, r + pulse);
        const flameOpacity = o2 < 18 ? 0.28 : Math.min(1, 0.6 + intensity * 0.4);
        const flameRadius = Math.min(orbRadius * 2.25, height * 0.42);
        const gradient = ctx.createRadialGradient(cx - orbRadius * 0.2, cy - orbRadius * 0.25, 2, cx, cy, flameRadius);

        if (cool) {
          gradient.addColorStop(0, 'rgba(240,248,255,0.95)');
          gradient.addColorStop(0.24, 'rgba(160,150,255,0.82)');
          gradient.addColorStop(0.58, 'rgba(74,204,220,0.62)');
          gradient.addColorStop(0.86, 'rgba(24,78,180,0.3)');
          gradient.addColorStop(1, 'rgba(24,78,180,0)');
        } else if (hotSolid) {
          gradient.addColorStop(0, 'rgba(255,255,238,0.98)');
          gradient.addColorStop(0.28, 'rgba(255,224,112,0.9)');
          gradient.addColorStop(0.62, 'rgba(255,111,42,0.72)');
          gradient.addColorStop(0.88, 'rgba(40,128,220,0.38)');
          gradient.addColorStop(1, 'rgba(40,128,220,0)');
        } else {
          gradient.addColorStop(0, 'rgba(245,255,255,0.96)');
          gradient.addColorStop(0.24, 'rgba(100,226,228,0.86)');
          gradient.addColorStop(0.62, 'rgba(28,114,220,0.72)');
          gradient.addColorStop(0.9, 'rgba(255,125,55,0.42)');
          gradient.addColorStop(1, 'rgba(20,78,190,0)');
        }

        ctx.save();
        ctx.globalAlpha = flameOpacity;
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = cool ? 'rgba(95,150,255,0.8)' : 'rgba(58,190,255,0.7)';
        ctx.shadowBlur = 26 + intensity * 20;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const angle = (i / 48) * Math.PI * 2;
          const waviness = 1 + Math.sin(angle * 3 + time * 0.006) * 0.035 + Math.sin(angle * 5 - time * 0.004) * 0.018;
          const radius = flameRadius * waviness;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = cool ? 'rgba(160,210,255,0.28)' : 'rgba(90,220,255,0.26)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbRadius * 1.6, orbRadius * 0.65, time * 0.00025, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.62)';
        ctx.beginPath();
        ctx.arc(cx - orbRadius * 0.12, cy - orbRadius * 0.12, Math.max(2.5, orbRadius * 0.22), 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 9; i++) {
          const angle = time * 0.001 + i * (Math.PI * 2 / 9) + airflow * 0.15;
          const progress = (time * 0.00045 + i * 0.113) % 1;
          const particleRadius = orbRadius * (1.55 + progress * 1.1);
          const alpha = (1 - progress) * 0.72 * flameOpacity;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = cool ? '#7ce9e7' : (i % 2 ? '#ffd16b' : '#8be9ff');
          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * particleRadius, cy + Math.sin(angle) * particleRadius, 1 + (i % 3) * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }
  };

  /* ─────────────────────────────────────────────────────────────
     3. CORE APPLICATION NAMESPACE
     ───────────────────────────────────────────────────────────── */
  const App = {
    Theme: {
      current: 'dark',
      init() {
        let savedTheme = 'dark';
        try {
          savedTheme = window.localStorage.getItem('flame-in-freefall-theme') || 'dark';
        } catch (error) {
          console.warn('[Flame in Freefall] Theme preference could not be read:', error);
        }
        this.apply(savedTheme === 'light' ? 'light' : 'dark');
      },
      toggle() {
        const nextTheme = this.current === 'dark' ? 'light' : 'dark';
        this.apply(nextTheme);
        try {
          window.localStorage.setItem('flame-in-freefall-theme', nextTheme);
        } catch (error) {
          console.warn('[Flame in Freefall] Theme preference could not be saved:', error);
        }
      },
      apply(theme) {
        this.current = theme;
        document.documentElement.dataset.theme = theme;
        const button = document.getElementById('themeToggleBtn');
        const icon = document.getElementById('themeIcon');
        const text = document.getElementById('themeText');
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        if (button) {
          button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
          button.setAttribute('title', `Switch to ${nextTheme} mode`);
          button.setAttribute('aria-pressed', String(theme === 'light'));
        }
        if (icon) icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (text) text.textContent = `${nextTheme.charAt(0).toUpperCase()}${nextTheme.slice(1)} mode`;
        if (window.lucide) App.utils.refreshIcons();
      },
    },

    state: {
      data: null,
      investigations: [],
      scenarios: [],
      filtered: [],
      selectedScenario: 'spacecraft',
      activeCompareScenario: 'spacecraft',
      filters: { search: '', fuel: '', facility: '', airflow: '', gravity: '' },
      compareList: [],
      activeModalId: null,
      loading: true,
      error: null,
      audioEnabled: true,
      isEarthGravity: false,
    },

    Sound,
    FlameSim,
    charts: {},

    scenarioCopy: {
      spacecraft: 'Focus: ISS fire prevention, detection, suppression',
      moon_base:  'Focus: 30%+ O₂ at ≤10.2 psi — 40% more flammable than Earth',
      mars:       'Focus: long-duration mission fire safety',
      rover:      'Focus: pressurized rover atmosphere safety',
      earth:      'Focus: terrestrial spin-offs — water mist, smoke detection',
    },

    earthProductMap: {
      FLEX:     'AquaMist (Marioff) fine-water-mist systems',
      'FLEX-2': 'Advanced water-mist nozzle design',
      BASS:     'NFPA 1971 firefighter thermal protection models',
      'BASS-II':'Firefighter turnout gear thermal standards',
      'SAFFIRE-I': 'EPA air-quality soot/CO models',
      'SAFFIRE-II': 'Spacecraft material screening (NASA-STD-6001)',
      'SAFFIRE-III': 'FDS combustion simulation validation',
      SAME:     'ASTM E162 flammability screening for habitats',
      'SAME-R': 'Artemis-era material screening protocol',
      'ACME-BRE': 'FDS combustion simulation validation',
      'ACME-CFI': 'Early fire detection sensor design',
      'CFI-G':  'Incipient fire detection for oxy-enriched environments',
      SPICE:    'Industrial burner stability (Honeywell)',
      'SPICE-2':'Combustion sensor tuning for smart appliances',
      SLICE:    'Spacecraft cabin material standards',
      'SLICE-2':'3D-printed habitat material standards',
      DAFT:     'Nest Protect V2 smoke-algorithm tuning',
      'DAFT-2': 'Smart smoke-detector ventilation compensation',
      'E-FIELD': 'Electrostatic suppression research (AFRL)',
      'C-FLAME': 'Laminar flame validation for gas appliance design',
    },

    utils: {
      escapeHtml(s) {
        if (s === null || s === undefined) return '';
        return String(s)
          .replace(/&/g, '&amp;').replace(/</g, '&lt;')
          .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      },
      debounce(fn, ms) {
        let t;
        return function (...args) {
          clearTimeout(t);
          t = setTimeout(() => fn.apply(this, args), ms);
        };
      },
      throttle(fn, ms) {
        let last = 0, timer;
        return function (...args) {
          const now = Date.now();
          if (now - last >= ms) { last = now; fn.apply(this, args); }
          else { clearTimeout(timer); timer = setTimeout(() => { last = Date.now(); fn.apply(this, args); }, ms - (now - last)); }
        };
      },
      scoreColor(score) {
        const n = Number(score) || 0;
        if (n < 5) return 'var(--danger)';
        if (n <= 7) return 'var(--warn)';
        return 'var(--ok)';
      },
      countUp(el, target, duration = 900) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = String(target); return;
        }
        const start = performance.now();
        const suffix = typeof target === 'string' && target.endsWith('%') ? '%' : '';
        const numericTarget = typeof target === 'string' ? parseFloat(target) : target;
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(0 + (numericTarget - 0) * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      toast(msg, kind = 'info', ms = 2400) {
        const root = document.getElementById('toastRoot');
        if (!root) return;
        const t = document.createElement('div');
        t.className = `toast toast-${kind}`;
        t.textContent = msg;
        root.appendChild(t);
        setTimeout(() => {
          t.style.opacity = '0';
          t.style.transform = 'translateX(20px)';
          t.style.transition = 'all 260ms ease';
          setTimeout(() => t.remove(), 300);
        }, ms);
      },
      safeArray(v) { return Array.isArray(v) ? v : []; },
      refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          try { window.lucide.createIcons(); } catch (_) {}
        }
      },
      o2RangeText(range) {
        const a = App.utils.safeArray(range);
        if (a.length === 0) return '—';
        return `${a[0]}–${a[1]}% O₂`;
      },
      pressureText(range) {
        const a = App.utils.safeArray(range);
        if (a.length === 0) return '—';
        return `${a[0]}–${a[1]} psi`;
      },
    },

    /* ─────────────────────────────────────────────────────────────
       4. DATA INGESTION & OFFLINE RESILIENCE
       ───────────────────────────────────────────────────────────── */
    async loadData() {
      App.setState({ loading: true, error: null });
      App.renderSkeletons();
      try {
        let json = null;
        try {
          const res = await fetch('data/investigations.json', { cache: 'no-store' });
          if (res.ok) json = await res.json();
        } catch (fetchErr) {
          console.warn('[Flame in Freefall] Fetch failed, checking embedded offline fallback...', fetchErr);
        }

        if (!json && window.EMBEDDED_INVESTIGATIONS_DATA) {
          json = window.EMBEDDED_INVESTIGATIONS_DATA;
          console.log('[Flame in Freefall] Using embedded fallback dataset (100% offline).');
        }

        if (!json) throw new Error('Data could not be fetched and no fallback was found.');

        const inv = App.utils.safeArray(json.investigations).map((it, i) => ({
          id: it.id || `inv-${i}`,
          name: it.name || 'Untitled Investigation',
          short_name: it.short_name || it.id || `INV${i}`,
          description: it.description || '',
          fuel_type: (it.fuel_type || 'unknown').toLowerCase(),
          fuel_material: it.fuel_material || '',
          hardware: it.hardware || '',
          facility: it.facility || '—',
          gravity: it.gravity || '—',
          oxygen_concentration: App.utils.safeArray(it.oxygen_concentration),
          pressure_psi: App.utils.safeArray(it.pressure_psi),
          airflow: it.airflow || '—',
          sensors: App.utils.safeArray(it.sensors),
          objectives: App.utils.safeArray(it.objectives),
          key_findings: App.utils.safeArray(it.key_findings),
          variables: App.utils.safeArray(it.variables),
          relevance: {
            spacecraft: Number(it.relevance?.spacecraft) || 0,
            moon_base:  Number(it.relevance?.moon_base)  || 0,
            mars:       Number(it.relevance?.mars)       || 0,
            rover:      Number(it.relevance?.rover)      || 0,
            earth:      Number(it.relevance?.earth)      || 0,
          },
          earth_application: it.earth_application || '',
          year: Number(it.year) || 0,
          duration_days: Number(it.duration_days) || 0,
          sample_count: Number(it.sample_count) || 0,
          si_summary: it.si_summary || '',
          tags: App.utils.safeArray(it.tags),
          flame_metrics: it.flame_metrics || {
            flame_temp_k: 1650,
            flame_spread_rate_mms: 2.0,
            loc_pct: 15.0,
            quenching_distance_mm: 7.0,
            radiative_fraction_pct: 40,
            soot_volume_fraction_ppm: 1.0,
            smoke_obscuration_od_m: 0.8,
            co_co2_ratio: 0.15,
            critical_heat_flux_kw_m2: 20.0,
            cool_flame_capable: false,
            flame_geometry: 'Spherical Micro-Orb',
            flame_color: 'Dual-Zone Blue Base / Amber Halos',
            fsrl_level: 8,
            extinguishment_method: 'Water Mist'
          }
        }));

        App.setState({
          data: json,
          investigations: inv,
          scenarios: App.utils.safeArray(json.scenarios),
          loading: false,
        });

        App.applyFilters();
        App.renderHeroStats();
        App.renderScenarioBar();
        App.renderFilterOptions();
        App.renderSuggestions();
        App.renderSpinoffs();
        App.renderInnovationLab();
        App.initSandbox();

      } catch (err) {
        console.error('[Flame in Freefall] Load error:', err);
        App.setState({ loading: false, error: err.message || 'Unknown error' });
        App.renderError(err);
      }
    },

    setState(patch) { Object.assign(App.state, patch); },

    applyFilters() {
      const { investigations, filters, selectedScenario } = App.state;
      const q = filters.search.trim().toLowerCase();

      let out = investigations.filter(inv => {
        if (filters.fuel && inv.fuel_type !== filters.fuel) return false;
        if (filters.facility && inv.facility !== filters.facility) return false;
        if (filters.airflow && inv.airflow !== filters.airflow) return false;
        if (filters.gravity && inv.gravity !== filters.gravity) return false;
        if (q) {
          const hay = [inv.name, inv.short_name, inv.description, inv.fuel_material,
            inv.facility, inv.airflow, inv.gravity, inv.earth_application,
            inv.tags.join(' '), inv.flame_metrics?.flame_geometry, inv.flame_metrics?.flame_color].join(' ').toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      out.sort((a, b) => {
        const ra = a.relevance[selectedScenario] || 0;
        const rb = b.relevance[selectedScenario] || 0;
        if (rb !== ra) return rb - ra;
        if (b.sample_count !== a.sample_count) return b.sample_count - a.sample_count;
        return b.year - a.year;
      });

      App.state.filtered = out;
      App.renderCards();
      App.renderResultCount();
      App.renderCharts();
      App.renderCompareBar();
      App.renderScenarioContext();
      App.renderInnovationLab();
      App.updateSandboxVerdict();
    },

    renderHeroStats() {
      const list = App.state.investigations;
      const totalSamples = list.reduce((s, i) => s + i.sample_count, 0);
      const maxO2 = list.reduce((m, i) => Math.max(m, i.oxygen_concentration[1] || 0), 0);
      const years = list.map(i => i.year).filter(y => y > 0);
      const span = years.length ? Math.max(...years) - Math.min(...years) + 1 : 0;
      const pills = document.querySelectorAll('#statPills .stat-num');
      if (pills[0]) App.utils.countUp(pills[0], list.length);
      if (pills[1]) App.utils.countUp(pills[1], totalSamples);
      if (pills[2]) App.utils.countUp(pills[2], maxO2 + '%');
      if (pills[3]) App.utils.countUp(pills[3], span);
    },

    renderScenarioBar() {
      const wrap = document.getElementById('scenarioPills');
      if (!wrap) return;
      const { scenarios, selectedScenario } = App.state;
      wrap.innerHTML = scenarios.map(s => `
        <button class="scenario-pill" role="tab"
          aria-selected="${s.id === selectedScenario}"
          data-action="select-scenario" data-scenario="${App.utils.escapeHtml(s.id)}">
          <i data-lucide="${App.utils.escapeHtml(s.icon || 'circle')}" aria-hidden="true"></i>
          ${App.utils.escapeHtml(s.label)}
        </button>
      `).join('');

      const analyticsMission = document.getElementById('analyticsScenarioSelect');
      if (analyticsMission) {
        analyticsMission.innerHTML = scenarios.map(s =>
          `<option value="${App.utils.escapeHtml(s.id)}">${App.utils.escapeHtml(s.label)}</option>`
        ).join('');
        analyticsMission.value = selectedScenario;
      }

      const quickScenName = document.getElementById('quickScenName');
      if (quickScenName) {
        const curScen = scenarios.find(s => s.id === selectedScenario);
        quickScenName.textContent = curScen ? curScen.label : 'Mission';
      }

      App.renderScenarioContext();
      App.utils.refreshIcons();
    },

    selectScenario(scenarioId) {
      if (!App.state.scenarios.some(s => s.id === scenarioId) || scenarioId === App.state.selectedScenario) return;
      App.Sound.click();
      App.state.selectedScenario = scenarioId;
      document.querySelectorAll('.scenario-pill').forEach(button => {
        button.setAttribute('aria-selected', button.getAttribute('data-scenario') === scenarioId ? 'true' : 'false');
      });
      const analyticsMission = document.getElementById('analyticsScenarioSelect');
      if (analyticsMission) analyticsMission.value = scenarioId;
      const quickScenName = document.getElementById('quickScenName');
      if (quickScenName) {
        const selected = App.state.scenarios.find(s => s.id === scenarioId);
        quickScenName.textContent = selected ? selected.label : 'Mission';
      }
      App.applyFilters();
    },

    renderScenarioContext() {
      const el = document.getElementById('scenarioContext');
      if (!el) return;
      el.textContent = App.scenarioCopy[App.state.selectedScenario] || '';
    },

    renderFilterOptions() {
      const list = App.state.investigations;
      const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();
      const fill = (id, opts, allLabel) => {
        const sel = document.getElementById(id);
        if (!sel) return;
        const current = sel.value;
        sel.innerHTML = `<option value="">${allLabel}</option>` +
          opts.map(o => `<option value="${App.utils.escapeHtml(o)}">${App.utils.escapeHtml(o)}</option>`).join('');
        if (opts.includes(current)) sel.value = current;
      };
      fill('fuelFilter', uniq(list.map(i => i.fuel_type)), 'All fuel types');
      fill('facilityFilter', uniq(list.map(i => i.facility)), 'All facilities');
      fill('airflowFilter', uniq(list.map(i => i.airflow)), 'All airflow');
      fill('gravityFilter', uniq(list.map(i => i.gravity)), 'All gravity');
    },

    renderResultCount() {
      const el = document.getElementById('resultCount');
      if (!el) return;
      el.textContent = `Showing ${App.state.filtered.length} of ${App.state.investigations.length} investigations`;
    },

    renderSkeletons() {
      const grid = document.getElementById('cardGrid');
      if (!grid) return;
      grid.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton"></div>').join('');
      document.getElementById('cardsRegion').setAttribute('aria-busy', 'true');
      document.getElementById('emptyState')?.classList.add('hidden');
      document.getElementById('errorState')?.classList.add('hidden');
    },

    /* ─────────────────────────────────────────────────────────────
       5. INVESTIGATION CARDS WITH RICH FLAME METRICS
       ───────────────────────────────────────────────────────────── */
    renderCards() {
      const grid = document.getElementById('cardGrid');
      const empty = document.getElementById('emptyState');
      const error = document.getElementById('errorState');
      const region = document.getElementById('cardsRegion');
      if (!grid) return;
      if (App.state.error) { grid.innerHTML = ''; empty?.classList.add('hidden'); error?.classList.remove('hidden'); region.setAttribute('aria-busy', 'false'); return; }
      error?.classList.add('hidden');
      const list = App.state.filtered;
      if (list.length === 0) {
        grid.innerHTML = ''; empty?.classList.remove('hidden');
        region.setAttribute('aria-busy', 'false'); return;
      }
      empty?.classList.add('hidden');
      const scen = App.state.selectedScenario;

      grid.innerHTML = list.map((inv, idx) => {
        const score = inv.relevance[scen] || 0;
        const pct = Math.max(0, Math.min(100, score * 10));
        const color = App.utils.scoreColor(score);
        const isCompared = App.state.compareList.includes(inv.id);
        const fm = inv.flame_metrics || {};

        return `
          <article class="inv-card" data-id="${App.utils.escapeHtml(inv.id)}">
            <span class="rank-badge" aria-label="Rank ${idx + 1}">#${idx + 1}</span>
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem">
                <h3 class="inv-title">${App.utils.escapeHtml(inv.name)}</h3>
                <span class="fsrl-pill" title="Flight Safety Readiness Level">FSRL-${fm.fsrl_level || 8}</span>
              </div>
              <div class="inv-short">${App.utils.escapeHtml(inv.short_name)} · ${inv.year}</div>
            </div>
            <p class="inv-desc">${App.utils.escapeHtml(inv.description.slice(0, 135))}${inv.description.length > 135 ? '…' : ''}</p>
            
            <!-- Scientific Flame Values Grid -->
            <div class="card-flame-stats">
              <div class="flame-stat-pill" title="Peak Flame Temperature">
                <span class="lbl">Flame Temp</span>
                <span class="val" style="color:#ff9966">🔥 ${fm.flame_temp_k} K</span>
              </div>
              <div class="flame-stat-pill" title="Flame Spread Rate in Microgravity">
                <span class="lbl">Spread Rate</span>
                <span class="val">⚡ ${fm.flame_spread_rate_mms} mm/s</span>
              </div>
              <div class="flame-stat-pill pill-highlight" title="Limiting Oxygen Concentration (Self-extinction threshold)">
                <span class="lbl">LOC Margin</span>
                <span class="val">🛡️ ${fm.loc_pct}%</span>
              </div>
              <div class="flame-stat-pill" title="Microgravity Quenching Distance">
                <span class="lbl">Quenching</span>
                <span class="val">💧 ${fm.quenching_distance_mm} mm</span>
              </div>
            </div>

            <div class="chips">
              <span class="chip chip-flame">${App.utils.escapeHtml(inv.fuel_type)}</span>
              <span class="chip">${App.utils.escapeHtml(inv.facility)}</span>
              <span class="chip chip-accent">${App.utils.escapeHtml(App.utils.o2RangeText(inv.oxygen_concentration))}</span>
              ${fm.cool_flame_capable ? `<span class="chip chip-cool">❄️ Cool Flame</span>` : ''}
            </div>

            <div class="relevance-bar-wrap" aria-label="Relevance score ${score} of 10">
              <div class="relevance-bar"><div class="relevance-fill" style="width:${pct}%;background:${color}"></div></div>
              <span class="relevance-num" style="color:${color}">${score}/10</span>
            </div>

            <div class="card-actions">
              <button class="btn btn-primary" data-action="view-details" data-id="${App.utils.escapeHtml(inv.id)}">Details</button>
              <button class="btn btn-ghost btn-compare ${isCompared ? 'active' : ''}"
                data-action="toggle-compare" data-id="${App.utils.escapeHtml(inv.id)}"
                aria-pressed="${isCompared}">
                ${isCompared ? 'Selected' : 'Compare'}
              </button>
              <button class="btn btn-ghost" data-action="auto-pair-from-card" data-id="${App.utils.escapeHtml(inv.id)}" title="Auto-pair with closest rival">
                <i data-lucide="zap" style="width:13px;height:13px;color:var(--accent-cyan)"></i> Rival
              </button>
            </div>
          </article>
        `;
      }).join('');
      region.setAttribute('aria-busy', 'false');
      App.utils.refreshIcons();
    },

    renderError(err) {
      const grid = document.getElementById('cardGrid');
      const error = document.getElementById('errorState');
      const msg = document.getElementById('errorMsg');
      if (grid) grid.innerHTML = '';
      if (msg) msg.textContent = `Fetch failed: ${err?.message || 'unknown error'}. If you opened index.html directly (file://), start a local server: python -m http.server 8000 — then visit http://localhost:8000.`;
      error?.classList.remove('hidden');
      document.getElementById('emptyState')?.classList.add('hidden');
      document.getElementById('cardsRegion').setAttribute('aria-busy', 'false');
    },

    renderInnovationLab() {
      App.renderGapAnalysis();
      App.renderPriorityEngine();
      App.renderCoverageMap();
      App.renderDesignRecs();
    },

    renderGapAnalysis() {
      const el = document.getElementById('gapAnalysis');
      if (!el) return;
      const list = App.state.investigations;
      const scen = App.state.selectedScenario;
      const gaps = [];

      const highO2 = list.filter(i => (i.oxygen_concentration[1] || 0) > 40);
      if (highO2.length === 0) {
        gaps.push({
          label: 'CRITICAL GAP',
          text: 'No investigation tests above 40% O₂ — but lunar habitats use 30%+ and spacesuits use 100% O₂. Ignition limits in this regime are unvalidated.',
        });
      } else if (highO2.length < 3) {
        gaps.push({
          label: 'THIN COVERAGE',
          text: `Only ${highO2.length} investigation(s) test above 40% O₂ (${highO2.map(i => i.short_name).join(', ')}). Lunar habitat design needs a broader envelope.`,
        });
      }

      const solidHighO2 = list.filter(i => i.fuel_type === 'solid' && (i.oxygen_concentration[1] || 0) > 30);
      if (solidHighO2.length === 0) {
        gaps.push({
          label: 'SOLID FUEL BLIND SPOT',
          text: 'No solid-fuel experiment exceeds 30% O₂. Since habitat materials are solid, their flammability at lunar conditions is extrapolated — not measured.',
        });
      }

      const lunarLike = list.filter(i =>
        (i.oxygen_concentration[1] || 0) >= 30 &&
        (i.pressure_psi[0] || 99) <= 10.2
      );
      if (lunarLike.length < 2) {
        gaps.push({
          label: 'LUNAR ENVELOPE',
          text: `Only ${lunarLike.length} experiment(s) sample the exact lunar envelope (≥30% O₂ AND ≤10.2 psi). This is the single biggest blind spot for Artemis.`,
        });
      }

      const coolFlames = list.filter(i => i.tags.some(t => /cool flame/i.test(t)) || i.flame_metrics?.cool_flame_capable);
      if (coolFlames.length <= 1) {
        gaps.push({
          label: 'UNDER-RESEARCHED',
          text: 'Cool-flame phenomena have limited datasets. Their role in incipient ignition at high O₂ is still unclear.',
        });
      }

      if (scen === 'mars' && list.filter(i => i.duration_days > 180).length === 0) {
        gaps.push({
          label: 'DURATION GAP',
          text: 'No experiment in the current set exceeds 180 days. Mars missions run 900+ days — long-duration material degradation is untested.',
        });
      }

      if (gaps.length === 0) {
        el.innerHTML = `<div class="gap-item gap-ok"><strong>WELL COVERED</strong><p>Current dataset has no critical gaps for this scenario. Coverage looks strong across fuel types, O₂ range, and pressure.</p></div>`;
        return;
      }

      el.innerHTML = gaps.slice(0, 4).map(g => `
        <div class="gap-item">
          <strong>${App.utils.escapeHtml(g.label)}</strong>
          <p>${App.utils.escapeHtml(g.text)}</p>
        </div>
      `).join('');
    },

    renderPriorityEngine() {
      const el = document.getElementById('priorityEngine');
      if (!el) return;
      const list = App.state.investigations;

      const candidates = [
        { title: 'High-O₂ (≥60%) solid-fuel ignition at lunar pressure', why: 'Closes the single biggest gap for lunar habitats — no existing data above 40% O₂ for solids.', gapScore: 9.5, novelty: 8 },
        { title: 'Mixed-flow flame spread at 30% O₂ / 10 psi', why: 'Lunar habitats will have convective airflow from life-support. Current data is mostly forced or still.', gapScore: 8.5, novelty: 7 },
        { title: 'Cool-flame → hot-flame transition at 85% O₂', why: 'Extends CFI-G to determine whether cool flames can spontaneously transition — critical for early detection.', gapScore: 8, novelty: 9 },
        { title: '900-day material degradation at Mars transit conditions', why: 'No existing experiment exceeds 180 days. Long-duration Mars transit materials are untested.', gapScore: 8, novelty: 8 },
        { title: 'Aerosol transport in reduced-gravity rover cabins', why: 'DAFT studied still-air plumes, but rover cabins have forced ventilation + variable gravity.', gapScore: 6.5, novelty: 6 },
      ];

      const scen = App.state.selectedScenario;
      const avgRelevance = list.length
        ? list.reduce((s, i) => s + (i.relevance[scen] || 0), 0) / list.length
        : 5;

      candidates.forEach(c => {
        c.score = (c.gapScore * 0.5) + (avgRelevance * 0.3) + (c.novelty * 0.2);
      });
      candidates.sort((a, b) => b.score - a.score);

      el.innerHTML = candidates.slice(0, 3).map((c, i) => `
        <div class="priority-item">
          <span class="priority-num">${i + 1}</span>
          <div class="priority-body">
            <h4>${App.utils.escapeHtml(c.title)}</h4>
            <p>${App.utils.escapeHtml(c.why)}</p>
            <span class="priority-score">Priority score: ${c.score.toFixed(1)} / 10</span>
          </div>
        </div>
      `).join('');
    },

    renderCoverageMap() {
      const el = document.getElementById('coverageMap');
      if (!el) return;
      const { scenarios, investigations } = App.state;

      el.innerHTML = scenarios.map(s => {
        const avg = investigations.length
          ? investigations.reduce((sum, i) => sum + (i.relevance[s.id] || 0), 0) / investigations.length
          : 0;
        const pct = Math.round(avg * 10);
        const color = pct >= 70 ? 'var(--ok)' : pct >= 50 ? 'var(--warn)' : 'var(--danger)';
        return `
          <div class="coverage-row">
            <span class="coverage-label">${App.utils.escapeHtml(s.label)}</span>
            <div class="coverage-bar-wrap">
              <div class="coverage-bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
            <span class="coverage-value" style="color:${color}">${pct}%</span>
          </div>
        `;
      }).join('');
    },

    renderDesignRecs() {
      const el = document.getElementById('designRecs');
      if (!el) return;
      const scen = App.state.selectedScenario;
      const scenLabel = App.state.scenarios.find(s => s.id === scen)?.label || scen;

      const recs = {
        moon_base: {
          suppression: 'Fine water mist (50–100 μm droplets) — validated by FLEX + FLEX-2. CO₂ suppression is NOT recommended: cool flames persist under CO₂ at 30%+ O₂ (CFI-G data).',
          detection: 'Multi-modal detection required: optical particle + CO + thermal. DAFT shows smoke follows diffusion, not buoyancy — detector placement must anticipate non-buoyant plumes.',
          materials: 'AVOID cotton and fiberglass blends above 30% O₂ (SAME + SAME-R). Verify all 3D-printed habitat polymers at lunar spec — SLICE-2 found 30% lower ignition energy.',
        },
        spacecraft: {
          suppression: 'Water mist with directed nozzle — BASS-II validated across 9 cabin materials. Test nozzle geometry per Saffire-II material ranking.',
          detection: 'Smoke detectors must handle low-velocity transport (Saffire-I). Position away from heat sources — hot gas does NOT rise in microgravity (DAFT).',
          materials: 'Follow NASA-STD-6001 based on Saffire-II rankings. Cotton blends highest risk; fiberglass lowest. Revalidate any new material at cabin conditions.',
        },
        mars: {
          suppression: 'Long-duration system reliability is untested. Plan consumable-free electrostatic suppression (E-FIELD) as backup for 900+ day missions.',
          detection: 'Multi-modal with radiation-tolerant sensors. Standard detectors degrade over 3-year transit (inferred from SAME low-pressure data).',
          materials: 'Long-duration degradation data is the biggest gap — no experiment exceeds 180 days. Prioritize hermetic sealing and pre-flight radiation testing.',
        },
        rover: {
          suppression: 'Compact water-mist units sized from FLEX droplet data. Forced ventilation means flow-directed suppression works — unlike free-fall habitats.',
          detection: 'Use DAFT-2 flow-compensated algorithms. Ventilation changes smoke behavior by 60% — fixed-threshold detectors will fail.',
          materials: 'Rover cabins are small and sealed — Saffire-II ranking applies. Avoid high-soot materials to reduce air-recycling load.',
        },
        earth: {
          suppression: 'Fine-water-mist extinguishers (AquaMist by Marioff) already commercialized from FLEX data. Adopt for server rooms and museum fire suppression.',
          detection: 'DAFT-2 flow-compensated algorithms are used in Nest Protect V2 and other smart detectors. Firefighters can benefit from diffusion-model placement guidelines.',
          materials: 'NFPA 1971 firefighter turnout gear uses BASS-derived thermal models. Continue cross-referencing space and terrestrial material screening.',
        },
      };

      const r = recs[scen] || recs.spacecraft;

      el.innerHTML = `
        <div class="design-recs-inner">
          <div class="design-scenario-tag">
            <i data-lucide="target" style="width:12px;height:12px;vertical-align:-2px"></i>
            ${App.utils.escapeHtml(scenLabel)}
          </div>

          <div class="design-rec-item">
            <span class="design-rec-icon">💧</span>
            <div>
              <h4>Suppression System</h4>
              <p>${App.utils.escapeHtml(r.suppression)}</p>
            </div>
          </div>

          <div class="design-rec-item">
            <span class="design-rec-icon">🔔</span>
            <div>
              <h4>Detector Placement</h4>
              <p>${App.utils.escapeHtml(r.detection)}</p>
            </div>
          </div>

          <div class="design-rec-item">
            <span class="design-rec-icon">🧱</span>
            <div>
              <h4>Material Selection</h4>
              <p>${App.utils.escapeHtml(r.materials)}</p>
            </div>
          </div>

          <p class="design-recs-footer">Based on 20 NASA experiments in current dataset.</p>
        </div>
      `;
      App.utils.refreshIcons();
    },

    /* ─────────────────────────────────────────────────────────────
       6. PREDICTIVE FIRE MODEL & REAL-TIME FLAME SIMULATOR
       ───────────────────────────────────────────────────────────── */
    initSandbox() {
      const o2 = document.getElementById('sandboxO2');
      const press = document.getElementById('sandboxPressure');
      const airflow = document.getElementById('sandboxAirflow');
      const fuel = document.getElementById('sandboxFuel');
      const o2Val = document.getElementById('sandboxO2Val');
      const pressVal = document.getElementById('sandboxPressureVal');
      const airflowVal = document.getElementById('sandboxAirflowVal');
      if (!o2 || !press || !airflow || !fuel) return;

      const update = () => {
        o2Val.textContent = o2.value + '%';
        pressVal.textContent = parseFloat(press.value).toFixed(1) + ' psi';
        airflowVal.textContent = parseFloat(airflow.value).toFixed(1) + ' m/s';
        App.updateSandboxVerdict();
      };
      o2.addEventListener('input', update);
      press.addEventListener('input', update);
      airflow.addEventListener('input', update);
      fuel.addEventListener('change', update);
      update();

      App.startSandboxFlameLoop();
    },

    resetSandbox() {
      document.getElementById('sandboxO2').value = '30';
      document.getElementById('sandboxPressure').value = '10.2';
      document.getElementById('sandboxAirflow').value = '0.2';
      document.getElementById('sandboxFuel').value = 'liquid';
      App.state.isEarthGravity = false;
      const gravityText = document.getElementById('gravityModeText');
      if (gravityText) gravityText.textContent = 'View Earth 1G';
      document.getElementById('sandboxO2').dispatchEvent(new Event('input', { bubbles: true }));
      App.Sound.click();
      App.utils.toast('Simulation reset to default conditions', 'info');
    },

    startSandboxFlameLoop() {
      const canvas = document.getElementById('sandboxFlameCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const render = (time) => {
        const o2 = Number(document.getElementById('sandboxO2')?.value || 30);
        const pressure = Number(document.getElementById('sandboxPressure')?.value || 10.2);
        const airflow = Number(document.getElementById('sandboxAirflow')?.value || 0);
        const fuel = document.getElementById('sandboxFuel')?.value || 'liquid';
        const isCool = o2 >= 60;

        let temp = 1650;
        if (o2 < 18) temp = 950;
        else if (isCool) temp = 680;
        else if (o2 >= 30 && pressure <= 10.3) temp = 1880;
        else if (fuel === 'solid') temp = 1780;

        const radLoss = isCool ? 55 : (o2 >= 30 ? 42 : 38);

        App.FlameSim.drawFlameOrb(ctx, canvas.width, canvas.height, {
          temp,
          o2,
          pressure,
          spread: fuel === 'solid' ? 3.2 : 1.4,
          quench: isCool ? 11.5 : 7.2,
          fuel,
          coolFlame: isCool,
          isEarth: App.state.isEarthGravity,
          airflow,
          time
        });

        const tempEl = document.getElementById('flameSimTemp');
        const radEl = document.getElementById('flameSimRad');
        const airflowEl = document.getElementById('flameSimAirflow');
        const tagEl = document.getElementById('sandboxFlameTag');
        if (tempEl) tempEl.textContent = `Temp: ~${temp} K`;
        if (radEl) radEl.textContent = `Radiative Loss: ~${radLoss}%`;
        if (airflowEl) airflowEl.textContent = `Airflow: ${airflow.toFixed(1)} m/s`;
        if (tagEl) {
          if (App.state.isEarthGravity) tagEl.textContent = '1G Buoyant Teardrop';
          else if (o2 < 18) tagEl.textContent = 'Extinction Quenched';
          else if (isCool) tagEl.textContent = 'Chemiluminescent Cool Flame';
          else if (o2 >= 30) tagEl.textContent = 'High-Intensity Spherical Orb';
          else tagEl.textContent = 'Spherical Blue Micro-Orb';
        }

        App.FlameSim.sandboxAnimId = requestAnimationFrame(render);
      };

      if (App.FlameSim.sandboxAnimId) cancelAnimationFrame(App.FlameSim.sandboxAnimId);
      App.FlameSim.sandboxAnimId = requestAnimationFrame(render);
    },

    toggleGravity() {
      App.state.isEarthGravity = !App.state.isEarthGravity;
      App.Sound.click();
      const txt = document.getElementById('gravityModeText');
      if (txt) txt.textContent = App.state.isEarthGravity ? 'View Microgravity 0G' : 'View Earth 1G';
      App.utils.toast(App.state.isEarthGravity ? 'Switched to 1G (Earth Buoyant Convection)' : 'Switched to 0G (Spherical Microgravity)', 'info');
    },

    updateSandboxVerdict() {
      const el = document.getElementById('sandboxVerdict');
      const o2El = document.getElementById('sandboxO2');
      const pressEl = document.getElementById('sandboxPressure');
      const airflowEl = document.getElementById('sandboxAirflow');
      const fuelEl = document.getElementById('sandboxFuel');
      if (!el || !o2El || !pressEl || !airflowEl || !fuelEl) return;

      const o2 = Number(o2El.value);
      const pressure = Number(pressEl.value);
      const airflow = Number(airflowEl.value);
      const fuel = fuelEl.value;

      let verdict, tag, cls, confidence, reason, source;

      if (o2 >= 30 && pressure <= 10.3) {
        verdict = 'Flame will propagate. High combustion intensity expected.';
        tag = 'HIGH RISK';
        cls = 'verdict-danger';
        confidence = 88 + Math.min(8, Math.round((o2 - 30) / 6));
        reason = 'Lunar habitat envelope: oxygen enrichment above 30% at reduced pressure dramatically lowers ignition energy.';
        source = 'SAME (2019) + CFI-G (2021)';
      }
      else if (o2 >= 60) {
        verdict = 'Cool-flame regime — spontaneous ignition likely.';
        tag = 'CRITICAL';
        cls = 'verdict-danger';
        confidence = 92;
        reason = 'Cool flames observed stable at 85% O₂. Incipient fires are invisible to standard IR sensors.';
        source = 'CFI-G (2021)';
      }
      else if (Math.abs(o2 - 21) <= 3 && pressure >= 13) {
        verdict = 'Normal Earth-like behaviour. Well-characterised by FLEX/BASS data.';
        tag = 'BASELINE';
        cls = 'verdict-ok';
        confidence = 95;
        reason = 'Matches ISS cabin atmosphere (21% O₂, 14.7 psi). Extensively studied.';
        source = 'FLEX (2012) + BASS (2012)';
      }
      else if (o2 < 18) {
        verdict = 'Flame will extinguish. Below minimum oxygen for sustained combustion.';
        tag = 'EXTINCTION';
        cls = 'verdict-ok';
        confidence = 90;
        reason = 'Extinction data shows flame-out below 18% O₂ for most fuels via radiative heat loss.';
        source = 'FLEX (2012)';
      }
      else if (airflow >= 1.2 && o2 >= 21) {
        verdict = 'Higher airflow may increase oxygen supply and flame spread.';
        tag = 'AIRFLOW CAUTION';
        cls = 'verdict-warn';
        confidence = 65;
        reason = 'This airflow response is an illustrative extension and should be validated against primary experiment data.';
        source = 'Illustrative airflow model';
      }
      else if (fuel === 'solid' && o2 >= 25) {
        verdict = 'Solid fuel will propagate. Flame spread rate rises sharply with O₂.';
        tag = 'ELEVATED RISK';
        cls = 'verdict-warn';
        confidence = 78;
        reason = 'Solids sustain flame at low airflow above 25% O₂.';
        source = 'BASS (2012) + SAME (2019)';
      } else if (fuel === 'liquid' && o2 < 25) {
        verdict = 'Liquid fuel may extinguish via radiative losses.';
        tag = 'MODERATE';
        cls = 'verdict-warn';
        confidence = 70;
        reason = 'Droplet flames extinguish at low strain rate + low O₂.';
        source = 'FLEX (2012)';
      }
      else {
        verdict = 'Flame will likely propagate but may extinguish at low strain.';
        tag = 'MODERATE';
        cls = 'verdict-warn';
        confidence = 72;
        reason = 'Interpolated from adjacent test conditions; needs verification.';
        source = 'Multiple experiments';
      }

      el.className = `sandbox-verdict ${cls}`;
      el.innerHTML = `
        <span class="verdict-tag">${tag}</span>
        <div>${App.utils.escapeHtml(verdict)}</div>
        <span class="verdict-confidence">Confidence ${confidence}% — ${App.utils.escapeHtml(reason)}</span>
        <span class="verdict-source">Source: ${App.utils.escapeHtml(source)}</span>
      `;
    },

    /* ─────────────────────────────────────────────────────────────
       7. NASA MULTI-CRITERIA AUTO-DECIDE ENGINE
       ───────────────────────────────────────────────────────────── */
    autoDecide(a, b, scenarioId = App.state.selectedScenario) {
      function calculateSafetyIndex(inv) {
        const m = inv.flame_metrics || {};
        let score = 50;

        // 1. Mission relevance weight (20 points)
        const rel = (inv.relevance[scenarioId] || 5);
        score += (rel - 5) * 3.0;

        // 2. Extinguishment & Boundary Quenching Feasibility (25 points)
        const quench = Number(m.quenching_distance_mm) || 6.5;
        score += (quench - 6.5) * 2.2;

        const loc = Number(m.loc_pct) || 15.0;
        score += (loc - 15.0) * 1.6;

        // 3. Crew Toxicity & ECLSS Filter Health (25 points)
        const coRatio = Number(m.co_co2_ratio) || 0.15;
        score -= (coRatio - 0.15) * 32.0;

        const soot = Number(m.soot_volume_fraction_ppm) || 1.0;
        score -= (soot - 1.0) * 4.2;

        const smoke = Number(m.smoke_obscuration_od_m) || 0.8;
        score -= (smoke - 0.8) * 8.5;

        // 4. Spread Kinetics & Thermal Heat Load (20 points)
        const spread = Number(m.flame_spread_rate_mms) || 2.5;
        score -= (spread - 2.5) * 2.4;

        const chf = Number(m.critical_heat_flux_kw_m2) || 18.0;
        score += (chf - 18.0) * 0.75;

        const temp = Number(m.flame_temp_k) || 1700;
        if (temp > 1850) score -= (temp - 1850) * 0.035;

        // 5. Scenario Specific Fine-Tuning
        if (scenarioId === 'moon_base') {
          // Lunar Habitat: 30%+ O2 at <=10.2 psi
          if (m.cool_flame_capable) score -= 3; // cool-flame stealth risk
          const maxO2 = inv.oxygen_concentration[1] || 21;
          const minP = inv.pressure_psi[0] || 14.7;
          if (maxO2 >= 30) score += 6;
          if (minP <= 10.2) score += 5;
        } else if (scenarioId === 'spacecraft') {
          if (inv.facility === 'CIR' || inv.facility === 'MSG') score += 4;
          if (inv.sample_count >= 30) score += 3;
        } else if (scenarioId === 'mars') {
          if (inv.id === 'E-FIELD') score += 8;
          if (soot < 0.5) score += 5;
        } else if (scenarioId === 'rover') {
          if (smoke < 0.5) score += 6;
          else score -= 5;
        } else if (scenarioId === 'earth') {
          if (inv.earth_application) score += 8;
        }

        return Math.max(14, Math.min(98, Math.round(score * 10) / 10));
      }

      const scoreA = calculateSafetyIndex(a);
      const scoreB = calculateSafetyIndex(b);
      const winner = scoreA >= scoreB ? a : b;
      const runnerUp = scoreA >= scoreB ? b : a;
      const winScore = Math.max(scoreA, scoreB);
      const loseScore = Math.min(scoreA, scoreB);
      const margin = Math.round((winScore - loseScore) * 10) / 10;

      const mA = winner.flame_metrics || {};
      const mB = runnerUp.flame_metrics || {};
      const reasons = [];

      // Physical delta analysis
      if (mA.quenching_distance_mm > mB.quenching_distance_mm) {
        const pct = Math.round(((mA.quenching_distance_mm - mB.quenching_distance_mm) / mB.quenching_distance_mm) * 100);
        reasons.push(`🛡️ <strong>Superior Boundary Quenching:</strong> ${mA.quenching_distance_mm} mm vs ${mB.quenching_distance_mm} mm (+${pct}% margin). Flame extinguishes through standard cabin avionics mesh without active chemical agents.`);
      }
      if (mA.soot_volume_fraction_ppm < mB.soot_volume_fraction_ppm) {
        const pct = Math.round(((mB.soot_volume_fraction_ppm - mA.soot_volume_fraction_ppm) / mB.soot_volume_fraction_ppm) * 100);
        reasons.push(`💨 <strong>Reduced Particulate Soot:</strong> ${mA.soot_volume_fraction_ppm} ppm vs ${mB.soot_volume_fraction_ppm} ppm (-${pct}% soot load). Significantly preserves ECLSS catalytic beds and HEPA scrubbers.`);
      }
      if (mA.flame_spread_rate_mms < mB.flame_spread_rate_mms) {
        const factor = (mB.flame_spread_rate_mms / mA.flame_spread_rate_mms).toFixed(1);
        reasons.push(`⚡ <strong>Controlled Flame Propagation:</strong> Spreads at ${mA.flame_spread_rate_mms} mm/s vs ${mB.flame_spread_rate_mms} mm/s (${factor}x slower). Extends the emergency containment window for crew intervention.`);
      }
      if (mA.critical_heat_flux_kw_m2 > mB.critical_heat_flux_kw_m2) {
        reasons.push(`🔥 <strong>Higher Ignition Resistance:</strong> Requires ${mA.critical_heat_flux_kw_m2} kW/m² critical heat flux vs ${mB.critical_heat_flux_kw_m2} kW/m² to initiate combustion.`);
      }
      if (mA.co_co2_ratio < mB.co_co2_ratio) {
        reasons.push(`☣️ <strong>Lower Toxic Carbon Monoxide:</strong> CO/CO₂ ratio of ${mA.co_co2_ratio} vs ${mB.co_co2_ratio} dramatically mitigates astronaut inhalation and neurotoxic incapacitation.`);
      }
      if (reasons.length < 2) {
        reasons.push(`📊 <strong>Flight Calibration Maturity:</strong> Evaluated across ${winner.sample_count} samples over ${winner.duration_days} mission days.`);
      }

      let tradeOff = '';
      if (mA.cool_flame_capable) {
        tradeOff = `Exhibits low-temperature cool flame persistence (~${mA.flame_temp_k} K). Requires dedicated UV/chemiluminescent optical sensors (430 nm CH* filter), as standard thermal detectors will fail to register incipient reaction.`;
      } else if (mA.radiative_fraction_pct > 40) {
        tradeOff = `Elevated radiative heat fraction (${mA.radiative_fraction_pct}%). Requires reflective thermal insulation barriers behind adjacent avionics backplanes.`;
      } else if (mA.smoke_obscuration_od_m > 1.0) {
        tradeOff = `Optical smoke density (${mA.smoke_obscuration_od_m} OD/m) may degrade emergency cabin lighting visibility; tie localized ventilation shutoffs directly to fire trip lines.`;
      } else {
        tradeOff = `Suppression requires strict adherence to ${mA.extinguishment_method}. Verify nozzle spray coverage matches microgravity droplet dispersion dynamics.`;
      }

      const scenLabel = App.state.scenarios.find(s => s.id === scenarioId)?.label || scenarioId;
      const directive = `Prescribe <strong>${winner.short_name}</strong> baseline for ${scenLabel} architecture. Implement ${mA.extinguishment_method} and calibrate detector thresholds to the ${mA.flame_geometry} profile.`;

      return {
        winner,
        runnerUp,
        scoreA,
        scoreB,
        winScore,
        loseScore,
        margin,
        reasons,
        tradeOff,
        directive,
        scenarioLabel: scenLabel
      };
    },

    /* ─────────────────────────────────────────────────────────────
       8. ADVANCED COMPARISON MODAL & DUAL FLAME SIMULATOR
       ───────────────────────────────────────────────────────────── */
    toggleCompare(id) {
      const list = App.state.compareList;
      const idx = list.indexOf(id);
      if (idx >= 0) {
        list.splice(idx, 1);
        App.Sound.click();
        App.utils.toast('Removed from comparison', 'warn');
      } else {
        if (list.length >= 2) {
          App.utils.toast('Max 2 for side-by-side Auto-Decide — remove one first', 'warn');
          return;
        }
        list.push(id);
        App.Sound.click();
        App.utils.toast('Added to comparison', 'info');
      }
      App.renderCards();
      App.renderCompareBar();
    },

    renderCompareBar() {
      const bar = document.getElementById('compareBar');
      const text = document.getElementById('compareBarText');
      const btn = document.getElementById('compareBtn');
      const autoPairBtn = document.getElementById('autoPairBtn');
      if (!bar || !text || !btn) return;
      if (App.state.compareList.length === 0) { bar.hidden = true; return; }
      bar.hidden = false;
      text.textContent = `${App.state.compareList.length} selected (max 2)`;
      btn.disabled = App.state.compareList.length !== 2;
      if (autoPairBtn) autoPairBtn.hidden = App.state.compareList.length === 2;
    },

    quickAutoDecide(scenarioId = App.state.selectedScenario) {
      App.Sound.chime();
      const list = App.state.investigations.slice().sort((a, b) => {
        const ra = a.relevance[scenarioId] || 0;
        const rb = b.relevance[scenarioId] || 0;
        if (rb !== ra) return rb - ra;
        return b.sample_count - a.sample_count;
      });

      if (list.length < 2) return;
      App.state.compareList = [list[0].id, list[1].id];
      App.state.activeCompareScenario = scenarioId;
      App.renderCards();
      App.renderCompareBar();
      App.openCompare();
    },

    autoPairCompare(sourceId) {
      const id = sourceId || App.state.compareList[0];
      if (!id) return;
      const source = App.state.investigations.find(i => i.id === id);
      if (!source) return;

      const candidates = App.state.investigations.filter(i => i.id !== id);
      candidates.sort((a, b) => {
        let scoreA = 0, scoreB = 0;
        if (a.fuel_type === source.fuel_type) scoreA += 5;
        if (b.fuel_type === source.fuel_type) scoreB += 5;
        scoreA += a.relevance[App.state.selectedScenario] || 0;
        scoreB += b.relevance[App.state.selectedScenario] || 0;
        return scoreB - scoreA;
      });

      if (candidates.length) {
        App.state.compareList = [id, candidates[0].id];
        App.Sound.chime();
        App.renderCards();
        App.renderCompareBar();
        App.openCompare();
      }
    },

    openCompare() {
      const ids = App.state.compareList;
      if (ids.length !== 2) return;
      const [a, b] = ids.map(id => App.state.investigations.find(i => i.id === id));
      if (!a || !b) return;

      const backdrop = document.getElementById('compareBackdrop');
      const modal = document.getElementById('compareModal');
      const body = document.getElementById('compareBody');
      if (!modal || !body) return;

      const scen = App.state.activeCompareScenario || App.state.selectedScenario;
      const decision = App.autoDecide(a, b, scen);
      App.Sound.chime();

      const mA = a.flame_metrics || {};
      const mB = b.flame_metrics || {};

      // Dynamic scenario tabs inside comparison modal
      const scenTabs = App.state.scenarios.map(s => `
        <button class="compare-scen-pill ${s.id === scen ? 'active' : ''}"
          data-action="select-compare-scenario" data-scenario="${App.utils.escapeHtml(s.id)}">
          <i data-lucide="${App.utils.escapeHtml(s.icon || 'circle')}" style="width:12px;height:12px"></i>
          ${App.utils.escapeHtml(s.label)}
        </button>
      `).join('');

      // Attribute comparison rows with quantitative delta and WIN markers
      const metricsRows = [
        {
          label: 'Limiting Oxygen Index (LOC %)',
          valA: `${mA.loc_pct}%`,
          valB: `${mB.loc_pct}%`,
          win: mA.loc_pct >= mB.loc_pct ? 'A' : 'B',
          note: 'Higher LOC is safer (quenches easier in air)'
        },
        {
          label: 'Quenching Distance (mm)',
          valA: `${mA.quenching_distance_mm} mm`,
          valB: `${mB.quenching_distance_mm} mm`,
          win: mA.quenching_distance_mm >= mB.quenching_distance_mm ? 'A' : 'B',
          note: 'Wider distance halts flame through barriers'
        },
        {
          label: 'Flame Spread Rate (mm/s)',
          valA: `${mA.flame_spread_rate_mms} mm/s`,
          valB: `${mB.flame_spread_rate_mms} mm/s`,
          win: mA.flame_spread_rate_mms <= mB.flame_spread_rate_mms ? 'A' : 'B',
          note: 'Slower spread gives more crew intervention time'
        },
        {
          label: 'Peak Flame Temp (K)',
          valA: `${mA.flame_temp_k} K`,
          valB: `${mB.flame_temp_k} K`,
          win: mA.flame_temp_k <= mB.flame_temp_k ? 'A' : 'B',
          note: 'Lower temperature reduces thermal stress'
        },
        {
          label: 'Soot Volume Fraction (ppm)',
          valA: `${mA.soot_volume_fraction_ppm} ppm`,
          valB: `${mB.soot_volume_fraction_ppm} ppm`,
          win: mA.soot_volume_fraction_ppm <= mB.soot_volume_fraction_ppm ? 'A' : 'B',
          note: 'Less soot protects life-support scrubbers'
        },
        {
          label: 'Smoke Obscuration (OD/m)',
          valA: `${mA.smoke_obscuration_od_m} OD/m`,
          valB: `${mB.smoke_obscuration_od_m} OD/m`,
          win: mA.smoke_obscuration_od_m <= mB.smoke_obscuration_od_m ? 'A' : 'B',
          note: 'Lower obscuration preserves egress visibility'
        },
        {
          label: 'Toxic CO/CO₂ Ratio',
          valA: String(mA.co_co2_ratio),
          valB: String(mB.co_co2_ratio),
          win: mA.co_co2_ratio <= mB.co_co2_ratio ? 'A' : 'B',
          note: 'Lower ratio minimizes crew poisoning'
        },
        {
          label: 'Critical Ignition Flux',
          valA: `${mA.critical_heat_flux_kw_m2} kW/m²`,
          valB: `${mB.critical_heat_flux_kw_m2} kW/m²`,
          win: mA.critical_heat_flux_kw_m2 >= mB.critical_heat_flux_kw_m2 ? 'A' : 'B',
          note: 'Higher flux resists accidental ignition'
        },
        {
          label: 'Radiative Fraction',
          valA: `${mA.radiative_fraction_pct}%`,
          valB: `${mB.radiative_fraction_pct}%`,
          win: mA.radiative_fraction_pct <= mB.radiative_fraction_pct ? 'A' : 'B',
          note: 'Lower radiative load protects wiring'
        },
        {
          label: 'Cool Flame Capable',
          valA: mA.cool_flame_capable ? 'Yes (Low Temp)' : 'No (Hot Flame)',
          valB: mB.cool_flame_capable ? 'Yes (Low Temp)' : 'No (Hot Flame)',
          win: mA.cool_flame_capable === mB.cool_flame_capable ? 'SAME' : (mA.cool_flame_capable ? 'B' : 'A'),
          note: 'Cool flames evade thermal detectors'
        },
        {
          label: 'Flame Geometry',
          valA: mA.flame_geometry,
          valB: mB.flame_geometry,
          win: 'SAME',
          note: 'Reaction zone morphology'
        },
        {
          label: 'Active Scenario Relevance',
          valA: `${a.relevance[scen]}/10`,
          valB: `${b.relevance[scen]}/10`,
          win: (a.relevance[scen] || 0) >= (b.relevance[scen] || 0) ? 'A' : 'B',
          note: 'Relevance to current mission target'
        },
        {
          label: 'Facility / Hardware',
          valA: a.facility,
          valB: b.facility,
          win: 'SAME',
          note: 'Testing platform'
        },
        {
          label: 'Recommended Extinguishment',
          valA: mA.extinguishment_method,
          valB: mB.extinguishment_method,
          win: 'SAME',
          note: 'NASA validated suppression protocol'
        }
      ];

      const tableRows = metricsRows.map(row => {
        const clsA = row.win === 'A' ? 'same' : (row.win === 'B' ? 'diff' : '');
        const clsB = row.win === 'B' ? 'same' : (row.win === 'A' ? 'diff' : '');
        const badgeA = row.win === 'A' ? '<span class="win-tag">🏆 WIN</span>' : '';
        const badgeB = row.win === 'B' ? '<span class="win-tag">🏆 WIN</span>' : '';

        return `
          <tr>
            <td>
              <strong>${App.utils.escapeHtml(row.label)}</strong>
              <div style="font-size:0.7rem;color:var(--muted);font-weight:normal">${App.utils.escapeHtml(row.note)}</div>
            </td>
            <td class="${clsA}">${App.utils.escapeHtml(row.valA)} ${badgeA}</td>
            <td class="${clsB}">${App.utils.escapeHtml(row.valB)} ${badgeB}</td>
          </tr>
        `;
      }).join('');

      body.innerHTML = `
        <button class="modal-close" data-action="close-compare" aria-label="Close comparison">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>

        <div style="margin-bottom:0.75rem">
          <span class="badge" style="margin-bottom:0.4rem"><i data-lucide="cpu"></i> NASA Multi-Criteria Flight Safety Decision Engine</span>
          <h2 id="compareTitle" style="margin-bottom:0.25rem">Investigation Comparison &amp; Auto-Decide</h2>
          <p style="color:var(--muted);font-size:0.85rem">Evaluating <strong>${App.utils.escapeHtml(a.short_name)}</strong> vs <strong>${App.utils.escapeHtml(b.short_name)}</strong> across combustion physics, extinction feasibility, and mission envelopes.</p>
        </div>

        <!-- Interactive Scenario Pills inside modal -->
        <div class="compare-scenario-bar">
          ${scenTabs}
        </div>

        <!-- 🏆 AUTO-DECIDE COMMAND BANNER -->
        <div class="auto-decide-banner">
          <div class="winner-spotlight">
            <div class="winner-badge-box">
              <span class="winner-badge"><i data-lucide="trophy"></i> Auto-Decide Recommendation</span>
              <span class="winner-title">${App.utils.escapeHtml(decision.winner.name)} (${decision.winner.short_name})</span>
            </div>
            <div class="winner-scores">
              <span class="score-badge score-badge-win" title="Winner Flight Safety Index">${decision.winScore}% Safety Score</span>
              <span class="score-badge score-badge-lose" title="Runner-up Score">${decision.loseScore}%</span>
            </div>
          </div>

          <div class="decide-grid">
            <div class="decide-card reasons">
              <h4><i data-lucide="check-circle-2"></i> Why ${App.utils.escapeHtml(decision.winner.short_name)} Won (+${decision.margin} pts)</h4>
              <ul class="decide-reasons-list">
                ${decision.reasons.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>

            <div class="decide-card tradeoffs">
              <h4><i data-lucide="alert-triangle"></i> Operational Trade-Off</h4>
              <p class="decide-text">${App.utils.escapeHtml(decision.tradeOff)}</p>
            </div>

            <div class="decide-card directive">
              <h4><i data-lucide="wrench"></i> Artemis Engineering Directive</h4>
              <div class="decide-directive-box">${decision.directive}</div>
            </div>
          </div>
        </div>

        <!-- DUAL REAL-TIME FLAME SIMULATOR CANVAS -->
        <div class="dual-flame-container">
          <div class="dual-flame-panel">
            <div class="dual-flame-title">
              <span>${App.utils.escapeHtml(a.short_name)}</span>
              ${decision.winner.id === a.id ? '<span class="win-tag">🏆 WINNER</span>' : ''}
            </div>
            <div class="flame-canvas-box">
              <canvas id="flameCanvasA" width="260" height="140"></canvas>
            </div>
            <div class="flame-hud">
              <span>🔥 ${mA.flame_temp_k} K</span>
              <span>${mA.flame_geometry}</span>
              <span>⚡ ${mA.flame_spread_rate_mms} mm/s</span>
            </div>
          </div>

          <div class="dual-flame-panel">
            <div class="dual-flame-title">
              <span>${App.utils.escapeHtml(b.short_name)}</span>
              ${decision.winner.id === b.id ? '<span class="win-tag">🏆 WINNER</span>' : ''}
            </div>
            <div class="flame-canvas-box">
              <canvas id="flameCanvasB" width="260" height="140"></canvas>
            </div>
            <div class="flame-hud">
              <span>🔥 ${mB.flame_temp_k} K</span>
              <span>${mB.flame_geometry}</span>
              <span>⚡ ${mB.flame_spread_rate_mms} mm/s</span>
            </div>
          </div>

          <div class="dual-flame-controls">
            <span style="font-size:0.75rem;color:var(--muted)">Microgravity Simulation: Spherical boundary layer &amp; radiation quenching (dashed circle).</span>
            <button class="btn-canvas-toggle" data-action="toggle-gravity">
              <i data-lucide="repeat" style="width:12px;height:12px"></i> Toggle Earth 1G / Microgravity
            </button>
          </div>
        </div>

        <!-- COMPREHENSIVE METRIC COMPARISON TABLE -->
        <h3 style="font-size:1.05rem;color:var(--text);margin:1.5rem 0 0.5rem">Physics &amp; Flight Safety Comparison Matrix</h3>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Scientific Parameter</th>
              <th>${App.utils.escapeHtml(a.short_name)}</th>
              <th>${App.utils.escapeHtml(b.short_name)}</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>

        <!-- RADAR VISUALIZATION -->
        <div class="compare-chart-wrap">
          <h3 style="color:var(--text);font-size:0.95rem;text-align:center;margin-bottom:0.75rem">Multi-Dimensional Safety &amp; Mission Radar</h3>
          <canvas id="compareRadar"></canvas>
        </div>

        <div class="compare-actions-bar">
          <button class="btn btn-ghost" data-action="auto-pair-compare">
            <i data-lucide="shuffle"></i> Auto-Pair Alternative
          </button>
          <button class="btn btn-primary" data-action="export-decision-matrix">
            <i data-lucide="clipboard-copy"></i> Copy Decision Matrix
          </button>
        </div>
      `;

      backdrop.hidden = false;
      modal.hidden = false;
      App.utils.refreshIcons();
      document.body.style.overflow = 'hidden';

      App.startDualFlameLoop(a, b);

      setTimeout(() => {
        App.destroyChart('compareRadar');
        const ctx = document.getElementById('compareRadar');
        if (!ctx || !window.Chart) return;

        // Normalized 0-10 metrics for radar
        const labels = [
          'Mission Relevance',
          'Quenching Margin',
          'Soot Purity',
          'LOC Resilience',
          'Spread Control',
          'Low Toxicity'
        ];

        const dataA = [
          a.relevance[scen] || 5,
          Math.min(10, (mA.quenching_distance_mm / 12) * 10),
          Math.max(1, 10 - (mA.soot_volume_fraction_ppm * 2)),
          Math.min(10, (mA.loc_pct / 20) * 10),
          Math.max(1, 10 - (mA.flame_spread_rate_mms * 1.0)),
          Math.max(1, 10 - (mA.co_co2_ratio * 20))
        ];

        const dataB = [
          b.relevance[scen] || 5,
          Math.min(10, (mB.quenching_distance_mm / 12) * 10),
          Math.max(1, 10 - (mB.soot_volume_fraction_ppm * 2)),
          Math.min(10, (mB.loc_pct / 20) * 10),
          Math.max(1, 10 - (mB.flame_spread_rate_mms * 1.0)),
          Math.max(1, 10 - (mB.co_co2_ratio * 20))
        ];

        App.charts.compareRadar = new window.Chart(ctx, {
          type: 'radar',
          data: {
            labels,
            datasets: [
              {
                label: a.short_name,
                data: dataA,
                borderColor: '#ff6b35',
                backgroundColor: 'rgba(255,107,53,0.2)',
                pointBackgroundColor: '#ff6b35',
                borderWidth: 2
              },
              {
                label: b.short_name,
                data: dataB,
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78,205,196,0.2)',
                pointBackgroundColor: '#4ecdc4',
                borderWidth: 2
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              r: {
                min: 0,
                max: 10,
                grid: { color: 'rgba(255,255,255,0.08)' },
                angleLines: { color: 'rgba(255,255,255,0.08)' },
                pointLabels: { color: '#8b95a7', font: { size: 10 } },
                ticks: { color: '#8b95a7', backdropColor: 'transparent', stepSize: 2 },
              }
            },
            plugins: { legend: { labels: { color: '#e8ecf1', font: { size: 11 } } } },
          },
        });
      }, 50);
    },

    startDualFlameLoop(a, b) {
      if (App.FlameSim.dualAnimId) cancelAnimationFrame(App.FlameSim.dualAnimId);

      const canvasA = document.getElementById('flameCanvasA');
      const canvasB = document.getElementById('flameCanvasB');
      if (!canvasA || !canvasB) return;

      const ctxA = canvasA.getContext('2d');
      const ctxB = canvasB.getContext('2d');
      const mA = a.flame_metrics || {};
      const mB = b.flame_metrics || {};

      const render = (time) => {
        App.FlameSim.drawFlameOrb(ctxA, canvasA.width, canvasA.height, {
          temp: mA.flame_temp_k,
          o2: a.oxygen_concentration[1] || 25,
          pressure: a.pressure_psi[0] || 10.2,
          spread: mA.flame_spread_rate_mms,
          quench: mA.quenching_distance_mm,
          fuel: a.fuel_type,
          coolFlame: mA.cool_flame_capable,
          isEarth: App.state.isEarthGravity,
          time
        });

        App.FlameSim.drawFlameOrb(ctxB, canvasB.width, canvasB.height, {
          temp: mB.flame_temp_k,
          o2: b.oxygen_concentration[1] || 25,
          pressure: b.pressure_psi[0] || 10.2,
          spread: mB.flame_spread_rate_mms,
          quench: mB.quenching_distance_mm,
          fuel: b.fuel_type,
          coolFlame: mB.cool_flame_capable,
          isEarth: App.state.isEarthGravity,
          time
        });

        App.FlameSim.dualAnimId = requestAnimationFrame(render);
      };

      App.FlameSim.dualAnimId = requestAnimationFrame(render);
    },

    exportDecisionMatrix() {
      const ids = App.state.compareList;
      if (ids.length !== 2) return;
      const [a, b] = ids.map(id => App.state.investigations.find(i => i.id === id));
      const scen = App.state.activeCompareScenario || App.state.selectedScenario;
      const decision = App.autoDecide(a, b, scen);

      const text = `# NASA FLIGHT SAFETY DECISION MATRIX\n` +
        `Event: NASA Space Apps Challenge 2026\n` +
        `Scenario: ${decision.scenarioLabel}\n` +
        `Candidate A: ${a.name} (${a.short_name})\n` +
        `Candidate B: ${b.name} (${b.short_name})\n\n` +
        `-----------------------------------------\n` +
        `🏆 AUTO-DECIDE WINNER: ${decision.winner.name} (${decision.winScore}% Safety Score)\n` +
        `Runner-up: ${decision.runnerUp.name} (${decision.loseScore}% Safety Score)\n` +
        `Safety Margin: +${decision.margin}%\n\n` +
        `## Quantitative Justification:\n` +
        decision.reasons.map(r => `- ${r.replace(/<[^>]+>/g, '')}`).join('\n') + '\n\n' +
        `## Operational Trade-Off:\n${decision.tradeOff}\n\n` +
        `## Artemis Engineering Directive:\n${decision.directive.replace(/<[^>]+>/g, '')}\n`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          App.Sound.chime();
          App.utils.toast('NASA Decision Matrix copied to clipboard!', 'success');
        }).catch(() => {
          App.utils.toast('Copy failed — check browser permissions', 'warn');
        });
      } else {
        App.utils.toast('Clipboard not available in this browser', 'warn');
      }
    },

    closeCompare() {
      document.getElementById('compareBackdrop').hidden = true;
      document.getElementById('compareModal').hidden = true;
      document.body.style.overflow = '';
      if (App.FlameSim.dualAnimId) cancelAnimationFrame(App.FlameSim.dualAnimId);
      App.destroyChart('compareRadar');
    },

    clearCompare() {
      App.state.compareList = [];
      App.renderCards();
      App.renderCompareBar();
      App.utils.toast('Comparison cleared', 'info');
    },

    destroyChart(key) {
      if (App.charts[key]) { try { App.charts[key].destroy(); } catch (_) {} App.charts[key] = null; }
    },

    /* ─────────────────────────────────────────────────────────────
       9. DETAIL MODAL WITH FLAME PHYSICS DIAGNOSTICS
       ───────────────────────────────────────────────────────────── */
    openModal(id) {
      const inv = App.state.investigations.find(i => i.id === id);
      if (!inv) return;
      App.state.activeModalId = id;
      const backdrop = document.getElementById('detailBackdrop');
      const modal = document.getElementById('detailModal');
      const body = document.getElementById('modalBody');
      if (!modal || !body) return;

      App.Sound.click();
      const scen = App.state.selectedScenario;
      const fm = inv.flame_metrics || {};

      const relBars = App.state.scenarios.map(s => {
        const score = inv.relevance[s.id] || 0;
        return `<div class="cond-item"><div class="cond-label">${App.utils.escapeHtml(s.label)}</div><div class="cond-val" style="color:${App.utils.scoreColor(score)}">${score}/10</div></div>`;
      }).join('');

      body.innerHTML = `
        <button class="modal-close" data-action="close-modal" aria-label="Close details">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem">
          <h2 id="modalTitle">${App.utils.escapeHtml(inv.name)}</h2>
          <span class="fsrl-pill"><i data-lucide="shield-check" style="width:14px;height:14px"></i> FSRL-${fm.fsrl_level || 8} Certified</span>
        </div>
        <p style="color:var(--accent-cyan);font-family:var(--font-head);letter-spacing:.05em;font-size:.85rem;margin:0 0 .75rem">
          ${App.utils.escapeHtml(inv.short_name)} · ${App.utils.escapeHtml(inv.year)} · Facility: ${App.utils.escapeHtml(inv.facility)} · Hardware: ${App.utils.escapeHtml(inv.hardware || '—')}
        </p>
        <p>${App.utils.escapeHtml(inv.description)}</p>

        <!-- LIVE FLAME SIMULATION ORB -->
        <div class="detail-flame-orb-wrap">
          <canvas class="detail-flame-orb-canvas" id="modalFlameCanvas" width="130" height="110"></canvas>
          <div class="detail-flame-orb-desc">
            <h4><i data-lucide="flame" style="width:14px;height:14px;vertical-align:-2px"></i> Microgravity Reaction Geometry</h4>
            <p><strong>Geometry:</strong> ${fm.flame_geometry}</p>
            <p><strong>Color Emission:</strong> ${fm.flame_color}</p>
            <p style="margin-top:0.35rem"><strong>Extinguishment Protocol:</strong> ${fm.extinguishment_method}</p>
          </div>
        </div>

        <!-- 6-CARD FLAME PHYSICS DIAGNOSTICS -->
        <h3>Combustion Physics &amp; Safety Diagnostics</h3>
        <div class="detail-flame-grid">
          <div class="detail-flame-card card-flame">
            <div class="card-metric-title">Peak Flame Temp</div>
            <div class="card-metric-value">${fm.flame_temp_k} K</div>
          </div>
          <div class="detail-flame-card">
            <div class="card-metric-title">Spread Rate</div>
            <div class="card-metric-value">${fm.flame_spread_rate_mms} mm/s</div>
          </div>
          <div class="detail-flame-card card-accent">
            <div class="card-metric-title">Limiting O₂ (LOC)</div>
            <div class="card-metric-value">${fm.loc_pct}%</div>
          </div>
          <div class="detail-flame-card">
            <div class="card-metric-title">Quenching Distance</div>
            <div class="card-metric-value">${fm.quenching_distance_mm} mm</div>
          </div>
          <div class="detail-flame-card">
            <div class="card-metric-title">Radiative Loss</div>
            <div class="card-metric-value">${fm.radiative_fraction_pct}%</div>
          </div>
          <div class="detail-flame-card">
            <div class="card-metric-title">Soot Volume / CO</div>
            <div class="card-metric-value">${fm.soot_volume_fraction_ppm} ppm / ${fm.co_co2_ratio}</div>
          </div>
        </div>

        <h3>Objectives</h3>
        <ol>${inv.objectives.map(o => `<li>${App.utils.escapeHtml(o)}</li>`).join('') || '<li>—</li>'}</ol>
        
        <h3>Key Findings</h3>
        <ul>${inv.key_findings.map(o => `<li>${App.utils.escapeHtml(o)}</li>`).join('') || '<li>—</li>'}</ul>
        
        <h3>Variables Studied</h3>
        <div class="chips">${inv.variables.map(v => `<span class="chip chip-accent">${App.utils.escapeHtml(v)}</span>`).join('') || '<span class="chip">—</span>'}</div>
        
        <h3>Sensors</h3>
        <div class="chips">${inv.sensors.map(s => `<span class="chip"><i data-lucide="radio" style="width:12px;height:12px;vertical-align:-2px"></i> ${App.utils.escapeHtml(s)}</span>`).join('') || '<span class="chip">—</span>'}</div>
        
        <h3>Test Conditions</h3>
        <div class="test-conditions">
          <div class="cond-item"><div class="cond-label">O₂ Range</div><div class="cond-val">${App.utils.escapeHtml(App.utils.o2RangeText(inv.oxygen_concentration))}</div></div>
          <div class="cond-item"><div class="cond-label">Pressure</div><div class="cond-val">${App.utils.escapeHtml(App.utils.pressureText(inv.pressure_psi))}</div></div>
          <div class="cond-item"><div class="cond-label">Airflow</div><div class="cond-val">${App.utils.escapeHtml(inv.airflow)}</div></div>
          <div class="cond-item"><div class="cond-label">Gravity</div><div class="cond-val">${App.utils.escapeHtml(inv.gravity)}</div></div>
          <div class="cond-item"><div class="cond-label">Duration</div><div class="cond-val">${inv.duration_days} days</div></div>
          <div class="cond-item"><div class="cond-label">Samples</div><div class="cond-val">${inv.sample_count}</div></div>
        </div>
        
        <h3>Relevance Across Scenarios (${App.utils.escapeHtml(scen)} active)</h3>
        <div class="test-conditions">${relBars}</div>
        
        <div class="ai-insight">
          <div class="ai-label"><i data-lucide="sparkles"></i> Pattern Insight</div>
          <p class="si-typing-target" id="siSummaryTarget"></p>
        </div>
        
        <div class="earth-callout">
          <div class="earth-label">Earth Application</div>
          <p>${App.utils.escapeHtml(inv.earth_application) || '—'}</p>
        </div>

        <div style="margin-top:1.5rem;display:flex;gap:0.6rem;justify-content:flex-end">
          <button class="btn btn-ghost" data-action="close-modal">Close</button>
          <button class="btn btn-primary" data-action="auto-pair-from-card" data-id="${App.utils.escapeHtml(inv.id)}">
            <i data-lucide="zap"></i> Compare with Top Rival
          </button>
        </div>
      `;

      backdrop.hidden = false;
      modal.hidden = false;
      App.utils.refreshIcons();
      document.body.style.overflow = 'hidden';

      const target = document.getElementById('siSummaryTarget');
      if (target && inv.si_summary) App.typeText(target, inv.si_summary);
      else if (target) target.textContent = '—';

      App.startModalFlameLoop(inv);
    },

    startModalFlameLoop(inv) {
      if (App.FlameSim.modalAnimId) cancelAnimationFrame(App.FlameSim.modalAnimId);
      const canvas = document.getElementById('modalFlameCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const fm = inv.flame_metrics || {};

      const render = (time) => {
        App.FlameSim.drawFlameOrb(ctx, canvas.width, canvas.height, {
          temp: fm.flame_temp_k,
          o2: inv.oxygen_concentration[1] || 25,
          pressure: inv.pressure_psi[0] || 10.2,
          spread: fm.flame_spread_rate_mms,
          quench: fm.quenching_distance_mm,
          fuel: inv.fuel_type,
          coolFlame: fm.cool_flame_capable,
          isEarth: false,
          time
        });
        App.FlameSim.modalAnimId = requestAnimationFrame(render);
      };
      App.FlameSim.modalAnimId = requestAnimationFrame(render);
    },

    typeText(el, text, speed = 14) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = text; return;
      }
      el.textContent = '';
      el.classList.add('si-typing');
      let i = 0;
      const step = () => {
        if (i >= text.length) { el.classList.remove('si-typing'); return; }
        el.textContent += text[i++];
        setTimeout(step, speed);
      };
      step();
    },

    closeModal() {
      document.getElementById('detailBackdrop').hidden = true;
      document.getElementById('detailModal').hidden = true;
      App.state.activeModalId = null;
      document.body.style.overflow = '';
      if (App.FlameSim.modalAnimId) cancelAnimationFrame(App.FlameSim.modalAnimId);
    },

    generateBrief() {
      const scen = App.state.selectedScenario;
      const label = App.state.scenarios.find(s => s.id === scen)?.label || scen;
      const list = App.state.investigations.slice().sort((a, b) => (b.relevance[scen] || 0) - (a.relevance[scen] || 0));
      const top3 = list.slice(0, 3);
      const highO2 = list.filter(i => (i.oxygen_concentration[1] || 0) >= 30);
      const gapsEl = document.getElementById('gapAnalysis');
      const gaps = gapsEl ? Array.from(gapsEl.querySelectorAll('.gap-item')).map(el => ({
        label: el.querySelector('strong')?.textContent || '',
        text: el.querySelector('p')?.textContent || '',
      })) : [];

      const today = new Date().toISOString().split('T')[0];

      const html = `
        <button class="modal-close" data-action="close-brief" aria-label="Close brief">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
        <h2 id="briefTitle">Mission Brief</h2>
        <p style="color:var(--muted);font-size:.85rem">Auto-generated from current dataset. Print or save as PDF.</p>

        <div class="brief-doc" id="briefDoc">
          <h1>${App.utils.escapeHtml(label)} Fire Safety Brief</h1>
          <div class="brief-meta">Generated ${today} · Flame in Freefall · NASA Space Apps 2026</div>

          <h2>Mission Threat Profile</h2>
          <p>${App.scenarioCopy[scen]}</p>
          <div class="brief-warning">
            <strong>Primary hazard:</strong> Oxygen-enriched atmospheres dramatically lower ignition energy.
            In microgravity, buoyancy-driven convection is absent — flames are spherical and blue, invisible to legacy detectors.
          </div>

          <h2>Priority Experiments (Top 3)</h2>
          <ol>
            ${top3.map(i => `
              <li>
                <strong>${App.utils.escapeHtml(i.short_name)}</strong> — ${App.utils.escapeHtml(i.name)}<br>
                <span class="brief-tag">${i.relevance[scen]}/10 relevance</span>
                ${App.utils.escapeHtml(i.si_summary.split('.')[0])}.
              </li>
            `).join('')}
          </ol>

          <h2>Oxygen-Enriched Test Coverage</h2>
          <p>${highO2.length} of ${list.length} investigations test above 30% O₂:</p>
          <ul>
            ${highO2.map(i => `<li>${App.utils.escapeHtml(i.short_name)} — up to ${i.oxygen_concentration[1]}% O₂</li>`).join('')}
          </ul>

          <h2>Critical Research Gaps</h2>
          <ul>
            ${gaps.length
              ? gaps.map(g => `<li><strong>${App.utils.escapeHtml(g.label)}:</strong> ${App.utils.escapeHtml(g.text)}</li>`).join('')
              : '<li>No critical gaps detected for this scenario.</li>'}
          </ul>

          <h2>Recommendation</h2>
          <p>
            For ${App.utils.escapeHtml(label)} planning, prioritize reading <strong>${App.utils.escapeHtml(top3[0]?.short_name || 'N/A')}</strong>
            followed by ${top3.slice(1).map(i => `<strong>${App.utils.escapeHtml(i.short_name)}</strong>`).join(' and ') || 'related datasets'}.
            Close the high-O₂ solid-fuel gap before finalizing material selection for crewed habitats.
          </p>

          <p style="margin-top:1.5rem;font-size:.75rem;color:#888;font-style:italic">
            This is a hackathon prototype, not a flight-certified analysis. Data sourced from NASA PSI (24 experiments, ~12 TB public). Confirm all findings against primary data.
          </p>
        </div>

        <div class="brief-actions">
          <button class="btn btn-ghost" data-action="close-brief">Close</button>
          <button class="btn btn-primary" data-action="print-brief">
            <i data-lucide="printer" aria-hidden="true"></i> Print / Save PDF
          </button>
        </div>
      `;

      document.getElementById('briefBody').innerHTML = html;
      document.getElementById('briefBackdrop').hidden = false;
      document.getElementById('briefModal').hidden = false;
      document.body.style.overflow = 'hidden';
      App.utils.refreshIcons();
    },

    closeBrief() {
      document.getElementById('briefBackdrop').hidden = true;
      document.getElementById('briefModal').hidden = true;
      document.body.style.overflow = '';
    },

    /* ─────────────────────────────────────────────────────────────
       10. MISSION ANALYTICS CHARTS (INCL. FLAME TEMP VS LOC)
       ───────────────────────────────────────────────────────────── */
    renderCharts() {
      if (!window.Chart) return;
      if (!App.charts.__defaultsSet) {
        window.Chart.defaults.color = '#8b95a7';
        window.Chart.defaults.borderColor = 'rgba(255,255,255,0.08)';
        window.Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
        window.Chart.defaults.font.size = 11;
        App.charts.__defaultsSet = true;
      }

      const list = App.state.filtered;
      const scenarios = App.state.scenarios;

      // Chart 1: Fuel Mix
      App.destroyChart('chartFuel');
      const fuelCounts = {};
      list.forEach(i => { fuelCounts[i.fuel_type] = (fuelCounts[i.fuel_type] || 0) + 1; });
      const fuelLabels = Object.keys(fuelCounts);
      const fuelData = fuelLabels.map(k => fuelCounts[k]);
      const fuelColors = { liquid: '#ff6b35', solid: '#4ecdc4', gaseous: '#ffd166', unknown: '#8b95a7' };
      const el1 = document.getElementById('chartFuel');
      if (el1 && fuelLabels.length) {
        App.charts.chartFuel = new window.Chart(el1, {
          type: 'doughnut',
          data: {
            labels: fuelLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{ data: fuelData, backgroundColor: fuelLabels.map(l => fuelColors[l] || '#8b95a7'), borderColor: '#0a0e1a', borderWidth: 2 }],
          },
          options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } },
        });
      }

      // Chart 2: O2 Coverage
      App.destroyChart('chartO2');
      const el2 = document.getElementById('chartO2');
      if (el2) {
        const labels = list.map(i => i.short_name);
        const maxO2 = list.map(i => i.oxygen_concentration[1] || 0);
        const refLinePlugin = {
          id: 'refLine',
          afterDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            if (!scales.y) return;
            const y = scales.y.getPixelForValue(30);
            ctx.save();
            ctx.strokeStyle = '#ef476f';
            ctx.setLineDash([6, 4]);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(chartArea.left, y);
            ctx.lineTo(chartArea.right, y);
            ctx.stroke();
            ctx.fillStyle = '#ef476f';
            ctx.font = '10px Inter';
            ctx.fillText('Lunar habitat threshold (30%)', chartArea.left + 4, y - 4);
            ctx.restore();
          },
        };
        App.charts.chartO2 = new window.Chart(el2, {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Max O₂ %', data: maxO2, backgroundColor: maxO2.map(v => v >= 30 ? '#ff6b35' : '#4ecdc4'), borderRadius: 4 }] },
          options: {
            responsive: true, maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'O₂ %' } }, x: { ticks: { maxRotation: 45, minRotation: 0 } } },
          },
          plugins: [refLinePlugin],
        });
      }

      // Chart 3: Scenario Coverage
      App.destroyChart('chartScenario');
      const el3 = document.getElementById('chartScenario');
      if (el3) {
        const totals = scenarios.map(s => list.reduce((sum, i) => sum + (i.relevance[s.id] || 0), 0));
        App.charts.chartScenario = new window.Chart(el3, {
          type: 'bar',
          data: {
            labels: scenarios.map(s => s.label),
            datasets: [{
              label: 'Summed relevance',
              data: totals,
              backgroundColor: scenarios.map((scenario, index) =>
                scenario.id === App.state.selectedScenario
                  ? '#ff6b35'
                  : ['#0b3d91', '#c0c0c0', '#8b95a7', '#4ecdc4', '#06d6a0'][index] || '#8b95a7'
              ),
              borderRadius: 4
            }],
          },
          options: { indexAxis: 'y', responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } },
        });
      }

      // Chart 4: Flame Temp vs Limiting Oxygen (LOC)
      App.destroyChart('chartFlameLoc');
      const elLoc = document.getElementById('chartFlameLoc');
      if (elLoc) {
        const points = list.map(i => {
          const m = i.flame_metrics || {};
          return {
            x: m.flame_temp_k || 1650,
            y: m.loc_pct || 15.0,
            r: Math.max(6, Math.min(18, (m.quenching_distance_mm || 7) * 1.3)),
            label: i.short_name,
            fuel: i.fuel_type
          };
        });

        const fuelPointColors = { liquid: 'rgba(255,107,53,0.7)', solid: 'rgba(78,205,196,0.7)', gaseous: 'rgba(255,209,102,0.7)' };

        App.charts.chartFlameLoc = new window.Chart(elLoc, {
          type: 'bubble',
          data: {
            datasets: [{
              label: 'Investigations',
              data: points,
              backgroundColor: points.map(p => fuelPointColors[p.fuel] || 'rgba(78,205,196,0.7)'),
              borderColor: '#fff',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(ctx) {
                    const p = ctx.raw;
                    return `${p.label}: Temp ${p.x} K, LOC ${p.y}%, Quench ${p.r.toFixed(1)} mm`;
                  }
                }
              }
            },
            scales: {
              x: { title: { display: true, text: 'Flame Temperature (K)' }, min: 500, max: 2200 },
              y: { title: { display: true, text: 'Limiting Oxygen (LOC %)' }, min: 8, max: 22 }
            }
          }
        });
      }

      // Chart 5: Year vs Max O2
      App.destroyChart('chartScatter');
      const el4 = document.getElementById('chartScatter');
      if (el4) {
        const points = list.filter(i => i.year > 0 && i.oxygen_concentration[1])
          .map(i => ({ x: i.year, y: i.oxygen_concentration[1], r: Math.max(6, Math.min(24, Math.sqrt(i.sample_count || 1) * 1.6)), id: i.id, label: i.short_name }));
        App.charts.chartScatter = new window.Chart(el4, {
          type: 'bubble',
          data: { datasets: [{ label: 'Investigations', data: points, backgroundColor: 'rgba(255,107,53,0.55)', borderColor: '#ff6b35', borderWidth: 1.5 }] },
          options: {
            responsive: true, maintainAspectRatio: true,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label(ctx) { const p = ctx.raw; return `${p.label}: ${p.x}, max O₂ ${p.y}%`; } } } },
            scales: { x: { title: { display: true, text: 'Year' }, ticks: { stepSize: 2 } }, y: { title: { display: true, text: 'Max O₂ %' }, beginAtZero: true, max: 100 } },
          },
        });
      }
    },

    /* ─────────────────────────────────────────────────────────────
       11. SI RETRIEVAL ENGINE WITH AUTO-DECIDE INTENTS
       ───────────────────────────────────────────────────────────── */
    SI_INTENTS: [
      { key: 'autodecide', words: ['auto decide', 'winner', 'compare', 'vs', 'which is better', 'recommendation'], scenario: null,
        answer: () => {
          App.quickAutoDecide();
          return `I have activated the **NASA Auto-Decide Safety Engine**! Comparing the top-ranked rivals for the current mission with physical quenching, soot, and extinction metrics.`;
        }
      },
      { key: 'coolflame', words: ['cool flame', 'cool flames', 'low temp', 'chemiluminescent'], scenario: null,
        answer: (top) => {
          const cf = top.filter(i => i.flame_metrics?.cool_flame_capable);
          return `Cool-flame investigations: ${cf.map(i => `**${i.short_name}** (~${i.flame_metrics.flame_temp_k} K)`).join(', ')}. Cool flames persist at low temperatures without visible soot and can evade standard infrared smoke detectors.`;
        }
      },
      { key: 'quenching', words: ['quench', 'quenching', 'mesh', 'barrier'], scenario: null,
        answer: (top) => {
          const sorted = top.slice().sort((a,b) => (b.flame_metrics?.quenching_distance_mm || 0) - (a.flame_metrics?.quenching_distance_mm || 0));
          return `Highest boundary quenching distances: ${sorted.slice(0, 3).map(i => `**${i.short_name}** (${i.flame_metrics.quenching_distance_mm} mm)`).join(', ')}. Wider quenching distances allow passive flame snuffing via narrow clearances.`;
        }
      },
      { key: 'lunar', words: ['lunar', 'moon', 'moonbase', 'moon base'], scenario: 'moon_base',
        answer: (top) => `For lunar habitats — 30%+ O₂ at ≤10.2 psi — **${top[0].short_name}** ranks highest (${top[0].relevance.moon_base}/10). ${top[0].si_summary.split('.')[0]}.` },
      { key: 'mars', words: ['mars', 'martian', 'red planet'], scenario: 'mars',
        answer: (top) => `For Mars missions, **${top[0].short_name}** leads (${top[0].relevance.mars}/10). ${top[0].si_summary.split('.')[0]}.` },
      { key: 'rover', words: ['rover', 'pressurized vehicle', 'vehicle'], scenario: 'rover',
        answer: (top) => `For pressurized rovers, **${top[0].short_name}** scores ${top[0].relevance.rover}/10. ${top[0].si_summary.split('.')[0]}.` },
      { key: 'earth', words: ['earth', 'terrestrial', 'spin-off', 'spinoff', 'home'], scenario: 'earth',
        answer: (top) => `Best Earth spin-off candidate: **${top[0].short_name}** (${top[0].relevance.earth}/10). ${top[0].earth_application}` },
      { key: 'spacecraft', words: ['iss', 'spacecraft', 'space station', 'orbit'], scenario: 'spacecraft',
        answer: (top) => `For ISS / spacecraft, **${top[0].short_name}** leads (${top[0].relevance.spacecraft}/10). ${top[0].si_summary.split('.')[0]}.` },
      { key: 'higho2', words: ['high o2', 'high oxygen', 'oxygen-rich', 'flammable', '85%', 'oxygen'], scenario: null,
        answer: (top) => {
          const hi = top.filter(i => (i.oxygen_concentration[1] || 0) >= 40);
          if (!hi.length) return `No investigation in the current set tests above 40% O₂.`;
          return `High-O₂ experiments: ${hi.map(i => `**${i.short_name}** (up to ${i.oxygen_concentration[1]}%)`).join(', ')}. These matter most for lunar habitats and spacesuit environments (100% O₂ at 4.3 psi).`;
        } },
      { key: 'extinguish', words: ['extinguish', 'suppress', 'put out', 'flame out'], scenario: null,
        answer: (top) => {
          const hits = top.filter(i => i.tags.some(t => /suppress|extinct|extinguish/i.test(t)) || /extinguish|suppress/i.test(i.description));
          if (!hits.length) return `No suppression-specific matches in current set.`;
          return `Suppression-focused: ${hits.slice(0, 3).map(i => `**${i.short_name}**`).join(', ')}.`;
        } },
      { key: 'gap', words: ['gap', 'missing', 'untested', 'blind spot', 'next test'], scenario: null,
        answer: () => {
          const gapsEl = document.getElementById('gapAnalysis');
          const gaps = gapsEl ? Array.from(gapsEl.querySelectorAll('.gap-item')).map(el => el.querySelector('strong')?.textContent).filter(Boolean) : [];
          if (!gaps.length) return `Current dataset has no critical gaps for the active scenario — coverage is strong.`;
          return `Critical research gaps: ${gaps.join('; ')}. These are the highest-impact experiments NASA should run next.`;
        } },
      { key: 'design', words: ['design', 'equipment', 'hardware', 'suppression system', 'detector'], scenario: null,
        answer: () => {
          const scen = App.state.selectedScenario;
          const scenLabel = App.state.scenarios.find(s => s.id === scen)?.label || scen;
          return `For ${scenLabel}, equipment design recommendations are in the Innovation Lab — scroll to "Equipment Design Recommendations". Covers suppression system, detector placement, and material selection based on NASA experiments.`;
        } },
      { key: 'brief', words: ['brief', 'mission brief', 'summary report', 'generate'], scenario: null,
        answer: () => { App.generateBrief(); return `I've opened a mission brief for the current scenario. Print or save it as PDF.`; } },
    ],

    renderSuggestions() {
      const wrap = document.getElementById('siSuggestions');
      if (!wrap) return;
      const suggestions = [
        'Which experiment is best for the Moon?',
        'Show experiments with high oxygen',
        'How can we suppress a fire?',
        'What equipment do you recommend?',
      ];
      wrap.innerHTML = suggestions.map(s => `<button class="si-suggest" data-action="si-suggest" data-q="${App.utils.escapeHtml(s)}">${App.utils.escapeHtml(s)}</button>`).join('');
    },

    askSI(query) {
      const q = String(query || '').toLowerCase().trim();
      if (!q) return;
      App.Sound.click();
      const answers = document.getElementById('siAnswers');
      if (!answers) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'si-msg';
      userBubble.innerHTML = `
        <div class="si-avatar" style="background:linear-gradient(135deg,#4ecdc4,#0b3d91)">
          <i data-lucide="user"></i>
        </div>
        <div class="si-bubble">${App.utils.escapeHtml(query)}</div>
      `;
      answers.appendChild(userBubble);
      App.utils.refreshIcons();

      let bestIntent = null, bestScore = 0;
      App.SI_INTENTS.forEach(intent => {
        let score = 0;
        intent.words.forEach(w => { if (q.includes(w)) score += w.length; });
        if (score > bestScore) { bestScore = score; bestIntent = intent; }
      });

      let candidates = App.state.investigations.slice();
      let scenarioApplied = null;
      if (bestIntent && bestIntent.scenario) {
        scenarioApplied = bestIntent.scenario;
        candidates = candidates.filter(i => (i.relevance[scenarioApplied] || 0) > 0);
        candidates.sort((a, b) => (b.relevance[scenarioApplied] || 0) - (a.relevance[scenarioApplied] || 0));
      } else if (q.includes('high') || q.includes('oxygen')) {
        candidates.sort((a, b) => (b.oxygen_concentration[1] || 0) - (a.oxygen_concentration[1] || 0));
      } else if (q.includes('extinguish') || q.includes('suppress')) {
        candidates = candidates.filter(i => /suppress|extinguish/i.test(i.tags.join(' ') + ' ' + i.description));
      }

      let answerText;
      if (bestIntent && bestIntent.answer && candidates.length) answerText = bestIntent.answer(candidates);
      else if (!candidates.length) answerText = `No strong match. Try: auto decide, cool flame, quenching, lunar, mars, rover, spacecraft.`;
      else {
        const scen = App.state.selectedScenario;
        candidates.sort((a, b) => (b.relevance[scen] || 0) - (a.relevance[scen] || 0));
        answerText = `Top matches: ${candidates.slice(0, 3).map(i => `**${i.short_name}** (${i.relevance[scen]}/10)`).join(', ')}.`;
      }

      if (scenarioApplied) {
        App.state.selectedScenario = scenarioApplied;
        App.renderScenarioBar();
        App.applyFilters();
      }

      const top = candidates.slice(0, 4);
      const chips = top.map(i => `<button data-action="view-details" data-id="${App.utils.escapeHtml(i.id)}">${App.utils.escapeHtml(i.short_name)}</button>`).join('');

      const aiBubble = document.createElement('div');
      aiBubble.className = 'si-msg';
      aiBubble.innerHTML = `
        <div class="si-avatar"><i data-lucide="sparkles"></i></div>
        <div class="si-bubble si-typing">
          <div class="si-answer-body"></div>
          <div class="si-answer-chips">${chips}</div>
        </div>
      `;
      answers.appendChild(aiBubble);
      App.utils.refreshIcons();
      const bodyEl = aiBubble.querySelector('.si-answer-body');
      const bubbleEl = aiBubble.querySelector('.si-bubble');
      App.typeText(bodyEl, answerText.replace(/\*\*/g, ''), 12);
      setTimeout(() => bubbleEl.classList.remove('si-typing'), Math.min(3000, answerText.length * 12));
      aiBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    renderSpinoffs() {
      const grid = document.getElementById('spinoffGrid');
      if (!grid) return;
      const list = App.state.investigations.filter(i => i.earth_application);
      grid.innerHTML = list.slice(0, 6).map(i => {
        const product = App.earthProductMap[i.id] || '';
        return `
          <div class="spinoff-card">
            <h4>${App.utils.escapeHtml(i.short_name)}</h4>
            <p>${App.utils.escapeHtml(i.earth_application)}</p>
            ${product ? `<span class="spinoff-product"><i data-lucide="external-link" style="width:10px;height:10px;vertical-align:-1px"></i> ${App.utils.escapeHtml(product)}</span>` : ''}
            <p class="spinoff-src">Source: ${App.utils.escapeHtml(i.name)}</p>
          </div>
        `;
      }).join('') || '<div class="spinoff-card"><p>No spin-off data available.</p></div>';
      App.utils.refreshIcons();
    },

    toggleAudio() {
      App.Sound.enabled = !App.Sound.enabled;
      App.state.audioEnabled = App.Sound.enabled;
      const btn = document.getElementById('audioToggleBtn');
      const txt = document.getElementById('audioText');
      const icon = document.getElementById('audioIcon');
      if (btn && txt && icon) {
        if (App.Sound.enabled) {
          btn.classList.remove('muted');
          txt.textContent = 'Audio FX: ON';
          icon.setAttribute('data-lucide', 'volume-2');
          App.Sound.chime();
          App.utils.toast('Mission Audio FX enabled', 'info');
        } else {
          btn.classList.add('muted');
          txt.textContent = 'Audio FX: OFF';
          icon.setAttribute('data-lucide', 'volume-x');
          App.utils.toast('Mission Audio FX muted', 'info');
        }
        App.utils.refreshIcons();
      }
    },

    /* ─────────────────────────────────────────────────────────────
       12. EVENT INITIALIZATION & WIRING
       ───────────────────────────────────────────────────────────── */
    initEvents() {
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) {
          if (e.target.id === 'detailBackdrop') App.closeModal();
          if (e.target.id === 'compareBackdrop') App.closeCompare();
          if (e.target.id === 'briefBackdrop') App.closeBrief();
          return;
        }
        const action = target.getAttribute('data-action');
        const id = target.getAttribute('data-id');
        const scen = target.getAttribute('data-scenario');
        const q = target.getAttribute('data-q');

        switch (action) {
          case 'select-scenario':
            App.selectScenario(scen);
            break;
          case 'view-details': if (id) App.openModal(id); break;
          case 'close-modal': App.closeModal(); break;
          case 'toggle-compare': if (id) App.toggleCompare(id); break;
          case 'open-compare': App.openCompare(); break;
          case 'close-compare': App.closeCompare(); break;
          case 'clear-compare': App.clearCompare(); break;
          case 'quick-auto-decide': App.quickAutoDecide(); break;
          case 'auto-pair-compare': App.autoPairCompare(); break;
          case 'auto-pair-from-card': if (id) App.autoPairCompare(id); break;
          case 'toggle-gravity': App.toggleGravity(); break;
          case 'reset-simulation': App.resetSandbox(); break;
          case 'toggle-audio': App.toggleAudio(); break;
          case 'toggle-theme': App.Theme.toggle(); break;
          case 'export-decision-matrix': App.exportDecisionMatrix(); break;
          case 'select-compare-scenario':
            if (scen) {
              App.Sound.click();
              App.state.activeCompareScenario = scen;
              App.openCompare();
            }
            break;
          case 'reset-filters':
            App.Sound.click();
            App.state.filters = { search: '', fuel: '', facility: '', airflow: '', gravity: '' };
            document.getElementById('searchInput').value = '';
            ['fuelFilter','facilityFilter','airflowFilter','gravityFilter'].forEach(fid => {
              const el = document.getElementById(fid); if (el) el.value = '';
            });
            App.applyFilters();
            App.utils.toast('Filters reset', 'info');
            break;
          case 'retry-load': App.loadData(); break;
          case 'si-ask': App.askSI(document.getElementById('siInput')?.value || ''); break;
          case 'si-suggest': if (q) { const inp = document.getElementById('siInput'); if (inp) inp.value = q; App.askSI(q); } break;
          case 'generate-brief': App.generateBrief(); break;
          case 'close-brief': App.closeBrief(); break;
          case 'print-brief': window.print(); break;
        }
      });

      const searchEl = document.getElementById('searchInput');
      if (searchEl) searchEl.addEventListener('input', App.utils.debounce((e) => {
        App.state.filters.search = e.target.value;
        App.applyFilters();
      }, 250));

      ['fuelFilter','facilityFilter','airflowFilter','gravityFilter'].forEach(fid => {
        const el = document.getElementById(fid);
        if (!el) return;
        el.addEventListener('change', (e) => {
          const key = fid.replace('Filter', '').toLowerCase();
          App.state.filters[key] = e.target.value;
          App.applyFilters();
        });
      });

      const analyticsMission = document.getElementById('analyticsScenarioSelect');
      if (analyticsMission) analyticsMission.addEventListener('change', (e) => App.selectScenario(e.target.value));

      const siInput = document.getElementById('siInput');
      if (siInput) siInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); App.askSI(siInput.value); }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (!document.getElementById('detailModal').hidden) App.closeModal();
          else if (!document.getElementById('compareModal').hidden) App.closeCompare();
          else if (!document.getElementById('briefModal').hidden) App.closeBrief();
        }
      });

      window.addEventListener('resize', App.utils.throttle(() => {}, 200));

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
        }, { threshold: 0.1 });
        document.querySelectorAll('.chart-card').forEach(c => io.observe(c));
      } else {
        document.querySelectorAll('.chart-card').forEach(c => c.classList.add('visible'));
      }
    },

    init() {
      App.Theme.init();
      App.Sound.init();
      App.utils.refreshIcons();
      App.initEvents();
      App.loadData();
    },
  };

  window.App = App;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
