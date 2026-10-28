"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  MathUtils,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Quaternion,
  Vector3,
} from "three"

type Point = [number, number, number]
type Edge = [Point, Point]
type SceneComposition = "phone" | "tablet" | "desktop"

const CUBE_ROTATION: [number, number, number] = [Math.atan(1 / Math.sqrt(2)), -Math.PI / 4, 0]

const COMPOSITION = {
  phone: {
    cubePosition: [0.04, 0.508, 0.16] as Point,
    cubeScale: 0.84,
    pedestalPosition: [0.04, -1.42, 0.22] as Point,
    pedestalWidth: 3.5,
    pedestalDepth: 1.48,
    cameraPosition: [0, 0.08, 6.55] as Point,
    cameraFov: 37,
  },
  tablet: {
    cubePosition: [0.18, 0.387, 0.18] as Point,
    cubeScale: 0.78,
    pedestalPosition: [0.18, -1.42, 0.22] as Point,
    pedestalWidth: 3.6,
    pedestalDepth: 1.54,
    cameraPosition: [0, 0.12, 7.2] as Point,
    cameraFov: 36,
  },
  desktop: {
    cubePosition: [0.34, 0.046, 0.2] as Point,
    cubeScale: 0.61,
    pedestalPosition: [0.34, -1.42, 0.22] as Point,
    pedestalWidth: 3.3,
    pedestalDepth: 1.5,
    cameraPosition: [0, 0.2, 7.8] as Point,
    cameraFov: 35,
  },
} satisfies Record<SceneComposition, {
  cubePosition: Point
  cubeScale: number
  pedestalPosition: Point
  pedestalWidth: number
  pedestalDepth: number
  cameraPosition: Point
  cameraFov: number
}>

const WHITE_EDGES: Edge[] = [
  [[-1.16, 1.16, -1.16], [1.16, 1.16, -1.16]],
  [[-1.16, 1.16, -1.16], [-1.16, 1.16, 1.16]],
  [[-1.16, 1.16, 1.16], [1.16, 1.16, 1.16]],
  [[-1.16, 1.16, 1.16], [-1.16, -1.16, 1.16]],
  [[-1.16, -1.16, 1.16], [1.16, -1.16, 1.16]],
]

const CYAN_EDGES: Edge[] = [
  [[1.16, 1.16, -1.16], [1.16, 1.16, 1.16]],
  [[1.16, 1.16, 1.16], [1.16, -1.16, 1.16]],
  [[1.16, -1.16, 1.16], [1.16, -1.16, -1.16]],
  [[1.16, -1.16, -1.16], [1.16, 1.16, -1.16]],
]

function Beam({
  from,
  to,
  color,
  glow = false,
  opacity = 1,
  radius = 0.019,
}: {
  from: Point
  to: Point
  color: string
  glow?: boolean
  opacity?: number
  radius?: number
}) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new Vector3(...from)
    const end = new Vector3(...to)
    const direction = end.clone().sub(start)
    return {
      position: start.clone().add(end).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize()),
      length: direction.length(),
    }
  }, [from, to])
  const geometry = useMemo(
    () => new RoundedBoxGeometry(radius * 2, length - radius * 2, radius * 2, 2, radius * 0.22),
    [length, radius],
  )

  return (
    <group position={position} quaternion={quaternion}>
      {glow && (
        <mesh renderOrder={2}>
          <cylinderGeometry args={[radius * 2.7, radius * 2.7, length, 12]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.1} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
      <mesh renderOrder={3} geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glow ? 0.7 : 0.8}
          metalness={0.2}
          roughness={0.19}
          clearcoat={1}
          clearcoatRoughness={0.12}
          transparent={opacity < 1}
          opacity={opacity}
          depthWrite={opacity > 0.5}
        />
      </mesh>
    </group>
  )
}

function WireCube() {
  const joints = useMemo(() => {
    const points = new Map<string, Point>()
    for (const edge of [...WHITE_EDGES, ...CYAN_EDGES]) {
      for (const point of edge) points.set(point.join(","), point)
    }
    return [...points.values()]
  }, [])
  const jointGeometry = useMemo(() => new RoundedBoxGeometry(0.104, 0.104, 0.104, 2, 0.01144), [])
  return (
    <group>
      {WHITE_EDGES.map(([from, to], index) => (
        <Beam key={`white-${index}`} from={from} to={to} color="#f7ffff" radius={0.052} />
      ))}
      {CYAN_EDGES.map(([from, to], index) => (
        <Beam key={`cyan-${index}`} from={from} to={to} color="#08e8f4" glow radius={0.052} />
      ))}
      {joints.map((point) => (
        <mesh key={point.join(",")} position={point} geometry={jointGeometry}>
          <meshPhysicalMaterial color={point[0] > 0 ? "#08e8f4" : "#f7ffff"} emissive={point[0] > 0 ? "#08e8f4" : "#f7ffff"} emissiveIntensity={point[0] > 0 ? 0.7 : 0.8} metalness={0.2} roughness={0.19} clearcoat={1} clearcoatRoughness={0.12} />
        </mesh>
      ))}
    </group>
  )
}

