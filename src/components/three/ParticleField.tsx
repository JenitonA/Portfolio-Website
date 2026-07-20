import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ricardo-style particle field — deliberately NOT GPGPU:
 *
 * - Every particle gets an anchor in each of four states: a 2D silicon
 *   lattice sheet (honeycomb, procedural), a torus knot (barycentric
 *   mesh sampling), a fully dispersed scatter volume, and a "JA"
 *   monogram (sampled from rasterized canvas text).
 * - Scrolling moves ONE global state value via GSAP ScrollTrigger; particle
 *   positions are recalculated on the CPU every frame by blending between
 *   neighbouring anchor sets along a piecewise choreography track.
 * - The cursor adds an XY displacement with a push force and a spring return,
 *   integrated per-particle on the CPU.
 * - Custom shaders are used ONLY for point rendering.
 */

/* Adaptive particle budget: phones get a lighter cloud, low-core devices
   are clamped harder — the CPU integrates every particle every frame. */
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

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aTint;
  varying float vTint;
  varying float vFade;
  uniform float uPixelRatio;

  void main() {
    vTint = aTint;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (34.0 / -mv.z);
    vFade = smoothstep(14.0, 4.0, -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying float vTint;
  varying float vFade;
  uniform float uAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.08, d);

    vec3 gold = vec3(0.949, 0.760, 0.306);
    vec3 crimson = vec3(0.792, 0.216, 0.278);
    vec3 color = mix(gold, crimson, vTint);

    gl_FragColor = vec4(color, alpha * 0.42 * uAlpha * (0.4 + 0.6 * vFade));
  }
`;

const ParticleField = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = particleBudget();
    // phones don't benefit from >1.5x DPR on additive point sprites
    const maxDpr = () => (window.innerWidth < 768 ? 1.5 : 2);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr()));
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

    // The monogram uses a webfont — resample once it has actually loaded
    document.fonts
      .load('700 260px "Dancing Script"')
      .then(() => {
        shapes[3] = monogramAnchors(COUNT);
      })
      .catch(() => {});

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
      // worst-case reach of each shape from its center (incl. rotation sweep),
      // used to clamp positions so nothing pokes off screen
      const CUBE_REACH = 3.1;
      const KNOT_REACH = 2.4;
      // cube: right of the hero text on wide screens, raised above it on narrow
      const startX = narrow ? 0 : Math.max(0, Math.min(halfW * 0.57, halfW - CUBE_REACH));
      const startY = narrow ? Math.min(halfH * 0.52, halfH - CUBE_REACH * 0.85) : 0.15;
      // knot: in the right margin beside the experience cards
      const knotX = narrow
        ? halfW * 0.95
        : Math.max(0, Math.min(halfW * 0.62, halfW - KNOT_REACH));
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
          [0, narrow ? 0.65 : 0.8], [0.13, 0.75], [0.42, 0.75], [0.8, endScale], [1, endScale],
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

    /* ——— Point cloud ——— */
    const positions = new Float32Array(COUNT * 3);
    positions.set(shapes[0]);
    const sizes = new Float32Array(COUNT);
    const tints = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = 0.6 + Math.random() * 1.6;
      tints[i] = Math.random() < 0.2 ? 0.75 + Math.random() * 0.25 : Math.random() * 0.18;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", posAttr);
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aTint", new THREE.BufferAttribute(tints, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uAlpha: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
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
    const offsets = new Float32Array(COUNT * 2);
    const velocities = new Float32Array(COUNT * 2);
    const mouseNDC = new THREE.Vector2(-10, -10);
    const mouseWorld = new THREE.Vector3(-100, -100, 0);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const localMouse = new THREE.Vector3();

    const onPointerMove = (e: PointerEvent) => {
      mouseNDC.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const PUSH_RADIUS = 0.9;
    const PUSH_RADIUS_SQ = PUSH_RADIUS * PUSH_RADIUS;
    const PUSH = 0.026;
    const SPRING = 0.06;
    const DAMPING = 0.86;

    /* ——— Frame loop: CPU position recompute every frame ——— */
    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      state.current += (state.target - state.current) * (reducedMotion ? 1 : 0.07);
      const p = state.current;

      // slow continuous spin + scroll-linked turn, damped flat for the monogram
      const rotAmp = sampleTrack(ROT_TRACK, p);
      points.rotation.y = (t * 0.12 + p * Math.PI * 2) * rotAmp;
      points.rotation.x = (Math.sin(t * 0.07) * 0.22 + 0.18) * rotAmp;

      points.position.x = sampleTrack(tracks.X, p);
      points.position.y = sampleTrack(tracks.Y, p);
      points.scale.setScalar(sampleTrack(tracks.SCALE, p));
      material.uniforms.uAlpha.value = sampleTrack(ALPHA_TRACK, p);

      const sf = sampleTrack(SHAPE_TRACK, p);
      const i0 = Math.min(Math.floor(sf), shapes.length - 2);
      let blend = sf - i0;
      blend = blend * blend * (3 - 2 * blend);
      const A = shapes[i0];
      const B = shapes[i0 + 1];

      localMouse.copy(mouseWorld);
      points.worldToLocal(localMouse);
      const mx = localMouse.x;
      const my = localMouse.y;

      const breathe = reducedMotion ? 0 : 0.03;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = A[i3] + (B[i3] - A[i3]) * blend;
        let y = A[i3 + 1] + (B[i3 + 1] - A[i3 + 1]) * blend;
        const z = A[i3 + 2] + (B[i3 + 2] - A[i3 + 2]) * blend;

        x += Math.sin(t * 0.8 + phases[i]) * breathe;
        y += Math.cos(t * 0.7 + phases[i]) * breathe;

        const dx = x - mx;
        const dy = y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < PUSH_RADIUS_SQ && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const force = (1 - d / PUSH_RADIUS) * PUSH;
          velocities[i2] += (dx / d) * force;
          velocities[i2 + 1] += (dy / d) * force;
        }

        velocities[i2] -= offsets[i2] * SPRING;
        velocities[i2 + 1] -= offsets[i2 + 1] * SPRING;
        velocities[i2] *= DAMPING;
        velocities[i2 + 1] *= DAMPING;
        offsets[i2] += velocities[i2];
        offsets[i2 + 1] += velocities[i2 + 1];

        positions[i3] = x + offsets[i2];
        positions[i3 + 1] = y + offsets[i2 + 1];
        positions[i3 + 2] = z;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr()));
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, maxDpr());
      tracks = buildTracks();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      trigger.kill();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="fixed inset-0 z-[1] pointer-events-none" />;
};

export default ParticleField;
