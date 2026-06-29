"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import { BoxGeometry, EdgesGeometry } from "three"
import type { Group, MeshPhysicalMaterial, Points, ShaderMaterial } from "three"

const coreVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vSignal;

  void main() {
    vec3 p = position;
    float slowPulse = 0.5 + 0.5 * sin(uTime * 0.72);
    float signalA = sin(p.x * 3.6 + uTime) * sin(p.y * 3.1 - uTime * 0.7);
    float signalB = sin(p.z * 4.2 + uTime * 0.82);
    float signal = signalA * 0.65 + signalB * 0.35;

    p += normal * signal * (0.055 + slowPulse * 0.04 + uHover * 0.075);
    p *= vec3(
      1.0 + sin(uTime * 0.36) * 0.055,
      1.0 + sin(uTime * 0.36 + 2.1) * 0.075,
      1.0 + sin(uTime * 0.36 + 4.2) * 0.055
    );

    vec4 worldPosition = modelMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = worldPosition.xyz;
    vSignal = signal;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const coreFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vSignal;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.8);
    float highlight = pow(max(dot(normal, normalize(vec3(-0.45, 0.7, 0.55))), 0.0), 12.0);
    float band = 0.5 + 0.5 * sin(vWorldPosition.y * 9.0 - uTime * 0.8 + vSignal * 1.5);

    vec3 graphite = vec3(0.015, 0.022, 0.03);
    vec3 blueSteel = vec3(0.16, 0.38, 0.56);
    vec3 paleIce = vec3(0.55, 0.82, 0.92);
    vec3 warmMetal = vec3(0.55, 0.25, 0.12);

    vec3 quietMaterial = mix(graphite, blueSteel, fresnel * 0.78 + highlight * 0.24);
    vec3 activeMaterial = mix(paleIce, warmMetal, band * 0.34);
    activeMaterial *= 0.23 + fresnel * 0.55 + highlight * 0.32;

    vec3 color = mix(quietMaterial, activeMaterial, uHover * 0.72);
    color += paleIce * fresnel * (0.07 + uHover * 0.1);
    color += vec3(1.0) * highlight * 0.12;
    gl_FragColor = vec4(color, 1.0);
  }
`

function seededValue(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function ConceptCube({ reduceMotion }: { reduceMotion: boolean }) {
  const cube = useRef<Group>(null)
  const core = useRef<Group>(null)
  const coreMaterial = useRef<ShaderMaterial>(null)
  const shellMaterial = useRef<MeshPhysicalMaterial>(null)
  const stars = useRef<Points>(null)
  const hoverTarget = useRef(0)
  const { invalidate } = useThree()

  const edges = useMemo(() => {
    const geometry = new BoxGeometry(3.05, 3.05, 3.05)
    const edgeGeometry = new EdgesGeometry(geometry)
    geometry.dispose()
    return edgeGeometry
  }, [])

  const positions = useMemo(() => {
    const count = 190
    const values = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const radius = 3.8 + seededValue(index) * 4.5
      const theta = seededValue(index + 500) * Math.PI * 2
      const phi = Math.acos(2 * seededValue(index + 900) - 1)
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[index * 3 + 2] = radius * Math.cos(phi)
    }

    return values
  }, [])

  useEffect(() => () => {
    edges.dispose()
    document.body.style.cursor = ""
  }, [edges])

  useFrame((state, delta) => {
    const time = reduceMotion ? 0.85 : state.clock.elapsedTime

    if (coreMaterial.current) {
      coreMaterial.current.uniforms.uTime.value = time
      const currentHover = coreMaterial.current.uniforms.uHover.value as number
      coreMaterial.current.uniforms.uHover.value += (hoverTarget.current - currentHover) * Math.min(1, delta * 4.5)
    }

    if (shellMaterial.current) {
      const targetOpacity = hoverTarget.current ? 0.16 : 0.3
      shellMaterial.current.opacity += (targetOpacity - shellMaterial.current.opacity) * Math.min(1, delta * 4)
    }

    if (!reduceMotion && cube.current) {
      cube.current.rotation.y += delta * 0.055
      cube.current.rotation.x += (0.42 + state.pointer.y * 0.06 - cube.current.rotation.x) * 0.025
      cube.current.rotation.z += (0.08 + state.pointer.x * 0.05 - cube.current.rotation.z) * 0.025
      cube.current.scale.set(
        1 + Math.sin(time * 0.28) * 0.012,
        1 + Math.sin(time * 0.28 + 2.1) * 0.018,
        1 + Math.sin(time * 0.28 + 4.2) * 0.012,
      )
    }

    if (!reduceMotion && core.current) {
      core.current.rotation.x -= delta * 0.1
      core.current.rotation.y += delta * 0.14
    }

    if (!reduceMotion && stars.current) stars.current.rotation.y -= delta * 0.004
  })

  const setHover = (active: boolean) => {
    hoverTarget.current = active ? 1 : 0
    document.body.style.cursor = active ? "crosshair" : ""
    if (reduceMotion && coreMaterial.current && shellMaterial.current) {
      coreMaterial.current.uniforms.uHover.value = active ? 1 : 0
      shellMaterial.current.opacity = active ? 0.16 : 0.3
      invalidate()
    }
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} color="#e8f6ff" intensity={3.8} />
      <pointLight position={[-3, -2, 4]} color="#4fa7e8" intensity={22} distance={10} />

      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#dff5ff" size={0.014} transparent opacity={0.3} sizeAttenuation />
      </points>

      <group ref={cube} rotation={[0.42, -0.55, 0.08]}>
        <mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
          <boxGeometry args={[3.05, 3.05, 3.05]} />
          <meshPhysicalMaterial
            ref={shellMaterial}
            color="#020405"
            metalness={0.82}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>

        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#b9d9e8" transparent opacity={0.28} />
        </lineSegments>

        <group ref={core}>
          <mesh scale={0.98}>
            <icosahedronGeometry args={[0.94, 5]} />
            <shaderMaterial
              ref={coreMaterial}
              vertexShader={coreVertexShader}
              fragmentShader={coreFragmentShader}
              uniforms={{
                uTime: { value: 0 },
                uHover: { value: 0 },
              }}
            />
          </mesh>
          <pointLight color="#80cfff" intensity={8} distance={4} />
        </group>
      </group>
    </>
  )
}

export function SpatialScene() {
  const shouldReduceMotion = useReducedMotion() ?? false

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      frameloop={shouldReduceMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ConceptCube reduceMotion={shouldReduceMotion} />
    </Canvas>
  )
}