function terrainHeight(x: number, z: number) {
  const rearRidge = Math.exp(-Math.pow((z + 2.2) / 1.65, 2))
  const focalRise = Math.exp(-Math.pow((x - 2.15) / 3.2, 2))
  return -2.08 + Math.sin(x * 1.08 + z * 0.62) * 0.11 + Math.sin(x * 2.35 - z * 1.1) * 0.045 + Math.sin(x * 7.1 + z * 3.3) * 0.013 + rearRidge * focalRise * 0.62
}

function Terrain() {
  const geometry = useMemo(() => {
    const result = new PlaneGeometry(14, 8, 56, 28)
    result.rotateX(-Math.PI / 2)
    const positions = result.getAttribute("position")
    for (let index = 0; index < positions.count; index += 1) {
      positions.setY(index, terrainHeight(positions.getX(index), positions.getZ(index)))
    }
    positions.needsUpdate = true
    result.computeVertexNormals()
    return result
  }, [])

  return (
    <mesh geometry={geometry} position={[0, 0, -0.35]}>
      <meshStandardMaterial color="#071012" emissive="#042024" emissiveIntensity={0.15} metalness={0.38} roughness={0.62} />
    </mesh>
  )
}

function Dust({ lowQuality }: { lowQuality: boolean }) {
  const geometry = useMemo(() => {
    const positions: number[] = []
    const count = lowQuality ? 24 : 48
    for (let index = 0; index < count; index += 1) {
      const seed = Math.sin(index * 91.17) * 10000
      const fraction = seed - Math.floor(seed)
      positions.push((fraction - 0.5) * 10, -1.35 + ((index * 37) % 100) / 58, -3 + ((index * 61) % 100) / 18)
    }
    const result = new BufferGeometry()
    result.setAttribute("position", new Float32BufferAttribute(positions, 3))
    return result
  }, [lowQuality])
  return <points geometry={geometry}><pointsMaterial color="#d5ffff" size={0.015} transparent opacity={0.2} depthWrite={false} /></points>
}

function SurfacePool({ color, opacity }: { color: string; opacity: number }) {
  const uniforms = useMemo(() => ({ tint: { value: new Color(color) }, alpha: { value: opacity } }), [color, opacity])
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      uniforms={uniforms}
      vertexShader={`varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
      fragmentShader={`uniform vec3 tint; uniform float alpha; varying vec2 vUv;
        void main() {
          float falloff = 1.0 - smoothstep(0.05, 0.49, length(vUv - 0.5));
          gl_FragColor = vec4(tint, alpha * falloff * falloff);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}
    />
  )
}

function Pedestal({ composition }: { composition: SceneComposition }) {
  const { pedestalDepth: depth, pedestalPosition: position, pedestalWidth: width } = COMPOSITION[composition]
  const geometry = useMemo(() => new RoundedBoxGeometry(width, 0.4, depth, 2, 0.028), [width, depth])
  return (
    <group rotation={[0, -0.07, 0]} position={position}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color="#172025" emissive="#0d1418" emissiveIntensity={0.3} metalness={0.24} roughness={0.34} clearcoat={0.5} clearcoatRoughness={0.2} />
      </mesh>
      <mesh position={[0.08, 0.205, 0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.1, 0.42, 1]}>
        <planeGeometry args={[1.5, 1.5]} />
        <SurfacePool color="#010304" opacity={0.38} />
      </mesh>
      <mesh position={[0.28, 0.207, 0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.95, 0.35, 1]}>
        <planeGeometry args={[1.5, 1.5]} />
        <SurfacePool color="#59edf4" opacity={0.18} />
      </mesh>
      <rectAreaLight position={[0.36, 0.43, 0.18]} rotation={[-Math.PI / 2, 0, 0]} color="#b7fbff" intensity={2.35} width={1.85} height={0.56} />
    </group>
  )
}

function CameraRig({ composition }: { composition: SceneComposition }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return

    const settings = COMPOSITION[composition]
    const aspectAdjustment = size.height > 0 && size.width / size.height < 0.86 ? 0.25 : 0
    camera.position.set(
      settings.cameraPosition[0],
      settings.cameraPosition[1],
      settings.cameraPosition[2] + aspectAdjustment,
    )
    camera.fov = settings.cameraFov
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, composition, invalidate, size.height, size.width])

  return null
}

