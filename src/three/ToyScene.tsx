import { Environment, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { TOYS } from './layouts'
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

/** The persistent toy box: one fixed canvas behind every section. */
export default function ToyScene() {
  const visible = usePageVisible()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        eventSource={document.getElementById('root') ?? undefined}
        eventPrefix="client"
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
          <Lightformer form="circle" intensity={2} color="#ffe04a" position={[-5, 1, 2]} scale={3} />
          <Lightformer form="circle" intensity={2} color="#1fb6ff" position={[5, -1, 2]} scale={3} />
        </Environment>
        {TOYS.map((toy, i) => (
          <Toy key={toy.kind + i} index={i} kind={toy.kind} color={toy.color} />
        ))}
      </Canvas>
    </div>
  )
}
