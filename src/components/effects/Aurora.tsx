import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

import "./Aurora.css";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform vec2 uMouse;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Mouse interaction: a gaussian bump centered on the cursor's x position
  // bends the ribbon toward/away from the cursor, and the whole field sways
  // slightly with horizontal mouse travel.
  float mouseBump = exp(-pow((uv.x - uMouse.x) * 4.0, 2.0));
  float sway = (uMouse.x - 0.5) * 0.6;

  float height = snoise(vec2(uv.x * 2.0 + sway + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height += mouseBump * (uMouse.y - 0.5) * 0.9 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  time?: number;
}

export default function Aurora(props: AuroraProps) {
  const { colorStops = ["#5227FF", "#7cff67", "#5227FF"], amplitude = 1.0, blend = 0.5 } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    /* WebGL may be unavailable (Safari Lockdown Mode, GPU blocklists) and the
       shader needs WebGL2 — degrade to no aurora instead of crashing the app */
    let renderer: Renderer;
    try {
      // no MSAA: the aurora is a single fullscreen triangle, so antialiasing
      // has nothing to smooth and only costs fill rate
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false
      });
    } catch {
      return;
    }
    if (!renderer.gl || !renderer.isWebgl2) return;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uMouse: { value: [0.5, 0.5] }
      }
    });

    // Mouse tracking (normalized to the container, y-up to match UV space).
    // The handler only records raw client coords; the (layout-forcing)
    // getBoundingClientRect read happens at most once per rendered frame.
    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    const lastPointer = { x: -1, y: -1 };
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      lastPointer.x = event.clientX;
      lastPointer.y = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener("resize", resize);

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    // Color-stop uniforms are recomputed only when the prop actually changes —
    // parsing three hex colors into fresh arrays every frame is pure GC churn
    let cachedStops = colorStops;
    let cachedStopValues = colorStopsArray;

    let animateId = 0;
    let running = false;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      // Ease the uniform toward the cursor for a fluid, lag-behind feel
      if (lastPointer.x >= 0) {
        const rect = ctn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetMouse.x = Math.min(Math.max((lastPointer.x - rect.left) / rect.width, 0), 1);
          targetMouse.y = Math.min(Math.max(1 - (lastPointer.y - rect.top) / rect.height, 0), 1);
        }
      }
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      const stops = propsRef.current.colorStops ?? colorStops;
      if (stops !== cachedStops) {
        cachedStops = stops;
        cachedStopValues = stops.map(hex => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
      }
      program.uniforms.uColorStops.value = cachedStopValues;
      renderer.render({ scene: mesh });
    };

    // The aurora lives in the hero band: once it scrolls out of view its
    // render loop stops entirely instead of burning GPU behind the page
    const start = () => {
      if (running) return;
      running = true;
      animateId = requestAnimationFrame(update);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animateId);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    io.observe(ctn);

    resize();

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return <div ref={ctnDom} className="aurora-container" />;
}
