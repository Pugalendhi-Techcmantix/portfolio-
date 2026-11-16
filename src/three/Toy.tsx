import { RoundedBox } from '@react-three/drei'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { scrollStore } from '../lib/scroll-store'
import { layouts, type ToyKind } from './layouts'

function starShape() {
  const s = new THREE.Shape()
  const outer = 0.62
  const inner = 0.28
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2
    if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    else s.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  s.closePath()
  return s
}

function Geometry({ kind }: { kind: ToyKind }) {
  const star = useMemo(() => starShape(), [])
  switch (kind) {
    case 'torus':
      return <torusGeometry args={[0.45, 0.2, 32, 64]} />
    case 'capsule':
      return <capsuleGeometry args={[0.28, 0.55, 12, 24]} />
    case 'sphere':
      return <sphereGeometry args={[0.45, 48, 48]} />
    case 'cone':
      return <coneGeometry args={[0.42, 0.85, 40]} />
    case 'star':
      return (
        <extrudeGeometry
          args={[star, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 6 }]}
          onUpdate={(g) => g.center()}
        />
      )
    default:
      return null
  }
}

type Props = { index: number; kind: ToyKind; color: string }

/** Scratch vector reused inside useFrame (frames run sequentially, so sharing is safe). */
const target = new THREE.Vector3()

/** One glossy toy: glides to its slot for the active section, floats, leans toward the pointer, bonks when clicked. */
export function Toy({ index, kind, color }: Props) {
  const group = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  const viewport = useThree((s) => s.viewport)
  const motion = useRef({ spin: 0, squash: 0, squashV: 0, hover: 0, scale: 0 })
  const seed = index * 1.7

  useFrame((state, dt) => {
    const g = group.current
    const b = body.current
    if (!g || !b) return
    const d = Math.min(dt, 1 / 30)
    const m = motion.current
    const { section, pointer } = scrollStore.get()
    const portrait = viewport.width < viewport.height
    const [fx, fy, z, s] = (portrait ? layouts.tall : layouts.wide)[section][index]
    const fit = THREE.MathUtils.clamp(viewport.width / 11, 0.55, 1.15)
    const t = state.clock.elapsedTime

    target.set(fx * viewport.width, fy * viewport.height + Math.sin(t * 0.9 + seed) * 0.12, z)
    if (section === 'hero') {
      target.x += pointer.x * 0.35 * (1 + z * 0.2)
      target.y += pointer.y * 0.25 * (1 + z * 0.2)
    }
    g.position.lerp(target, 1 - Math.exp(-d * 3.2))

    // squash spring
    m.squashV += (-220 * m.squash - 9 * m.squashV) * d
    m.squash += m.squashV * d
    m.spin *= Math.exp(-d * 2.2)
    m.hover = THREE.MathUtils.lerp(m.hover, document.body.dataset.toyHover === String(index) ? 1 : 0, 1 - Math.exp(-d * 10))
    m.scale = THREE.MathUtils.lerp(m.scale, s * fit, 1 - Math.exp(-d * 4))

    const sc = m.scale * (1 + m.hover * 0.12)
    b.scale.set(sc * (1 + m.squash * 0.5), sc * (1 - m.squash), sc * (1 + m.squash * 0.5))
    b.rotation.x += d * (0.25 + m.spin) * (index % 2 ? 1 : -1)
    b.rotation.y += d * (0.35 + m.spin * 1.4)
    b.rotation.z = Math.sin(t * 0.6 + seed) * 0.25
  })

  const bonk = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    motion.current.squashV += 7
    motion.current.spin += 9
  }
  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.dataset.toyHover = String(index)
  }
  const out = () => {
    if (document.body.dataset.toyHover === String(index)) delete document.body.dataset.toyHover
  }

  return (
    <group ref={group} position={[0, -8, 0]}>
      <group ref={body} onClick={bonk} onPointerOver={over} onPointerOut={out}>
        {kind === 'box' ? (
          <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.18} smoothness={6}>
            <ToyMaterial color={color} />
          </RoundedBox>
        ) : (
          <mesh>
            <Geometry kind={kind} />
            <ToyMaterial color={color} />
          </mesh>
        )}
      </group>
    </group>
  )
}

function ToyMaterial({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} />
}