function BrandScene({
  active,
  composition,
  lowQuality,
  pointerActive,
  reduceMotion,
}: {
  active: boolean
  composition: SceneComposition
  lowQuality: boolean
  pointerActive: boolean
  reduceMotion: boolean
}) {
  const sculpture = useRef<Group>(null)
  const reflection = useRef<Group>(null)
  const cyanLight = useRef<PointLight>(null)
  const motionPhase = useRef(0)
  const invalidate = useThree((state) => state.invalidate)
  const { cubePosition, cubeScale } = COMPOSITION[composition]

  useEffect(() => {
    if (!reduceMotion || !sculpture.current) return

    sculpture.current.position.set(...cubePosition)
    sculpture.current.rotation.set(...CUBE_ROTATION)
    if (reflection.current) {
      reflection.current.position.set(0, 0, 0)
      reflection.current.rotation.set(0, 0, 0)
    }
    if (cyanLight.current) cyanLight.current.position.set(2.6, 1.1, 2.5)
    invalidate()
  }, [cubePosition, invalidate, reduceMotion])

  useFrame((state, delta) => {
    if (!sculpture.current || reduceMotion || !active) return
    const frameDelta = Math.min(delta, 1 / 30)
    const response = 1 - Math.exp(-frameDelta * 2.15)
    const pointerX = pointerActive ? state.pointer.x : 0
    const pointerY = pointerActive ? state.pointer.y : 0
    motionPhase.current += frameDelta

    const yaw = Math.sin(motionPhase.current * 0.31) * 0.018
    const pitch = Math.sin(motionPhase.current * 0.23 + 0.8) * 0.01
    const levitation = Math.sin(motionPhase.current * 0.52) * 0.026

    sculpture.current.rotation.y = MathUtils.lerp(sculpture.current.rotation.y, CUBE_ROTATION[1] + yaw + pointerX * 0.052, response)
    sculpture.current.rotation.x = MathUtils.lerp(sculpture.current.rotation.x, CUBE_ROTATION[0] + pitch + pointerY * 0.032, response)
    sculpture.current.position.x = MathUtils.lerp(sculpture.current.position.x, cubePosition[0] + pointerX * 0.025, response)
    sculpture.current.position.y = MathUtils.lerp(sculpture.current.position.y, cubePosition[1] + levitation, response)
    if (reflection.current) {
      reflection.current.position.x = sculpture.current.position.x - cubePosition[0]
      reflection.current.position.y = levitation * -0.12
    }
    if (cyanLight.current) {
      cyanLight.current.position.x = MathUtils.lerp(cyanLight.current.position.x, 2.6 + pointerX * 0.34, response)
      cyanLight.current.position.y = MathUtils.lerp(cyanLight.current.position.y, 1.1 + levitation * 1.8 + pointerY * 0.16, response)
    }
  })

  return (
    <>
      <CameraRig composition={composition} />
      <fog attach="fog" args={["#020405", 5.8, 12]} />
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#e7ffff", "#010203", 0.4]} />
      <directionalLight position={[-4, 6, 5]} color="#fffdf5" intensity={4.4} />
      <pointLight ref={cyanLight} position={[2.6, 1.1, 2.5]} color="#08e8f4" intensity={lowQuality ? 9 : 12} distance={4.8} />
      <pointLight position={[-2.4, -0.4, 1.5]} color="#d8ffff" intensity={4.2} distance={4.4} />
      <spotLight position={[-0.5, 5.1, 3.6]} color="#fffaf0" intensity={28} angle={0.34} penumbra={0.86} distance={10} />
      <Terrain />
      <Dust lowQuality={lowQuality} />
      <mesh position={[0.72, -0.18, -3.9]}>
        <planeGeometry args={[4.8, 3.4]} />
        <meshBasicMaterial color="#0a777e" transparent opacity={0.025} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <Pedestal composition={composition} />
      <group position={[cubePosition[0], -1.215, cubePosition[2]]}>
        <group ref={reflection}>
          <mesh position={[-0.13, 0, 0.01]} rotation={[-Math.PI / 2, 0, -0.12]} scale={[cubeScale * 1.1, 0.12, 1]}>
            <planeGeometry args={[1.5, 1.5]} />
            <SurfacePool color="#e8ffff" opacity={0.22} />
          </mesh>
          <mesh position={[0.3, 0.001, -0.02]} rotation={[-Math.PI / 2, 0, 0.12]} scale={[cubeScale * 1.05, 0.16, 1]}>
            <planeGeometry args={[1.5, 1.5]} />
            <SurfacePool color="#36eef6" opacity={0.3} />
          </mesh>
        </group>
      </group>
      <group ref={sculpture} position={cubePosition} rotation={CUBE_ROTATION} scale={cubeScale}>
        <WireCube />
      </group>
    </>
  )
}

export function SpatialScene({
  active,
  composition,
  lowQuality,
  pointerActive,
  reduceMotion,
}: {
  active: boolean
  composition: SceneComposition
  lowQuality: boolean
  pointerActive: boolean
  reduceMotion: boolean
}) {
  const dpr: number | [number, number] = lowQuality
    ? 1
    : composition === "phone"
      ? [1, 1.25]
      : composition === "tablet"
        ? [1, 1.4]
        : [1, 1.55]

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: COMPOSITION[composition].cameraPosition, fov: COMPOSITION[composition].cameraFov }}
      frameloop={active ? "always" : "demand"}
      gl={{ alpha: true, antialias: !lowQuality, powerPreference: "high-performance" }}
    >
      <BrandScene
        active={active}
        composition={composition}
        lowQuality={lowQuality}
        pointerActive={pointerActive}
        reduceMotion={reduceMotion}
      />
    </Canvas>
  )
}
