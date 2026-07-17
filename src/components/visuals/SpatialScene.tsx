"use client"

import { useEffect, useMemo, useRef, type MutableRefObject } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  EdgesGeometry,
  type BufferAttribute,
  type BufferGeometry,
  type Group,
  type Mesh,
  type MeshPhysicalMaterial,
  type ShaderMaterial,
  Vector3,
} from "three"

const NETWORK_NODES: Array<[number, number, number]> = [
  [-0.82, 0.62, 0.24],
  [0, 0.88, -0.28],
  [0.82, 0.5, 0.2],
  [-0.78, -0.42, -0.22],
  [0, -0.82, 0.3],
  [0.8, -0.38, -0.2],
]

const NETWORK_LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 5], [5, 4], [4, 3], [3, 0],
]

const vertexShader = `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vSignal;

  void main() {
    vec3 p = position;
    float slowPulse = 0.5 + 0.5 * sin(uTime * 0.56);
    float signalA = sin(p.x * 6.0 + uTime) * sin(p.y * 5.4 - uTime * 0.72);
    float signalB = sin(p.z * 6.6 + uTime * 0.64);
    float signal = signalA * 0.65 + signalB * 0.35;

    p += normal * signal * (0.018 + slowPulse * 0.014 + uHover * 0.04);
    p *= vec3(
      1.0 + sin(uTime * 0.28) * 0.022,
      1.0 + sin(uTime * 0.28 + 2.1) * 0.03,
      1.0 + sin(uTime * 0.28 + 4.2) * 0.022
    );

    vec4 worldPosition = modelMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = worldPosition.xyz;
    vSignal = signal;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const fragmentShader = `
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
    float scan = pow(0.5 + 0.5 * sin(vWorldPosition.y * 15.0 - uTime * 1.1 + vSignal), 9.0);
    float circuit = pow(0.5 + 0.5 * sin((vWorldPosition.x + vWorldPosition.z) * 12.0 + uTime * 0.45), 14.0);

    vec3 graphite = vec3(0.012, 0.02, 0.028);
    vec3 blueSteel = vec3(0.14, 0.38, 0.58);
    vec3 paleIce = vec3(0.62, 0.9, 1.0);
    vec3 warmSignal = vec3(0.82, 0.34, 0.12);

    vec3 color = mix(graphite, blueSteel, fresnel * 0.72 + highlight * 0.18);
    color += paleIce * (scan * 0.24 + circuit * 0.12 + fresnel * 0.13);
    color += mix(paleIce, warmSignal, circuit) * uHover * (scan * 0.22 + fresnel * 0.18);
    color += vec3(1.0) * highlight * 0.1;
    gl_FragColor = vec4(color, 1.0);
  }
`

const rimVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const rimFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDirection), 0.0), 3.2);
    vec3 color = mix(vec3(0.22, 0.52, 0.72), vec3(0.72, 0.92, 1.0), fresnel);
    gl_FragColor = vec4(color, fresnel * 0.12);
  }
`

const particleVertexShader = `
  uniform float uTime;
  uniform float uHover;

  attribute float aPhase;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aWarm;

  varying float vAlpha;
  varying float vWarm;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec3 p = position;
    float drift = uTime * aSpeed;
    p.xz = rotate2d(drift) * p.xz;
    p.xy = rotate2d(drift * 0.24) * p.xy;
    p += normalize(p) * sin(uTime * 0.18 + aPhase) * 0.045;
    vAlpha = 0.16 + 0.24 * (0.5 + 0.5 * sin(aPhase + uTime * 0.22));

    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (210.0 / max(1.0, -viewPosition.z)) * (1.0 + uHover * 0.08);
    vWarm = aWarm;
  }
`

const particleFragmentShader = `
  varying float vAlpha;
  varying float vWarm;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(centered);
    float core = 1.0 - smoothstep(0.08, 0.48, distanceToCenter);
    float glow = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);

    vec3 cold = vec3(0.68, 0.88, 0.98);
    vec3 warm = vec3(1.0, 0.62, 0.38);
    vec3 color = mix(cold, warm, vWarm);
    float alpha = (core * 0.72 + glow * 0.28) * vAlpha;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

const trailVertexShader = `
  attribute float aAlpha;
  varying float vAlpha;

  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const trailFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uIntensity);
  }
