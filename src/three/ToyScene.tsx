import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { scrollStore } from '../lib/scroll-store'
import { TOYS } from './layouts'
import { Planet } from './Planet'
import { Toy } from './Toy'

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState === 'visible')
  useEffect(() => {
    const on = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])
  return visible
}

/** Moves the camera a little with the cursor so the whole scene has parallax depth. */
function Rig() {
  useFrame((state, dt) => {
    const { pointer } = scrollStore.get()
    const k = 1 - Math.exp(-Math.min(dt, 1 / 30) * 2.5)
    state.camera.position.x += (pointer.x * 0.7 - state.camera.position.x) * k
    state.camera.position.y += (pointer.y * 0.4 - state.camera.position.y) * k
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

/** The 3D layer: a big planet plus six neon toys, floating above the galaxy and below the page content. */
export default function ToyScene() {
  const visible = usePageVisible()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        eventSource={document.getElementById('root') ?? undefined}
        eventPrefix="client"
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <pointLight position={[-6, -2, 3]} intensity={30} color="#8b5cf6" />
        <pointLight position={[6, 3, 2]} intensity={26} color="#ff4fa3" />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
          <Lightformer form="circle" intensity={2.5} color="#8b5cf6" position={[-5, 1, 2]} scale={3} />
          <Lightformer form="circle" intensity={2.5} color="#1fb6ff" position={[5, -1, 2]} scale={3} />
        </Environment>
        <Rig />
        <Planet />
        {TOYS.map((toy, i) => (
          <Toy key={toy.kind + i} index={i} kind={toy.kind} color={toy.color} />
        ))}
      </Canvas>
    </div>
  )
}
