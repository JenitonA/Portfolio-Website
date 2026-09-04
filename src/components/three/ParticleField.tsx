import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ricardo-style particle field:
 *
 * - Every particle gets an anchor in each of four states: a 2D silicon
 *   lattice sheet (honeycomb, procedural), a torus knot (barycentric
 *   mesh sampling), a fully dispersed scatter volume, and a "JA"
 *   monogram (sampled from rasterized canvas text).
 * - Scrolling moves ONE global state value via GSAP ScrollTrigger; the
 *   blend between neighbouring anchor sets (and the idle "breathe"
 *   wobble) is evaluated in the vertex shader, so the whole morph costs
 *   the CPU nothing — only the pair of active anchor sets is uploaded,
 *   and only when the pair changes.
 * - The cursor adds an XY displacement with a push force and a spring
 *   return. That physics is stateful, so it stays on the CPU — but it
 *   only runs (and only re-uploads its buffer) while the cursor is near
 *   the shape or residual motion remains. Idle frames skip it entirely.
 * - Rendering is "starfield" style: every particle carries a brightness
 *   tier, a palette colour and a size; the fragment shader draws a hot
 *   powered disc (with ray cross on the bright tier), brightness > 1
 *   blows out toward white, and premultiplied additive blending lets
 *   overlaps saturate. A GPU lens magnifies and brightens stars near the
 *   pointer on top of the CPU push.
 */

/* Adaptive particle budget: phones get a lighter cloud, low-core devices
   are clamped harder — the CPU integrates every particle during cursor
   interaction. */
function particleBudget(): number {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  let count = w < 768 ? 5000 : w < 1280 ? 8000 : 12000;
  if (cores <= 4) count = Math.min(count, 6000);
  return count;
}

/* Area-weighted barycentric surface sampling — one anchor per particle */
function sampleMeshAnchors(geometry: THREE.BufferGeometry, count: number): Float32Array {
  const geo = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const triCount = pos.count / 3;

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();

  const cumulative = new Float32Array(triCount);
  let total = 0;
  for (let t = 0; t < triCount; t++) {
    a.fromBufferAttribute(pos, t * 3);
    b.fromBufferAttribute(pos, t * 3 + 1);
    c.fromBufferAttribute(pos, t * 3 + 2);
    total += b.clone().sub(a).cross(c.clone().sub(a)).length() * 0.5;
    cumulative[t] = total;
  }

  const anchors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * total;
    let lo = 0;
    let hi = triCount - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumulative[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    a.fromBufferAttribute(pos, lo * 3);
    b.fromBufferAttribute(pos, lo * 3 + 1);
    c.fromBufferAttribute(pos, lo * 3 + 2);

    const r1 = Math.sqrt(Math.random());
    const r2 = Math.random();
    const u = 1 - r1;
    const v = r1 * (1 - r2);
    const w = r1 * r2;

    anchors[i * 3] = a.x * u + b.x * v + c.x * w;
    anchors[i * 3 + 1] = a.y * u + b.y * v + c.y * w;
    anchors[i * 3 + 2] = a.z * u + b.z * v + c.z * w;
  }
  if (geo !== geometry) geo.dispose();
  return anchors;
}

/* 3D crystal lattice cube — atoms on a simple cubic grid, particles also
   strung along the bonds between neighbouring atoms */
function cubeLatticeAnchors(count: number): Float32Array {
  const N = 5;
  const spacing = 0.85;
  const half = ((N - 1) / 2) * spacing;

  const gauss = () =>
    (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 0.5;

  const site = (i: number, j: number, k: number): [number, number, number] => [
    i * spacing - half,
    j * spacing - half,
    k * spacing - half,
  ];

  // bonds: every axis-aligned neighbour pair
  const bonds: [number[], number[]][] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (i + 1 < N) bonds.push([site(i, j, k), site(i + 1, j, k)]);
        if (j + 1 < N) bonds.push([site(i, j, k), site(i, j + 1, k)]);
        if (k + 1 < N) bonds.push([site(i, j, k), site(i, j, k + 1)]);
      }
    }
  }

  const anchors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.45) {
      // atom cluster at a lattice site
      const gi = (Math.random() * N) | 0;
      const gj = (Math.random() * N) | 0;
      const gk = (Math.random() * N) | 0;
      const [x, y, z] = site(gi, gj, gk);
      anchors[i * 3] = x + gauss() * 0.07;
      anchors[i * 3 + 1] = y + gauss() * 0.07;
      anchors[i * 3 + 2] = z + gauss() * 0.07;
    } else {
      // along a bond
      const [a, b] = bonds[(Math.random() * bonds.length) | 0];
      const f = Math.random();
      anchors[i * 3] = a[0] + (b[0] - a[0]) * f + gauss() * 0.02;
      anchors[i * 3 + 1] = a[1] + (b[1] - a[1]) * f + gauss() * 0.02;
      anchors[i * 3 + 2] = a[2] + (b[2] - a[2]) * f + gauss() * 0.02;
    }
  }
  return anchors;
}