`

function seededValue(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function AmbientField({
  reduceMotion,
  hoverTarget,
}: {
  reduceMotion: boolean
  hoverTarget: MutableRefObject<number>
}) {
  const material = useRef<ShaderMaterial>(null)

  const particleData = useMemo(() => {
    const count = 68
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const warmth = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
      const radius = 3.65 + seededValue(index) * 4.15
      const theta = seededValue(index + 300) * Math.PI * 2
      const phi = Math.acos(2 * seededValue(index + 700) - 1)
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[index * 3 + 2] = radius * Math.cos(phi)
      phases[index] = seededValue(index + 1100) * Math.PI * 2
      sizes[index] = 0.034 + seededValue(index + 1300) * 0.038
      speeds[index] = 0.004 + seededValue(index + 1500) * 0.007
      warmth[index] = seededValue(index + 1700) > 0.965 ? 0.42 : 0
    }

    return { positions, phases, sizes, speeds, warmth }
  }, [])

  useFrame((state, delta) => {
    const time = reduceMotion ? 0.85 : state.clock.elapsedTime

    if (material.current) {
      material.current.uniforms.uTime.value = time
      const currentHover = material.current.uniforms.uHover.value
      material.current.uniforms.uHover.value +=
        (hoverTarget.current - currentHover) * Math.min(1, delta * 3.5)
    }

  })

  return (
    <>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[particleData.phases, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[particleData.sizes, 1]} />
          <bufferAttribute attach="attributes-aSpeed" args={[particleData.speeds, 1]} />
          <bufferAttribute attach="attributes-aWarm" args={[particleData.warmth, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uHover: { value: 0 },
          }}
          transparent
          depthWrite={false}
        />
      </points>

    </>
  )
}

const TRAIL_SEGMENTS = 22

function setOrbitPosition(target: Vector3, orbitIndex: number, angle: number) {
  if (orbitIndex === 0) {
    target.set(
      Math.cos(angle) * 1.02,
      Math.sin(angle) * 0.5,
      Math.sin(angle) * 0.84,
    )
    return
  }

  target.set(
    Math.cos(angle) * 0.72,
    Math.sin(angle) * 1.03,
    Math.cos(angle) * 0.66,
  )
}

function OrbitalTracers({
  reduceMotion,
  hoverTarget,
}: {
  reduceMotion: boolean
  hoverTarget: MutableRefObject<number>
}) {
  const tracerGroups = useRef<Array<Group | null>>([])
  const trailGeometries = useRef<Array<BufferGeometry | null>>([])
  const trailMaterials = useRef<Array<ShaderMaterial | null>>([])
  const currentPosition = useMemo(() => new Vector3(), [])
  const samplePosition = useMemo(() => new Vector3(), [])

  const trailData = useMemo(() => [0, 1].map(() => {
    const positions = new Float32Array(TRAIL_SEGMENTS * 6)
    const alphas = new Float32Array(TRAIL_SEGMENTS * 2)

    for (let index = 0; index < TRAIL_SEGMENTS; index += 1) {
      const fade = Math.pow(1 - index / TRAIL_SEGMENTS, 1.65)
      alphas[index * 2] = fade
      alphas[index * 2 + 1] = Math.pow(
        1 - (index + 1) / TRAIL_SEGMENTS,
        1.65,
      )
    }

    return { positions, alphas }
  }), [])

  useEffect(() => {
    trailGeometries.current.forEach((geometry) => {
      (geometry?.getAttribute("position") as BufferAttribute | undefined)
        ?.setUsage(DynamicDrawUsage)
    })
  }, [])

  useFrame((state, delta) => {
    const time = reduceMotion ? 0.85 : state.clock.elapsedTime

    for (let orbitIndex = 0; orbitIndex < 2; orbitIndex += 1) {
      const speed = (0.28 + orbitIndex * 0.055) * (1 + hoverTarget.current * 0.58)
      const angle = time * speed + orbitIndex * 2.15
      const completionPulse = Math.pow(Math.max(0, Math.cos(angle)), 18)
      const tracer = tracerGroups.current[orbitIndex]

      if (tracer) {
        setOrbitPosition(currentPosition, orbitIndex, angle)
        tracer.position.copy(currentPosition)
        tracer.scale.setScalar(
          0.9 + hoverTarget.current * 0.14 + completionPulse * 0.22,
        )
      }

      const geometry = trailGeometries.current[orbitIndex]
      if (geometry) {
        const positions = trailData[orbitIndex].positions
        const tailLength = orbitIndex === 0 ? 1.34 : 1.18

        for (let segment = 0; segment < TRAIL_SEGMENTS; segment += 1) {
          const fromAngle = angle - (segment / TRAIL_SEGMENTS) * tailLength
          const toAngle = angle - ((segment + 1) / TRAIL_SEGMENTS) * tailLength
          setOrbitPosition(samplePosition, orbitIndex, fromAngle)
          positions.set(samplePosition.toArray(), segment * 6)
          setOrbitPosition(samplePosition, orbitIndex, toAngle)
          positions.set(samplePosition.toArray(), segment * 6 + 3)
        }

        geometry.getAttribute("position").needsUpdate = true
      }

      const material = trailMaterials.current[orbitIndex]
      if (material) {
        const targetIntensity = 0.5 + hoverTarget.current * 0.34 + completionPulse * 0.16
        material.uniforms.uIntensity.value +=
          (targetIntensity - material.uniforms.uIntensity.value) * Math.min(1, delta * 4)
      }
    }
  })

  return (
    <>
      {[0, 1].map((orbitIndex) => (
        <group key={`orbit-${orbitIndex}`}>
          <lineSegments frustumCulled={false}>
            <bufferGeometry
              ref={(geometry) => {
                trailGeometries.current[orbitIndex] = geometry
              }}
            >
              <bufferAttribute
                attach="attributes-position"
                args={[trailData[orbitIndex].positions, 3]}
              />
              <bufferAttribute
                attach="attributes-aAlpha"
                args={[trailData[orbitIndex].alphas, 1]}
              />
            </bufferGeometry>
            <shaderMaterial
              ref={(material) => {
                trailMaterials.current[orbitIndex] = material
              }}
              vertexShader={trailVertexShader}
              fragmentShader={trailFragmentShader}
              uniforms={{
                uColor: {
                  value: new Color(orbitIndex === 0 ? "#bfeeff" : "#f0a06c"),
                },
                uIntensity: { value: 0.5 },
              }}
              transparent
              depthWrite={false}
            />
          </lineSegments>

          <group
            ref={(tracer) => {
              tracerGroups.current[orbitIndex] = tracer
            }}
          >
            <mesh>
              <sphereGeometry args={[orbitIndex === 0 ? 0.032 : 0.028, 12, 12]} />
              <meshBasicMaterial
                color={orbitIndex === 0 ? "#d8f5ff" : "#ffc093"}
              />
            </mesh>
            <pointLight
              color={orbitIndex === 0 ? "#91ddff" : "#f09560"}
              intensity={orbitIndex === 0 ? 1.5 : 1.2}
              distance={1.25}
            />
          </group>
        </group>
      ))}
    </>
  )
}

function SystemCore({ reduceMotion }: { reduceMotion: boolean }) {
  const shell = useRef<Group>(null)
  const core = useRef<Group>(null)
  const network = useRef<Group>(null)
  const pulses = useRef<Array<Mesh | null>>([])
  const coreMaterial = useRef<ShaderMaterial>(null)
  const shellMaterial = useRef<MeshPhysicalMaterial>(null)
  const hoverTarget = useRef(0)
  const { invalidate } = useThree()

  const shellEdges = useMemo(() => {
    const geometry = new BoxGeometry(2.9, 2.9, 2.9)
    const edges = new EdgesGeometry(geometry)
    geometry.dispose()
    return edges
  }, [])

  const connectionPositions = useMemo(() => {
    const values = new Float32Array(NETWORK_LINKS.length * 6)
    NETWORK_LINKS.forEach(([fromIndex, toIndex], index) => {
      values.set(NETWORK_NODES[fromIndex], index * 6)
      values.set(NETWORK_NODES[toIndex], index * 6 + 3)
    })
    return values
  }, [])

  useEffect(() => () => {
    shellEdges.dispose()
    document.body.style.cursor = ""
  }, [shellEdges])

  useFrame((state, delta) => {
    const time = reduceMotion ? 0.85 : state.clock.elapsedTime
    const entrance = reduceMotion ? 1 : Math.min(1, time / 1.8)
    const entranceEase = 1 - Math.pow(1 - entrance, 3)

    if (coreMaterial.current) {
      coreMaterial.current.uniforms.uTime.value = time
      const currentHover = coreMaterial.current.uniforms.uHover.value
      coreMaterial.current.uniforms.uHover.value +=
        (hoverTarget.current - currentHover) * Math.min(1, delta * 4.5)
    }

    if (shellMaterial.current) {
      const targetOpacity = hoverTarget.current ? 0.035 : 0.08
      shellMaterial.current.opacity +=
        (targetOpacity - shellMaterial.current.opacity) * Math.min(1, delta * 4)
    }

    if (!reduceMotion && shell.current) {
      shell.current.rotation.y += delta * 0.035
      shell.current.rotation.x +=
        (0.36 + state.pointer.y * 0.045 - shell.current.rotation.x) * 0.022
      shell.current.rotation.z +=
        (0.06 + state.pointer.x * 0.04 - shell.current.rotation.z) * 0.022
      const introScale = 0.92 + entranceEase * 0.08
      shell.current.scale.set(
        introScale * (1 + Math.sin(time * 0.24) * 0.008),
        introScale * (1 + Math.sin(time * 0.24 + 2.1) * 0.012),
        introScale * (1 + Math.sin(time * 0.24 + 4.2) * 0.008),
      )
    }

    if (!reduceMotion && core.current) {
      core.current.rotation.x -= delta * 0.055
      core.current.rotation.y += delta * 0.09
    }

    if (!reduceMotion && network.current) {
      network.current.rotation.y -= delta * 0.04
      network.current.rotation.z = Math.sin(time * 0.18) * 0.08
      const scale = 1 + hoverTarget.current * 0.045 + Math.sin(time * 0.32) * 0.008
      network.current.scale.setScalar(scale)
    }

    pulses.current.forEach((pulse, index) => {
      if (!pulse) return
      const [fromIndex, toIndex] = NETWORK_LINKS[(index * 4 + 6) % NETWORK_LINKS.length]
      const from = NETWORK_NODES[fromIndex]
      const to = NETWORK_NODES[toIndex]
      const progress = (time * (0.075 + index * 0.008) + index / pulses.current.length) % 1
      pulse.position.set(
        from[0] + (to[0] - from[0]) * progress,
        from[1] + (to[1] - from[1]) * progress,
        from[2] + (to[2] - from[2]) * progress,
      )
      pulse.scale.setScalar(
        0.62 + Math.sin(progress * Math.PI) * 0.28 + hoverTarget.current * 0.18,
      )
    })

  })

  const setHover = (active: boolean) => {
    hoverTarget.current = active ? 1 : 0
    document.body.style.cursor = active ? "crosshair" : ""

    if (reduceMotion && coreMaterial.current && shellMaterial.current) {
      coreMaterial.current.uniforms.uHover.value = active ? 1 : 0
      shellMaterial.current.opacity = active ? 0.035 : 0.08
      invalidate()
    }
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 6]} color="#e8f6ff" intensity={3.2} />
      <pointLight position={[-3, -2, 4]} color="#4fa7e8" intensity={18} distance={10} />
      <pointLight position={[0.8, 1.2, 2.2]} color="#d9f4ff" intensity={5.5} distance={5} />

      <AmbientField reduceMotion={reduceMotion} hoverTarget={hoverTarget} />

      <group ref={shell} rotation={[0.36, -0.5, 0.06]}>
        <OrbitalTracers reduceMotion={reduceMotion} hoverTarget={hoverTarget} />
        <mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
          <boxGeometry args={[2.9, 2.9, 2.9]} />
          <meshPhysicalMaterial
            ref={shellMaterial}
            color="#020405"
            metalness={0.82}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>

        <lineSegments geometry={shellEdges}>
          <lineBasicMaterial color="#b9d9e8" transparent opacity={0.24} />
        </lineSegments>

        <group ref={network}>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[connectionPositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#8fd8ff" transparent opacity={0.24} />
          </lineSegments>

          {NETWORK_NODES.map((node, index) => (
            <mesh key={index} position={node}>
              <sphereGeometry args={[index === 2 ? 0.021 : 0.016, 8, 8]} />
              <meshBasicMaterial
                color={index === 2 ? "#ffc79f" : "#b9ecff"}
                transparent
                opacity={index === 2 ? 0.68 : 0.42}
              />
            </mesh>
          ))}

          {Array.from({ length: 3 }, (_, index) => (
            <mesh
              key={`pulse-${index}`}
              ref={(mesh) => {
                pulses.current[index] = mesh
              }}
            >
              <sphereGeometry args={[0.024, 8, 8]} />
              <meshBasicMaterial color={index === 2 ? "#ffb077" : "#d6f5ff"} />
            </mesh>
          ))}
        </group>

        <group ref={core} scale={0.72}>
          <mesh>
            <icosahedronGeometry args={[0.94, 2]} />
            <shaderMaterial
              ref={coreMaterial}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              uniforms={{ uTime: { value: 0 }, uHover: { value: 0 } }}
            />
          </mesh>
          <mesh scale={1.018} rotation={[0.04, -0.06, 0.03]}>
            <icosahedronGeometry args={[0.94, 2]} />
            <meshBasicMaterial
              color="#a9e5ff"
              wireframe
              transparent
              opacity={0.09}
              depthWrite={false}
            />
          </mesh>
          <mesh scale={1.115}>
            <icosahedronGeometry args={[0.94, 3]} />
            <shaderMaterial
              vertexShader={rimVertexShader}
              fragmentShader={rimFragmentShader}
              transparent
              depthWrite={false}
            />
          </mesh>
          <pointLight color="#80cfff" intensity={5.5} distance={3.4} />
        </group>
        <pointLight position={[1.15, -0.58, 0.24]} color="#e98b58" intensity={2.6} distance={3} />
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
      <SystemCore reduceMotion={shouldReduceMotion} />
    </Canvas>
  )
}
