import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Float32BufferAttribute, AdditiveBlending } from 'three'
import { useAppStore } from '../../store/useAppStore'

const COUNT = 1500

export default function Rain() {
  const pointsRef = useRef<any>(null)
  const isRainEffectEnabled = useAppStore(s => s.isRainEffectEnabled)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      vel[i * 3] = 0 // wind x
      vel[i * 3 + 1] = -0.2 - Math.random() * 0.2 // fall speed
      vel[i * 3 + 2] = 0 // wind z
    }
    return [pos, vel]
  }, [])

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!pointsRef.current || !isRainEffectEnabled) return
    const pos = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      if (pos[i * 3 + 1] < 0) {
        pos[i * 3 + 1] = 20 // Reset to top
        pos[i * 3] = (Math.random() - 0.5) * 40 // Randomize position
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!isRainEffectEnabled) return null

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#aaccff"
        transparent
        opacity={0.5}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
