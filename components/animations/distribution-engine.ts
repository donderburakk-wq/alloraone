import type { SceneLayout } from "@/lib/geo/turkey-scene";

/**
 * Hero dağıtım sahnesi için Canvas 2D motoru. React'ten bağımsızdır:
 * her karede yalnızca canvas'a çizer.
 *
 * Koordinatlar viewBox birimindedir (layout.width × layout.height); çizimde
 * s = CSS piksel / birim ölçeği ve devicePixelRatio uygulanır.
 */

export type Timeline = {
  /** Mağaza düğümlerinin belirmeye başladığı an (sn) */
  cities: number;
  /** Rotaların çizilmeye başladığı an */
  routes: number;
  /** İlk dalga paketlerinin çıkış aralığı */
  waveStart: number;
  waveEnd: number;
  /** Meteo düzeltmesinin devreye girdiği an */
  meteo: number;
};

export const TIMELINE: Record<"desktop" | "mobile", Timeline> = {
  desktop: { cities: 0.9, routes: 1.2, waveStart: 1.5, waveEnd: 2.75, meteo: 1.9 },
  mobile: { cities: 0.45, routes: 0.7, waveStart: 0.95, waveEnd: 1.95, meteo: 1.2 },
};

type Options = {
  canvas: HTMLCanvasElement;
  layout: SceneLayout;
  variant: "desktop" | "mobile";
  reduced: boolean;
  /** CSS animasyonu bu elemana bağlı; sahne saati onunla eşitlenir. */
  clockEl: Element | null;
};

/**
 * Görsel dil: harita, rotalar ve depo nötr; yalnızca akan paketler ve dolan
 * kapasite halkaları marka aksanında. Meteo düzeltmeli akışlar kırık beyaz
 * (fg) ile ayrışır. Işıma ve toplamalı karışım yoktur.
 */
type Palette = { accent: string; fg: string; line: string; lineStrong: string };
type Tone = "accent" | "fg";

type City = SceneLayout["cities"][number] & {
  cx: number;
  cy: number;
  len: number;
  order: number;
  received: number;
  capacity: number;
  shownFill: number;
  flash: number;
};

type Particle = {
  city: City;
  t0: number;
  dur: number;
  units: number;
  calm: boolean;
};

