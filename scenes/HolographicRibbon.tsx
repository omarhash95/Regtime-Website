'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import * as THREE from 'three';

type Hex = `#${string}`;

interface RibbonMeshProps {
  /** Visual strength of noise/glow (0–1). */
  intensity?: number;
  /** Animation speed multiplier. */
  speed?: number;
  /** Optional explicit colors (sRGB hex). If omitted, a brand preset is used. */
  colorA?: Hex;
  colorB?: Hex;
  sheenColor?: Hex;
  /** Brand presets tuned for light/dark backgrounds. */
  preset?: 'depth' | 'light' | 'mono' | 'night';
  /** Use additive blending for a brighter, glowy look (defaults to false for brand fidelity). */
  additive?: boolean;
}

function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16)/255;
  const g = parseInt(h.slice(2,4),16)/255;
  const b = parseInt(h.slice(4,6),16)/255;
  return [r,g,b];
}

/**
 * Ribbon mesh using brand-locked sRGB colors mixed in linear space.
 * Replaces previous HSV hue blending so the output stays within the Regtime palette.
 */
function RibbonMesh({
  intensity = 0.5,
  speed = 1.0,
  colorA,
  colorB,
  sheenColor,
  preset = 'depth',
  additive = false
}: RibbonMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const { shouldReduceMotion } = useReducedMotion();

  // Brand palette (canonical)
  const BRAND = {
    baby: '#78C7EA',
    alice: '#DEEDF4',
    deep:  '#496671',
    cadet: '#9CB2BC',
    night: '#111111',
    dim:   '#636363',
    white: '#FFFFFF',
    anti:  '#EBEBEB'
  } as const;

  // Presets tuned for contrast and subtlety
  const resolved = useMemo(() => {
    if (colorA && colorB) {
      return {
        A: colorA,
        B: colorB,
        sheen: sheenColor ?? BRAND.alice
      };
    }
    switch (preset) {
      case 'light':
        return { A: BRAND.alice, B: BRAND.baby, sheen: BRAND.white };
      case 'mono':
        return { A: BRAND.anti, B: BRAND.alice, sheen: BRAND.baby };
      case 'night':
        return { A: BRAND.night, B: BRAND.deep, sheen: BRAND.baby };
      case 'depth':
      default:
        return { A: BRAND.cadet, B: BRAND.deep, sheen: BRAND.baby };
    }
  }, [colorA, colorB, sheenColor, preset]);

  const shaderMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
        uColorA: { value: new THREE.Color(...hexToRGB(resolved.A)) },
        uColorB: { value: new THREE.Color(...hexToRGB(resolved.B)) },
        uSheen:  { value: new THREE.Color(...hexToRGB(resolved.sheen)) }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uIntensity;
        void main() {
          vUv = uv;
          vec3 pos = position;
          // Gentle organic warp
          pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.10 * uIntensity;
          pos.z += cos(pos.y * 1.5 + uTime * 0.3) * 0.05 * uIntensity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uColorA;  // sRGB 0..1
        uniform vec3 uColorB;  // sRGB 0..1
        uniform vec3 uSheen;   // sRGB 0..1

        // sRGB <-> linear helpers
        vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
        vec3 toSRGB(vec3 c)   { return pow(c, vec3(1.0/2.2)); }

        void main() {
          vec2 uv = vUv;

          // Base gradient shape
          float g = sin(uv.x * 3.14159) * cos(uv.y * 3.14159);
          // Animated micro-noise
          g += sin(uv.x * 10.0 + uTime * 0.2) * cos(uv.y * 8.0 + uTime * 0.15) * 0.1 * uIntensity;

          // Normalize 0..1 and ease
          float t = smoothstep(0.0, 1.0, g * 0.5 + 0.5);

          // Mix brand colors in linear space for fidelity
          vec3 A = toLinear(uColorA);
          vec3 B = toLinear(uColorB);
          vec3 base = mix(A, B, t);

          // Add subtle on-brand sheen centered on the ribbon
          float highlight = pow(1.0 - abs(t - 0.5) * 2.0, 3.0); // bell curve
          vec3 sheen = toLinear(uSheen) * highlight * 0.25 * uIntensity;

          vec3 color = toSRGB(base + sheen);

          // Soft edge fade
          float edge = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x)
                     * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

          gl_FragColor = vec4(color, edge * 0.85);
        }
      `,
      transparent: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    return mat;
  }, [intensity, viewport, resolved.A, resolved.B, resolved.sheen, additive]);

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    const time = state.clock.getElapsedTime() * speed;
    (shaderMaterial.uniforms.uTime as any).value = time;
    // Subtle parallax
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.03;
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[viewport.width * 1.2, viewport.height * 0.8, 32, 32]} />
    </mesh>
  );
}

function StaticGradient({
  // default static fallback uses brand 'depth' preset
  colorA = '#9CB2BC',
  colorB = '#496671'
}: Pick<RibbonMeshProps,'colorA'|'colorB'>) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `linear-gradient(135deg, ${colorA}, ${colorB})`,
        opacity: 0.85
      }}
    />
  );
}

interface HolographicRibbonProps extends RibbonMeshProps {
  className?: string;
}

export default function HolographicRibbon({
  className = '',
  ...ribbonProps
}: HolographicRibbonProps) {
  const { shouldReduceMotion } = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 pointer-events-none">
          <StaticGradient colorA={ribbonProps.colorA} colorB={ribbonProps.colorB} />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Suspense fallback={<StaticGradient colorA={ribbonProps.colorA} colorB={ribbonProps.colorB} />}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ pointerEvents: 'none' }}
        >
          <RibbonMesh {...ribbonProps} />
        </Canvas>
      </Suspense>
    </div>
  );
}