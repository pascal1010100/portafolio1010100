"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Mesh,
  MeshPhysicalMaterial,
  Float32BufferAttribute,
  Group,
  MathUtils,
  PerspectiveCamera,
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
  [[-1.16, 1.16, -1.16], [-1.16, -1.16, -1.16]],
  [[-1.16, -1.16, -1.16], [1.16, -1.16, -1.16]],
  [[-1.16, -1.16, -1.16], [-1.16, -1.16, 1.16]],
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
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.035} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
      <mesh renderOrder={3} geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glow ? 0.16 : 0.025}
          metalness={0.48}
          roughness={0.3}
          clearcoat={0.85}
          clearcoatRoughness={0.24}
          transparent={opacity < 1}
          opacity={opacity}
          depthWrite={opacity > 0.5}
        />
      </mesh>
    </group>
  )
}

function WireCube({ active }: { active: boolean }) {
  const root = useRef<Group>(null)
  const phase = useRef(0)
  const palette = useMemo(() => ({ white: new Color("#f7ffff"), cyan: new Color("#58dce7"), position: new Vector3() }), [])
  useFrame((_state, delta) => {
    if (!root.current) return
    if (active) phase.current += Math.min(delta, 1 / 30) * 0.32
    root.current.updateWorldMatrix(true, true)
    root.current.traverse((node) => {
      if (!(node instanceof Mesh) || !(node.material instanceof MeshPhysicalMaterial)) return
      node.getWorldPosition(palette.position)
      root.current!.worldToLocal(palette.position)
      const angle = Math.atan2(palette.position.z, palette.position.x) + palette.position.y * 0.45
      const blend = Math.pow((1 + Math.cos(angle - phase.current)) / 2, 4)
      node.material.color.copy(palette.white).lerp(palette.cyan, blend)
      node.material.emissive.copy(node.material.color)
      node.material.emissiveIntensity = 0.025 + blend * 0.11
    })
  })
  const joints = useMemo(() => {
    const points = new Map<string, Point>()
    for (const edge of [...WHITE_EDGES, ...CYAN_EDGES]) {
      for (const point of edge) points.set(point.join(","), point)
    }
    return [...points.values()]
  }, [])
  const jointGeometry = useMemo(() => new RoundedBoxGeometry(0.104, 0.104, 0.104, 2, 0.01144), [])
  return (
    <group ref={root}>
      {WHITE_EDGES.map(([from, to], index) => (
        <Beam key={`white-${index}`} from={from} to={to} color="#f7ffff" radius={0.052} />
      ))}
      {CYAN_EDGES.map(([from, to], index) => (
        <Beam key={`cyan-${index}`} from={from} to={to} color="#08e8f4" radius={0.052} />
      ))}
      {joints.map((point) => (
        <mesh key={point.join(",")} position={point} geometry={jointGeometry}>
          <meshPhysicalMaterial color={point[0] > 0 ? "#08e8f4" : "#f7ffff"} emissive={point[0] > 0 ? "#08e8f4" : "#f7ffff"} emissiveIntensity={point[0] > 0 ? 0.16 : 0.025} metalness={0.48} roughness={0.3} clearcoat={0.85} clearcoatRoughness={0.24} />
        </mesh>
      ))}
    </group>
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

function CameraRig({ composition }: { composition: SceneComposition }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return

    const settings = COMPOSITION[composition]
    // A sphere enclosing the cube protects every orientation, including corners.
    const aspect = size.width / Math.max(size.height, 1)
    const verticalHalfFov = MathUtils.degToRad(settings.cameraFov / 2)
    const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect)
    const radius = Math.sqrt(3) * 1.22 * settings.cubeScale + 0.06
    const centerOffset = Math.hypot(
      settings.cubePosition[0] - settings.cameraPosition[0],
      settings.cubePosition[1] - settings.cameraPosition[1],
    )
    const safeDistance = (radius + centerOffset) / Math.sin(Math.min(verticalHalfFov, horizontalHalfFov)) * 1.12
    const cameraZ = Math.max(settings.cameraPosition[2], settings.cubePosition[2] + safeDistance)
    camera.position.set(
      settings.cameraPosition[0],
      settings.cameraPosition[1],
      cameraZ,
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
  const cyanLight = useRef<PointLight>(null)
  const motionPhase = useRef(0)
  const invalidate = useThree((state) => state.invalidate)
  const { cubePosition, cubeScale } = COMPOSITION[composition]

  useEffect(() => {
    if (!reduceMotion || !sculpture.current) return

    sculpture.current.position.set(...cubePosition)
    sculpture.current.rotation.set(...CUBE_ROTATION)
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

    const yaw = motionPhase.current * 0.14
    const pitch = motionPhase.current * 0.055
    const levitation = Math.sin(motionPhase.current * 0.52) * 0.026

    sculpture.current.rotation.y = MathUtils.lerp(sculpture.current.rotation.y, CUBE_ROTATION[1] + yaw + pointerX * 0.052, response)
    sculpture.current.rotation.x = MathUtils.lerp(sculpture.current.rotation.x, CUBE_ROTATION[0] + pitch + pointerY * 0.032, response)
    sculpture.current.rotation.z = MathUtils.lerp(sculpture.current.rotation.z, motionPhase.current * 0.025, response)
    sculpture.current.position.x = MathUtils.lerp(sculpture.current.position.x, cubePosition[0] + pointerX * 0.025, response)
    sculpture.current.position.y = MathUtils.lerp(sculpture.current.position.y, cubePosition[1] + levitation, response)
    if (cyanLight.current) {
      cyanLight.current.position.x = MathUtils.lerp(cyanLight.current.position.x, 2.6 + pointerX * 0.34, response)
      cyanLight.current.position.y = MathUtils.lerp(cyanLight.current.position.y, 1.1 + levitation * 1.8 + pointerY * 0.16, response)
    }
  })

  return (
    <>
      <CameraRig composition={composition} />
      <fog attach="fog" args={["#020405", 5.8, 12]} />
      <ambientLight intensity={0.28} />
      <hemisphereLight args={["#e7ffff", "#010203", 0.4]} />
      <directionalLight position={[-4, 6, 5]} color="#fffdf5" intensity={3.2} />
      <pointLight ref={cyanLight} position={[2.6, 1.1, 2.5]} color="#08e8f4" intensity={lowQuality ? 5 : 6} distance={4.8} />
      <pointLight position={[-2.4, -0.4, 1.5]} color="#d8ffff" intensity={2.4} distance={5.5} />
      <spotLight position={[-0.5, 5.1, 3.6]} color="#fffaf0" intensity={20} angle={0.5} penumbra={0.86} distance={10} />
      <directionalLight position={[1.5, 3, -3]} color="#a4e9ef" intensity={2.1} />
      <Dust lowQuality={lowQuality} />
      <mesh position={[0.72, -0.18, -3.9]}>
        <planeGeometry args={[4.8, 3.4]} />
        <meshBasicMaterial color="#0a777e" transparent opacity={0.025} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <group ref={sculpture} position={cubePosition} rotation={CUBE_ROTATION} scale={cubeScale}>
        <WireCube active={active && !reduceMotion} />
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