const TAU = Math.PI * 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/** Deterministik rastgelelik: her açılışta aynı "akıllı" dağıtım. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string) => cs.getPropertyValue(name).trim();
  return {
    accent: v("--color-accent"),
    fg: v("--color-fg"),
    line: v("--color-line"),
    lineStrong: v("--color-line-strong"),
  };
}

export function createDistributionEngine(opts: Options) {
  const { canvas, layout, variant, reduced } = opts;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return { destroy() {} };

  const T = TIMELINE[variant];
  const compact = variant === "mobile";
  const rand = mulberry32(compact ? 7 : 11);
  const W = layout.width;
  const H = layout.height;
  const wh = layout.warehouse;
  const outline = new Path2D(layout.path);

  // --- Mağazalar ve rotalar -------------------------------------------------
  const cities: City[] = layout.cities
    .map((c) => {
      const dx = c.x - wh.x;
      const dy = c.y - wh.y;
      const len = Math.hypot(dx, dy);
      // Kontrol noktası kirişe diktir ve her zaman yukarı (kuzeye) doğru kavislenir.
      let nx = -dy / (len || 1);
      let ny = dx / (len || 1);
      if (ny > 0) {
        nx = -nx;
        ny = -ny;
      }
      const bend = Math.min(len * 0.24, 110);
      return {
        ...c,
        cx: (wh.x + c.x) / 2 + nx * bend,
        cy: (wh.y + c.y) / 2 + ny * bend,
        len,
        order: 0,
        received: 0,
        capacity: 1,
        shownFill: 0,
        flash: 0,
      };
    })
    .sort((a, b) => a.len - b.len);
  cities.forEach((c, i) => (c.order = i));
  const maxLen = Math.max(...cities.map((c) => c.len), 1);

  const travelTime = (c: City) => 0.62 + (c.len / maxLen) * 0.75;

  // --- İlk dalga: talebe göre farklı miktarlar ------------------------------
  const particles: Particle[] = [];
  const perCity = compact ? 6 : 11;
  for (const c of cities) {
    const count = Math.max(2, Math.round(c.weight * perCity));
    let total = 0;
    for (let k = 0; k < count; k++) {
      const units = 18 + Math.round(rand() * 22);
      total += units;
      particles.push({
        city: c,
        t0: T.waveStart + (k / count) * (T.waveEnd - T.waveStart) + rand() * 0.12 + c.order * 0.015,
        dur: travelTime(c),
        units,
        calm: false,
      });
    }
    c.capacity = total / c.fill;
  }
  const firstWaveEnd = Math.max(...particles.map((p) => p.t0 + p.dur));

  // --- Durum ------------------------------------------------------------
  let palette = readPalette();
  let dpr = 1;
  let scale = 1; // CSS px / birim
  let dotLayer: HTMLCanvasElement | null = null;
  let time = 0;
  let last = 0;
  let raf = 0;
  let running = false;
  let visible = true;
  let onScreen = true;
  let nextCalmWave = firstWaveEnd + 0.8;

  // Sahne saatini kontur CSS animasyonuyla eşitle (metin girişiyle senkron kalır).
  if (!reduced) {
    const anim = opts.clockEl?.getAnimations?.()[0];
    const ct = anim?.currentTime;
    if (typeof ct === "number") time = Math.max(0, ct / 1000);
  }

  /** Meteo düzeltmesi devreye girdikten sonra o mağazanın akışı kırık beyazdır. */
  function cityTone(c: City, t: number): Tone {
    return c.meteo && t >= T.meteo ? "fg" : "accent";
  }

  // --- Boyutlandırma ve önbellekler -----------------------------------------
  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    scale = rect.width / W;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    buildDots();
    return true;
  }

  /** Türkiye içindeki nokta matrisi; bir kez çizilip her karede kopyalanır. */
  function buildDots() {
    const layer = document.createElement("canvas");
    layer.width = canvas.width;
    layer.height = canvas.height;
    const g = layer.getContext("2d")!;
    const probe = document.createElement("canvas").getContext("2d")!;
    const gap = Math.max(6.5 / scale, 6); // ~6.5 CSS px aralık
    const k = scale * dpr;
    const r = Math.max(0.75 * dpr, 0.9);
    const dim = new Path2D();
    const bright = new Path2D();
    let row = 0;
    for (let y = gap / 2; y < H; y += gap * 0.866, row++) {
      for (let x = (row % 2) * (gap / 2); x < W; x += gap) {
        if (!probe.isPointInPath(outline, x, y)) continue;
        const target = ((x * 13 + y * 7) | 0) % 5 === 0 ? bright : dim;
        target.moveTo(x * k + r, y * k);
        target.arc(x * k, y * k, r, 0, TAU);
      }
    }
    g.fillStyle = palette.fg;
    g.globalAlpha = 0.1;
    g.fill(dim);
    g.globalAlpha = 0.2;
    g.fill(bright);
    dotLayer = layer;
  }

  // --- Çizim ----------------------------------------------------------------
  function quadPoint(c: City, t: number) {
    const u = 1 - t;
    return {
      x: u * u * wh.x + 2 * u * t * c.cx + t * t * c.x,
      y: u * u * wh.y + 2 * u * t * c.cy + t * t * c.y,
    };
  }

  function draw(t: number) {
    const k = scale * dpr;
    const px = 1 / scale; // 1 CSS px, birim cinsinden
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    // Nokta matrisi: depodan dışa doğru açılan dairesel maske ile belirir.
    if (dotLayer) {
      const reveal = clamp01((t - 0.1) / 1.5);
      if (reveal >= 1) {
        ctx!.drawImage(dotLayer, 0, 0);
      } else if (reveal > 0) {
        const R = easeOutCubic(reveal) * Math.hypot(W, H) * k;
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(wh.x * k, wh.y * k, R, 0, TAU);
        ctx!.clip();
        ctx!.drawImage(dotLayer, 0, 0);
        ctx!.restore();
      }
    }

    ctx!.setTransform(k, 0, 0, k, 0, 0);

    // Rotalar
    ctx!.lineWidth = px;
    ctx!.lineCap = "round";
    for (const c of cities) {
      const p = clamp01((t - T.routes - c.order * 0.04) / 0.7);
      if (p <= 0) continue;
      const e = easeOutCubic(p);
      // De Casteljau ile eğrinin [0, e] kısmı
      const q0x = wh.x + (c.cx - wh.x) * e;
      const q0y = wh.y + (c.cy - wh.y) * e;
      const end = quadPoint(c, e);
      ctx!.strokeStyle = palette.lineStrong;
      ctx!.globalAlpha = 1;
      ctx!.beginPath();
      ctx!.moveTo(wh.x, wh.y);
      ctx!.quadraticCurveTo(q0x, q0y, end.x, end.y);
      ctx!.stroke();
    }
    ctx!.globalAlpha = 1;

    // Mağaza düğümleri ve kapasite halkaları
    const ringR = (compact ? 7.5 : 7) * px;
    for (const c of cities) {
      const appear = clamp01((t - T.cities - c.order * 0.05) / 0.5);
      if (appear <= 0) continue;
      const s = easeOutCubic(appear);
      const color = palette[cityTone(c, t)];

      ctx!.globalAlpha = appear;
      ctx!.strokeStyle = palette.line;
      ctx!.lineWidth = 1.5 * px;
      ctx!.beginPath();
      ctx!.arc(c.x, c.y, ringR * s, 0, TAU);
      ctx!.stroke();

      if (c.shownFill > 0.001) {
        ctx!.globalAlpha = appear;
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 2 * px;
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, ringR * s, -Math.PI / 2, -Math.PI / 2 + c.shownFill * TAU);
        ctx!.stroke();
      }

      if (c.flash > 0.01) {
        ctx!.globalAlpha = c.flash * 0.4;
        ctx!.strokeStyle = color;
        ctx!.lineWidth = px;
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, ringR + (1 - c.flash) * 9 * px, 0, TAU);
        ctx!.stroke();
      }

      ctx!.globalAlpha = appear;
      ctx!.fillStyle = palette.fg;
      ctx!.beginPath();
      ctx!.arc(c.x, c.y, 2.2 * px * s, 0, TAU);
      ctx!.fill();
    }

    // Merkez depo: nötr, yavaşça yayılan ince halka
    const whAppear = clamp01((t - (T.cities - 0.35)) / 0.5);
    if (whAppear > 0) {
      const phase = (t % 2.8) / 2.8;
      ctx!.globalAlpha = (1 - phase) * 0.35 * whAppear;
      ctx!.strokeStyle = palette.fg;
      ctx!.lineWidth = px;
      ctx!.beginPath();
      ctx!.arc(wh.x, wh.y, (7 + phase * 16) * px, 0, TAU);
      ctx!.stroke();
      ctx!.globalAlpha = whAppear;
      ctx!.strokeStyle = palette.fg;
      ctx!.lineWidth = px;
      ctx!.beginPath();
      ctx!.arc(wh.x, wh.y, 7 * px * easeOutCubic(whAppear), 0, TAU);
      ctx!.stroke();
      const d = 3.2 * px * easeOutCubic(whAppear);
      ctx!.fillStyle = palette.fg;
      ctx!.beginPath();
      ctx!.moveTo(wh.x, wh.y - d);
      ctx!.lineTo(wh.x + d, wh.y);
      ctx!.lineTo(wh.x, wh.y + d);
      ctx!.lineTo(wh.x - d, wh.y);
      ctx!.closePath();
      ctx!.fill();
    }

    // Paketler: düz renkli küçük nokta + kısa iz çizgisi. Işıma yok.
    ctx!.lineCap = "round";
    for (const p of particles) {
      const u = (t - p.t0) / p.dur;
      if (u <= 0 || u >= 1) continue;
      const color = palette[cityTone(p.city, p.t0)];
      // Depodan çıkışta yumuşak beliriş: paketler kalkışta üst üste yığılmasın.
      const alpha = (p.calm ? 0.7 : 1) * Math.min(1, u * 4);
      const head = quadPoint(p.city, easeInOutSine(u));
      const tail = quadPoint(p.city, easeInOutSine(Math.max(0, u - 0.06)));
      ctx!.globalAlpha = alpha * 0.45;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1.5 * px;
      ctx!.beginPath();
      ctx!.moveTo(tail.x, tail.y);
      ctx!.lineTo(head.x, head.y);
      ctx!.stroke();
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.arc(head.x, head.y, 2.2 * px, 0, TAU);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;
  }

  // --- Simülasyon ----------------------------------------------------------
  function step(dt: number) {
    time += dt;
    const t = time;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (t >= p.t0 + p.dur) {
        p.city.received += p.units;
        p.city.flash = 1;
        particles.splice(i, 1);
      }
    }

    // Sakin döngü: daha seyrek, daha yavaş, daha az parçacık
    if (t >= nextCalmWave) {
      const picks = compact ? 3 : 5;
      for (let n = 0; n < picks; n++) {
        const c = weightedPick();
        const count = 1 + Math.round(rand());
        for (let k = 0; k < count; k++) {
          particles.push({
            city: c,
            t0: t + rand() * 0.8 + k * 0.25,
            dur: travelTime(c) * 1.9,
            units: 6 + Math.round(rand() * 10),
            calm: true,
          });
        }
      }
      nextCalmWave = t + 2.4 + rand() * 1.2;
    }

    for (const c of cities) {
      // İlk dalgadan sonra mağazalar satış yaptıkça halka yavaşça boşalır.
      if (t > firstWaveEnd + 0.5) {
        c.received = Math.max(c.capacity * 0.4, c.received - c.capacity * 0.011 * dt * (0.6 + c.weight));
      }
      const target = Math.min(1, c.received / c.capacity);
      c.shownFill += (target - c.shownFill) * Math.min(1, dt * 7);
      c.flash = Math.max(0, c.flash - dt * 2.4);
    }
  }

  function weightedPick() {
    const total = cities.reduce((s, c) => s + c.weight, 0);
    let r = rand() * total;
    for (const c of cities) {
      r -= c.weight;
      if (r <= 0) return c;
    }
    return cities[0];
  }

  /** Azaltılmış hareket: ilk dalga tamamlanmış son kare, döngü yok. */
  function settle() {
    particles.length = 0;
    time = firstWaveEnd + 0.4;
    for (const c of cities) {
      c.received = c.capacity * c.fill;
      c.shownFill = c.fill;
      c.flash = 0;
    }
  }

  function frame(now: number) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    step(dt);
    draw(time);
    raf = requestAnimationFrame(frame);
  }

  function updateRunning() {
    const should = !reduced && visible && onScreen && scale > 0 && canvas.width > 0;
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }

  // --- Yaşam döngüsü ---------------------------------------------------------
  const ro = new ResizeObserver(() => {
    if (resize() && !running) draw(time);
    updateRunning();
  });
  ro.observe(canvas);

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    updateRunning();
  });
  io.observe(canvas);

  const onVisibility = () => {
    visible = document.visibilityState === "visible";
    updateRunning();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const themeObserver = new MutationObserver(() => {
    palette = readPalette();
    if (canvas.width > 0) {
      buildDots();
      if (!running) draw(time);
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  if (reduced) settle();
  if (resize()) draw(time);
  updateRunning();

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
