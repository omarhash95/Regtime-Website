'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

interface RibbonProps {
  intensity?: number;
  speed?: number;
  parallaxStrength?: number;
}

function Ribbon({ intensity = 0.35, speed = 0.8, parallaxStrength = 0.1 }: RibbonProps) {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, pointer } = useThree();
  
  const geom = useMemo(() => new THREE.PlaneGeometry(8, 2.2, 256, 64), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPrimary: { value: new THREE.Color('#4A90E2') },
      uSecondary: { value: new THREE.Color('#5F9EA0') },
      uAccent: { value: new THREE.Color('#F0E68C') },
      uIntensity: { value: intensity },
      uSpeed: { value: speed },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
    }),
    [intensity, speed, viewport]
  );

  useFrame((state, delta) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta * speed;
      
      // Parallax mouse interaction
      const mouseX = pointer.x * parallaxStrength;
      const mouseY = pointer.y * parallaxStrength;
      mat.current.uniforms.uMouse.value.set(mouseX, mouseY);
      
      // Subtle mesh rotation for depth
      if (meshRef.current) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
        meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.01;
      }
    }
  });

  const vertex = /* glsl */`
    uniform float uTime;
    uniform float uIntensity;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main(){
      vUv = uv;
      vPosition = position;
      vec3 pos = position;
      
      // Primary wave motion
      float wave1 = sin((pos.x * 2.0 + uTime * 0.8)) * 0.06;
      float wave2 = sin((pos.x * 3.7 - uTime * 0.6)) * 0.03;
      float wave3 = cos((pos.y * 1.5 + uTime * 0.4)) * 0.02;
      
      // Mouse interaction
      float mouseInfluence = length(uMouse) * 0.1;
      float mouseDist = distance(pos.xy, uMouse * 2.0);
      float mouseWave = exp(-mouseDist * 2.0) * mouseInfluence;
      
      pos.y += (wave1 + wave2 + wave3 + mouseWave) * uIntensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }`;
    
  const fragment = /* glsl */`
    uniform float uTime;
    uniform vec3 uPrimary;
    uniform vec3 uSecondary;
    uniform vec3 uAccent;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main(){
      vec2 uv = vUv;
      
      // Dynamic gradient based on position and time
      float gradient = sin(uv.x * 3.14159) * cos(uv.y * 3.14159);
      
      // Add flowing noise
      float noise1 = sin(uv.x * 10.0 + uTime * 0.2) * cos(uv.y * 8.0 + uTime * 0.15) * 0.1;
      float noise2 = sin(uv.x * 15.0 - uTime * 0.3) * cos(uv.y * 12.0 - uTime * 0.25) * 0.05;
      gradient += (noise1 + noise2);
      
      // Mouse interaction glow
      vec2 mouseUv = (uMouse + 1.0) * 0.5; // Convert from -1,1 to 0,1
      float mouseDist = distance(uv, mouseUv);
      float mouseGlow = exp(-mouseDist * 3.0) * 0.3;
      
      // Three-color blend
      vec3 color1 = mix(uSecondary, uPrimary, smoothstep(0.0, 0.5, gradient + 0.5));
      vec3 color2 = mix(color1, uAccent, smoothstep(0.7, 1.0, gradient + mouseGlow + 0.5));
      
      // Add subtle shimmer
      float shimmer = sin(uTime * 2.0 + uv.x * 20.0) * 0.1 + 0.9;
      color2 *= shimmer;
      
      // Fade edges for seamless blending
      float edgeFade = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x) *
                      smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
      
      gl_FragColor = vec4(color2, edgeFade * 0.9);
    }`;

  return (
    <mesh ref={meshRef} geometry={geom}>
      <shaderMaterial 
        ref={mat} 
        uniforms={uniforms} 
        vertexShader={vertex} 
        fragmentShader={fragment} 
        transparent 
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface RegtimeSkyline3DProps {
  intensity?: number;
  speed?: number;
  parallaxStrength?: number;
}

export default function RegtimeSkyline3D({ 
  intensity = 0.35, 
  speed = 0.8, 
  parallaxStrength = 0.1 
}: RegtimeSkyline3DProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      frameloop="always"
    >
      <PerspectiveCamera position={[0, 0, 5]} makeDefault fov={45} />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} color="#4A90E2" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.3} 
        color="#F0E68C"
        castShadow={false}
      />
      <pointLight 
        position={[-5, 2, 3]} 
        intensity={0.2} 
        color="#5F9EA0"
      />
      
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#1a1a2e', 8, 20]} />
      
      <group position={[0, 0, 0]}>
        <Ribbon 
          intensity={intensity}
          speed={speed}
          parallaxStrength={parallaxStrength}
        />
      </group>
    </Canvas>
  );
}