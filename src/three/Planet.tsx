import { MeshDistortMaterial } from '@react-three/drei'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { scrollStore } from '../lib/scroll-store'
import { layouts } from './layouts'

const target = new THREE.Vector3()

/** The big centrepiece: a wobbling neon planet with a wireframe shell and orbit rings.
 *  It leans toward the cursor, shrinks into the distance as you scroll, and pulses when clicked. */
export function Planet() {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const viewport = useThree((s) => s.viewport)
  const m = useRef({ scale: 0, pulse: 0, pulseV: 0, spin: 0 })

  useFrame((state, dt) => {
    const g = group.current
    const c = core.current
    if (!g || !c) return
    const d = Math.min(dt, 1 / 30)
    const { section, pointer } = scrollStore.get()
    const portrait = viewport.width < viewport.height
    const [fx, fy, z, s] = (portrait ? layouts.planetTall : layouts.planetWide)[section]
    const fit = THREE.MathUtils.clamp(viewport.width / 11, 0.55, 1.15)
    const t = state.clock.elapsedTime

    target.set(fx * viewport.width + pointer.x * 0.25, fy * viewport.height + pointer.y * 0.18 + Math.sin(t * 0.5) * 0.08, z)
    g.position.lerp(target, 1 - Math.exp(-d * 2.4))

    m.current.pulseV += (-160 * m.current.pulse - 8 * m.current.pulseV) * d
    m.current.pulse += m.current.pulseV * d
    m.current.spin *= Math.exp(-d * 1.6)
    m.current.scale = THREE.MathUtils.lerp(m.current.scale, s * fit, 1 - Math.exp(-d * 3))

    const k = m.current.scale * (1 + m.current.pulse * 0.25)
    g.scale.setScalar(k)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.35, 1 - Math.exp(-d * 4))
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.5, 1 - Math.exp(-d * 4))
    c.rotation.y += d * (0.12 + m.current.spin)
    c.rotation.x += d * 0.04
    if (ringA.current) ringA.current.rotation.z += d * (0.25 + m.current.spin * 0.6)
    if (ringB.current) ringB.current.rotation.z -= d * (0.4 + m.current.spin * 0.8)
  })

  const bonk = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    m.current.pulseV += 6
    m.current.spin += 7
  }
  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.dataset.toyHover = 'planet'
  }
  const out = () => {
    if (document.body.dataset.toyHover === 'planet') delete document.body.dataset.toyHover
  }

  return (
    <group ref={group} position={[0, 0, -12]}>
      <group ref={core} onClick={bonk} onPointerOver={over} onPointerOut={out}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#6d3df5"
            emissive="#ff4fa3"
            emissiveIntensity={0.22}
            roughness={0.22}
            metalness={0.35}
            distort={0.3}
            speed={1.5}
          />
        </mesh>
        <mesh scale={1.16}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#1fb6ff" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
      <mesh ref={ringA} rotation={[1.2, 0.25, 0]}>
        <torusGeometry args={[1.75, 0.03, 16, 180]} />
        <meshBasicMaterial color="#1fb6ff" transparent opacity={0.85} />
      </mesh>
      <mesh ref={ringB} rotation={[1.65, -0.35, 0.4]}>
        <torusGeometry args={[2.15, 0.02, 16, 180]} />
        <meshBasicMaterial color="#ff4fa3" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