/* Fully dispersed cloud — a big loose volume the particles scatter into */
function dispersedAnchors(count: number): Float32Array {
  const anchors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 11 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const z = Math.random() * 2 - 1;
    const s = Math.sqrt(1 - z * z);
    anchors[i * 3] = r * s * Math.cos(theta);
    anchors[i * 3 + 1] = r * s * Math.sin(theta);
    anchors[i * 3 + 2] = r * z * 0.5;
  }
  return anchors;
}

/* Cursive "JA" monogram — rasterize text to a canvas, sample lit pixels.
   Big, airy, and centered slightly above the screen midline. */
function monogramAnchors(count: number): Float32Array {
  const cw = 640;
  const ch = 360;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = '700 260px "Dancing Script", "Segoe Script", cursive';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // draw the letters separately with a modest gap between them
  ctx.fillText("J", cw / 2 - 60, ch / 2 + 10);
  ctx.fillText("A", cw / 2 + 68, ch / 2 + 10);

  const data = ctx.getImageData(0, 0, cw, ch).data;
  const lit: [number, number][] = [];
  let minX = cw;
  let maxX = 0;
  for (let y = 0; y < ch; y += 2) {
    for (let x = 0; x < cw; x += 2) {
      if (data[(y * cw + x) * 4 + 3] > 128) {
        lit.push([x, y]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  // center on the actual glyph bounds, not the canvas
  const cx = (minX + maxX) / 2;

  const SCALE = 9.2 / cw;
  const Y_OFF = 0.7; // sit above the footer's email block
  const anchors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    if (i % 100 < 34) {
      // roughly a third of the particles draw the letters — additive
      // blending makes denser strokes blindingly bright otherwise
      const [px, py] = lit[(Math.random() * lit.length) | 0];
      anchors[i * 3] = (px - cx) * SCALE + (Math.random() - 0.5) * 0.06;
      anchors[i * 3 + 1] = -(py - ch / 2) * SCALE + Y_OFF + (Math.random() - 0.5) * 0.06;
      anchors[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    } else {
      // the rest settle as faint dust far around the monogram
      const r = 7 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const z = Math.random() * 2 - 1;
      const s = Math.sqrt(1 - z * z);
      anchors[i * 3] = r * s * Math.cos(theta);
      anchors[i * 3 + 1] = r * s * Math.sin(theta) * 0.7;
      anchors[i * 3 + 2] = r * z * 0.4 - 2;
    }
  }
  return anchors;
}

/* ——— Star palette ———
   Warm-only, per the Heritage system (the palette never cools): ivory
   white for the hot cores, the two lamplight golds, crimson flare as
   punctuation, and a brass highlight. Weights are cumulative. */
const PALETTE: [number, number, number][] = [
  [0.969, 0.933, 0.863], // ivory white
  [1.0, 0.831, 0.361],   // lamplight flare
  [0.957, 0.753, 0.137], // lamplight gold
  [0.969, 0.388, 0.467], // crimson flare
  [0.918, 0.886, 0.824], // brass highlight
];
const PALETTE_CDF = [0.22, 0.47, 0.7, 0.88, 1.0];

const VERT = /* glsl */ `
  attribute vec3 aPosB;
  attribute vec2 aOffset;
  attribute float aScale;
  attribute float aBright;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aRate;
  varying vec3 vColor;
  varying float vBrightness;
  varying float vDiameter;
  varying float vRays;
  varying float vOpacity;
  uniform float uPixelRatio;
  uniform float uBlend;
  uniform float uTime;
  uniform float uBreathe;
  uniform float uTwinkle;
  uniform float uAlpha;
  uniform float uAspect;
  uniform float uLensActive;
  uniform vec2 uLensPointer;
  uniform float uLensRadius;

  void main() {
    vec3 p = mix(position, aPosB, uBlend);
    p.x += sin(uTime * 0.8 + aPhase) * uBreathe + aOffset.x;
    p.y += cos(uTime * 0.7 + aPhase) * uBreathe + aOffset.y;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;

    // 1.0 at the camera's rest distance; nearer stars grow, farther shrink.
    // Capped so the dispersed cloud's near-camera stars don't become
    // screen-filling blobs (fill-rate, and they look like smudges)
    float depthScale = min(7.0 / max(-mv.z, 0.5), 1.8);
    float depthFade = 0.45 + 0.55 * smoothstep(14.0, 4.0, -mv.z);

    // slow per-star twinkle — never below 86% so nothing blinks
    float twinkle = 1.0 - uTwinkle * 0.14 * (0.5 + 0.5 * sin(aPhase * 7.0 + uTime * aRate));
    float bright = aBright * twinkle;

    // base diameter in device pixels: dust at ~1px, typical stars 3–4px,
    // the bright tier gets a wider disc so its halo reads as a halo
    float size = uPixelRatio * (0.5 + aScale * 4.2) * depthScale
      * (1.0 + smoothstep(1.2, 3.5, aBright) * 1.6);

    // cursor lens: stars near the pointer magnify, brighten and lift
    // toward the camera — evaluated here, so it costs the CPU nothing
    float lens = 0.0;
    if (uLensActive > 0.0) {
      vec2 ndc = clip.xy / max(clip.w, 0.0001);
      float d = length((ndc - uLensPointer) * vec2(uAspect, 1.0));
      lens = (1.0 - smoothstep(0.0, uLensRadius, d)) * uLensActive;
      mv.z += lens * 0.9;
      clip = projectionMatrix * mv;
    }
    bright *= 1.0 + lens * 0.9;
    size *= 1.0 + lens * 0.55;

    vDiameter = size;
    gl_PointSize = max(size, 4.0);
    gl_Position = clip;

    vColor = aColor;
    vBrightness = bright * depthFade;
    // the scroll fade scales coverage, not brightness: colour adds as
    // emission × alpha, so the fade stays linear and a fully faded field
    // writes nothing to the canvas (no stray opaque alpha, no fill cost)
    vOpacity = uAlpha;
    vRays = smoothstep(1.4, 2.6, aBright);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vBrightness;
  varying float vDiameter;
  varying float vRays;
  varying float vOpacity;

  // cubic B-spline footprint — lets a sub-4px star render as a stable,
  // correctly-dim speck instead of an aliased flicker
  float cubicCoverage(float c) {
    float x = abs(c);
    if (x < 1.0) return (4.0 - 6.0 * x * x + 3.0 * x * x * x) / 6.0;
    float t = max(2.0 - x, 0.0);
    return t * t * t / 6.0;
  }

  void main() {
    vec2 pixel = (gl_PointCoord - 0.5) * max(vDiameter, 4.0);
    vec2 pt = pixel * 2.0 / max(vDiameter, 0.0001);
    float r = length(pt);

    // soft disc with a hot centre, plus a faint four-point ray cross on
    // the bright tier only
    float disc = 1.0 - smoothstep(0.08, 1.0, r);
    float core = pow(disc, 2.2);
    float hRay = exp(-abs(pt.y) * 28.0) * (1.0 - smoothstep(0.18, 1.0, abs(pt.x)));
    float vRay = exp(-abs(pt.x) * 28.0) * (1.0 - smoothstep(0.18, 1.0, abs(pt.y)));
    float rays = max(hRay, vRay) * 0.28 * vRays;

    float resolved = smoothstep(2.0, 4.0, vDiameter);
    float filtered = cubicCoverage(pixel.x) * cubicCoverage(pixel.y) * 0.1509 * vDiameter * vDiameter;
    float alpha = mix(filtered, max(core, rays), resolved) * vOpacity;
    if (alpha <= 0.002) discard;

    // brightness above ~1 pushes the colour toward white-hot; saturated
    // colours get a small energy boost so they don't read as muddy
    float whiteCore = smoothstep(0.9, 2.8, vBrightness) * 0.82;
    float colorEnergy = 1.0 - min(vColor.r, min(vColor.g, vColor.b));
    vec3 emission = mix(vColor, vec3(1.0, 0.98, 0.94), whiteCore) * vBrightness * (1.0 + colorEnergy * 0.42);

    gl_FragColor = vec4(emission, alpha);
  }
`;

const ParticleField = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = particleBudget();
    // soft additive sprites look identical at 1.5x and 2x, and 2x costs
    // 78% more fill on the GPU that also has to composite the page
    const maxDpr = () => 1.5;

    /* three r185 requires WebGL2 and throws when no context can be created
       (Safari Lockdown Mode, old Safari, GPU off) — skip the field, keep the site */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return;
    }
    /* Adaptive resolution: start at native (capped) DPR; if frame times stay
       high the soft additive sprites tolerate a lower ratio with no visible
       change, so step down rather than let the whole page stutter. */
    let dpr = Math.min(window.devicePixelRatio, maxDpr());
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    /* ——— Anchor sets: lattice → knot → dispersed → JA ——— */
    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.5, 220, 36);
    const shapes = [
      cubeLatticeAnchors(COUNT),
      sampleMeshAnchors(knotGeo, COUNT),
      dispersedAnchors(COUNT),
      monogramAnchors(COUNT),
    ];
    knotGeo.dispose();

    // Measured bounding-sphere radius of an anchor set (unscaled, about the
    // origin the shape rotates around) — used to keep it inside the frustum
    // and to know when the cursor is close enough to matter.
    const reachOf = (a: Float32Array) => {
      let max = 0;
      for (let i = 0; i < a.length; i += 3) {
        const d = a[i] * a[i] + a[i + 1] * a[i + 1] + a[i + 2] * a[i + 2];
        if (d > max) max = d;
      }
      return Math.sqrt(max);
    };
    const REACHES = shapes.map(reachOf);
    const CUBE_REACH = REACHES[0];
    const KNOT_REACH = REACHES[1];

    /* ——— Choreography tracks over page progress p ∈ [0, 1] ———
       hero: cube beside the name · experience: knot at right margin ·
       projects: fully dispersed & faded · footer: converge into "JA".
       Positions derive from the live camera frustum so every aspect
       ratio — phone, tablet, ultrawide — composes correctly. */
    const MONOGRAM_WIDTH = 7.4; // approx world width of the sampled "JA"
    const buildTracks = () => {
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const narrow = window.innerWidth < 1024;
      const MARGIN = 0.92; // keep ~8% air between any shape and the frame edge
      // A rotating shape sweeps its whole bounding sphere, and points on the
      // near side of the sphere project wider — sqrt(1 + k²) is the exact
      // worst-case widening for a sphere in a perspective frustum.
      const sweepX = Math.sqrt(1 + (halfW / camera.position.z) ** 2);
      const sweepY = Math.sqrt(1 + (halfH / camera.position.z) ** 2);
      // largest bounding radius that still fits when the shape is centered
      const maxR = Math.min((MARGIN * halfW) / sweepX, (MARGIN * halfH) / sweepY);
      // cube: right of the hero text on wide screens, raised above it on narrow
      const cubeScale = Math.min(narrow ? 0.65 : 0.8, maxR / CUBE_REACH);
      const cubeR = cubeScale * CUBE_REACH;
      const startX = narrow
        ? 0
        : Math.max(0, Math.min(halfW * 0.57, MARGIN * halfW - cubeR * sweepX));
      const startY = narrow
        ? Math.max(0, Math.min(halfH * 0.52, MARGIN * halfH - cubeR * sweepY))
        : Math.min(0.15, MARGIN * halfH - cubeR * sweepY);
      // knot: in the right margin beside the experience cards; centers itself
      // when the frame is too narrow to offset it
      const knotScale = Math.min(0.75, maxR / KNOT_REACH);
      const knotX = Math.max(0, Math.min(halfW * 0.62, MARGIN * halfW - knotScale * KNOT_REACH * sweepX));
      // monogram must fit inside the viewport with some air; when it has to
      // shrink, lift it into the upper half so it clears the contact block
      const endScale = Math.min(1, (halfW * 1.8) / MONOGRAM_WIDTH);
      const endY = endScale < 0.8 ? halfH * 0.24 : 0;
      return {
        X: [
          [0, startX], [0.05, startX], [0.13, knotX], [0.42, knotX], [0.8, 0], [1, 0],
        ] as [number, number][],
        Y: [
          [0, startY], [0.06, startY], [0.16, 0], [0.74, 0], [0.9, endY], [1, endY],
        ] as [number, number][],
        SCALE: [
          [0, cubeScale], [0.13, knotScale], [0.42, knotScale], [0.8, endScale], [1, endScale],
        ] as [number, number][],
      };
    };
    let tracks = buildTracks();

    // knot is fully formed by the time the experience section arrives (~p 0.13);
    // the monogram assembles as the toolkit scrolls away, not at the very end
    const SHAPE_TRACK: [number, number][] = [
      [0, 0], [0.04, 0], [0.13, 1], [0.4, 1], [0.58, 2], [0.76, 2], [0.92, 3], [1, 3],
    ];
    const ALPHA_TRACK: [number, number][] = [
      [0, 1], [0.4, 1], [0.56, 0], [0.74, 0], [0.86, 1], [1, 1],
    ];
    // rotation amplitude: full slow spin for the cube & knot, settling
    // to a dead-flat, front-facing monogram at the very end
    const ROT_TRACK: [number, number][] = [
      [0, 1], [0.45, 1], [0.8, 0.05], [0.92, 0], [1, 0],
    ];
    const sampleTrack = (track: [number, number][], p: number) => {
      if (p <= track[0][0]) return track[0][1];
      for (let k = 1; k < track.length; k++) {
        if (p <= track[k][0]) {
          const [p0, v0] = track[k - 1];
          const [p1, v1] = track[k];
          return v0 + ((p - p0) / (p1 - p0)) * (v1 - v0);
        }
      }
      return track[track.length - 1][1];
    };

    /* ——— Point cloud ———
       Two brightness tiers: most stars sit at 0.56–1.34 (they stay their
       own colour), ~9% at 2.0–3.5 (they blow out to white-hot cores with
       halos and rays). Each star takes a weighted palette colour, nudged
       toward a second one so no two neighbours are quite the same. */
    const scales = new Float32Array(COUNT);
    const brights = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const rates = new Float32Array(COUNT);
    const pickColor = () => {
      const r = Math.random();
      let k = 0;
      while (k < PALETTE_CDF.length - 1 && r > PALETTE_CDF[k]) k++;
      return PALETTE[k];
    };
    for (let i = 0; i < COUNT; i++) {
      scales[i] = 0.82 + Math.random() * 0.16;
      brights[i] = Math.random() < 0.07 ? 2 + Math.random() * 1.5 : 0.56 + Math.random() * 0.78;
      const a = pickColor();
      const b = pickColor();
      const mixAmt = Math.random() * 0.35;
      colors[i * 3] = a[0] + (b[0] - a[0]) * mixAmt;
      colors[i * 3 + 1] = a[1] + (b[1] - a[1]) * mixAmt;
      colors[i * 3 + 2] = a[2] + (b[2] - a[2]) * mixAmt;
      phases[i] = Math.random() * Math.PI * 2;
      rates[i] = 0.65 + Math.random() * 0.7;
    }

    const geometry = new THREE.BufferGeometry();
    // "position" holds anchor set A, aPosB holds anchor set B; the shader
    // blends between them with uBlend. Each is re-uploaded only when the
    // active pair changes (a handful of times across the whole page).
    const posA = new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3);
    const posB = new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3);
    const offsets = new Float32Array(COUNT * 2);
    const offAttr = new THREE.BufferAttribute(offsets, 2);
    offAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", posA);
    geometry.setAttribute("aPosB", posB);
    geometry.setAttribute("aOffset", offAttr);
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aBright", new THREE.BufferAttribute(brights, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aRate", new THREE.BufferAttribute(rates, 1));

    let boundA = -1;
    let boundB = -1;
    const bindShapes = (ia: number, ib: number) => {
      if (boundA !== ia) {
        (posA.array as Float32Array).set(shapes[ia]);
        posA.needsUpdate = true;
        boundA = ia;
      }
      if (boundB !== ib) {
        (posB.array as Float32Array).set(shapes[ib]);
        posB.needsUpdate = true;
        boundB = ib;
      }
    };
    bindShapes(0, 1);

    // The monogram uses a webfont — resample once it has actually loaded
    document.fonts
      .load('700 260px "Dancing Script"')
      .then(() => {
        shapes[3] = monogramAnchors(COUNT);
        REACHES[3] = reachOf(shapes[3]);
        if (boundA === 3) boundA = -1;
        if (boundB === 3) boundB = -1;
      })
      .catch(() => {});

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uPixelRatio: { value: dpr },
        uAlpha: { value: 1 },
        uBlend: { value: 0 },
        uTime: { value: 0 },
        uBreathe: { value: reducedMotion ? 0 : 0.03 },
        uTwinkle: { value: reducedMotion ? 0 : 1 },
        uAspect: { value: camera.aspect },
        uLensActive: { value: 0 },
        uLensPointer: { value: new THREE.Vector2() },
        uLensRadius: { value: 0.24 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
      // premultiplied additive: colour adds (so overlapping stars saturate
      // to white), alpha composites normally so the canvas stays correct
      // over the page background
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
      blendEquationAlpha: THREE.AddEquation,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });

    const points = new THREE.Points(geometry, material);
    // the cloud is always centered near the camera axis; culling would only
    // ever misfire against a stale bounding sphere from a previous shape
    points.frustumCulled = false;
    scene.add(points);

    /* ——— Global scroll state via GSAP ——— */
    const state = { current: 0, target: 0 };
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        state.target = self.progress;
      },
    });

    /* ——— Cursor push + spring (XY offsets, CPU-integrated) ——— */
    const velocities = new Float32Array(COUNT * 2);
    const mouseNDC = new THREE.Vector2(-10, -10);
    const mouseWorld = new THREE.Vector3(-100, -100, 0);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const localMouse = new THREE.Vector3();

    // the GPU lens follows the pointer in NDC and eases in/out so it never
    // pops when the cursor enters or leaves the window
    let lensTarget = 0;
    const lensPointer = material.uniforms.uLensPointer.value as THREE.Vector2;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // a finger has no hover
      mouseNDC.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
      lensPointer.copy(mouseNDC);
      lensTarget = 1;
    };
    const onPointerLeave = () => {
      lensTarget = 0;
      mouseWorld.set(-100, -100, 0);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const PUSH_RADIUS = 0.9;
    const PUSH_RADIUS_SQ = PUSH_RADIUS * PUSH_RADIUS;
    const PUSH = 0.026;
    const SPRING = 0.06;
    const DAMPING = 0.86;
    // an offset below ~0.001 world units is invisible — once every particle
    // is quieter than that (and the cursor is away) the physics goes idle
    const SETTLE_SQ = 1e-6;
    let physicsActive = false;

    /* ——— Frame loop ——— */
    // scroll easing: 0.07/frame at 60fps ≡ a continuous rate of ~4.35/s.
    // Applying it through exp(-k·dt) keeps the morph's designed trailing
    // feel identical whether the machine renders at 30, 60 or 144fps —
    // fast scrolling no longer leaves the particles further behind on
    // slower frames.
    const EASE_RATE = 4.35;
    const clock = new THREE.Clock();
    let lastT = 0;
    let raf = 0;
    let slowFrames = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const rawDt = t - lastT;
      lastT = t;
      const dt = Math.min(rawDt, 0.05);

      // step resolution down under sustained load (never within the first
      // couple of seconds — startup jank isn't a signal)
      if (t > 2 && dpr > 1) {
        slowFrames = rawDt > 0.023 ? slowFrames + 1 : Math.max(0, slowFrames - 2);
        if (slowFrames > 45) {
          dpr = Math.max(1, dpr - 0.25);
          renderer.setPixelRatio(dpr);
          material.uniforms.uPixelRatio.value = dpr;
          slowFrames = 0;
        }
      }

      state.current = reducedMotion
        ? state.target
        : state.current + (state.target - state.current) * (1 - Math.exp(-EASE_RATE * dt));
      const p = state.current;

      // slow continuous spin + scroll-linked turn, damped flat for the monogram
      const rotAmp = sampleTrack(ROT_TRACK, p);
      points.rotation.y = (t * 0.12 + p * Math.PI * 2) * rotAmp;
      points.rotation.x = (Math.sin(t * 0.07) * 0.22 + 0.18) * rotAmp;

      points.position.x = sampleTrack(tracks.X, p);
      points.position.y = sampleTrack(tracks.Y, p);
      points.scale.setScalar(sampleTrack(tracks.SCALE, p));
      const alpha = sampleTrack(ALPHA_TRACK, p);
      material.uniforms.uAlpha.value = alpha;
      material.uniforms.uTime.value = t;

      // fully faded (the projects section): nothing to see, so draw nothing
      // and let the GPU spend the frame on the page instead. Physics state is
      // dropped too — by the time the field returns it has long settled.
      if (alpha <= 0) {
        if (points.visible) {
          points.visible = false;
          offsets.fill(0);
          velocities.fill(0);
          offAttr.needsUpdate = true;
          physicsActive = false;
          renderer.clear();
        }
        return;
      }
      points.visible = true;
      const lensU = material.uniforms.uLensActive;
      lensU.value += (lensTarget - lensU.value) * (1 - Math.exp(-6 * dt));
      if (lensU.value < 0.002) lensU.value = 0;

      const sf = sampleTrack(SHAPE_TRACK, p);
      const i0 = Math.min(Math.floor(sf), shapes.length - 2);
      let blend = sf - i0;
      blend = blend * blend * (3 - 2 * blend);
      bindShapes(i0, i0 + 1);
      material.uniforms.uBlend.value = blend;

      localMouse.copy(mouseWorld);
      points.worldToLocal(localMouse);
      const mx = localMouse.x;
      const my = localMouse.y;

      // wake the physics only when the cursor can actually reach a particle
      const reachNow = Math.max(REACHES[i0], REACHES[i0 + 1]) + PUSH_RADIUS;
      const mouseNear = mx * mx + my * my < reachNow * reachNow;
      if (mouseNear) physicsActive = true;

      if (physicsActive) {
        const A = shapes[i0];
        const B = shapes[i0 + 1];
        // the push/spring constants are tuned per-60fps-frame; scale the
        // integration so a dropped frame doesn't slow the spring down
        const step = Math.min(rawDt * 60, 2.5);
        const damp = Math.pow(DAMPING, step);
        const springStep = SPRING * step;
        const pushStep = PUSH * step;
        let energy = 0;

        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const i2 = i * 2;

          const x = A[i3] + (B[i3] - A[i3]) * blend;
          const y = A[i3 + 1] + (B[i3 + 1] - A[i3 + 1]) * blend;

          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < PUSH_RADIUS_SQ && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const force = (1 - d / PUSH_RADIUS) * pushStep;
            velocities[i2] += (dx / d) * force;
            velocities[i2 + 1] += (dy / d) * force;
          }

          velocities[i2] -= offsets[i2] * springStep;
          velocities[i2 + 1] -= offsets[i2 + 1] * springStep;
          velocities[i2] *= damp;
          velocities[i2 + 1] *= damp;
          offsets[i2] += velocities[i2] * step;
          offsets[i2 + 1] += velocities[i2 + 1] * step;

          const e =
            velocities[i2] * velocities[i2] +
            velocities[i2 + 1] * velocities[i2 + 1] +
            offsets[i2] * offsets[i2] +
            offsets[i2 + 1] * offsets[i2 + 1];
          if (e > energy) energy = e;
        }

        if (!mouseNear && energy < SETTLE_SQ) {
          offsets.fill(0);
          velocities.fill(0);
          physicsActive = false;
        }
        offAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      dpr = Math.min(dpr, Math.min(window.devicePixelRatio, maxDpr()));
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = dpr;
      material.uniforms.uAspect.value = camera.aspect;
      tracks = buildTracks();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      trigger.kill();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  /* Slightly dimmed on phones, where the field sits directly behind text
     instead of beside it */
  return <div ref={mountRef} aria-hidden className="fixed inset-0 z-[1] pointer-events-none opacity-60 md:opacity-100" />;
};

export default ParticleField;
