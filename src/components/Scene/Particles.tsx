import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, AdditiveBlending } from 'three'

const COUNT = 200

export default function Particles() {
  const pointsRef = useRef<any>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 10
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = 0.3 + Math.random() * 2.5
      pos[i * 3 + 2] = Math.sin(angle) * radius
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return [pos, vel]
  }, [])

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      if (pos[i * 3] > 12) pos[i * 3] = -12
      if (pos[i * 3] < -12) pos[i * 3] = 12
      if (pos[i * 3 + 1] > 3) pos[i * 3 + 1] = 0.3
      if (pos[i * 3 + 1] < 0.3) pos[i * 3 + 1] = 3
      if (pos[i * 3 + 2] > 12) pos[i * 3 + 2] = -12
      if (pos[i * 3 + 2] < -12) pos[i * 3 + 2] = 12
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#a8ff60"
        transparent
        opacity={0.5}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
