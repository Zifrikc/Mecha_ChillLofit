import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '../../store/useAppStore'

export default function Fireflies() {
  const isFogDense = useAppStore(s => s.isFogDense)
  const count = 300
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          Math.random() * 15 - 2,
          (Math.random() - 0.5) * 60
        ),
        factor: Math.random() * 100,
        speed: Math.random() * 0.01 + 0.005,
        xFactor: Math.random() * 0.4 + 0.1,
        yFactor: Math.random() * 0.4 + 0.1,
        zFactor: Math.random() * 0.4 + 0.1,
      })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!meshRef.current || !isFogDense) return
    
    particles.forEach((particle, i) => {
      const t = particle.factor + state.clock.elapsedTime * (particle.speed * 100)
      
      dummy.position.set(
        particle.position.x + Math.sin(t * particle.xFactor) * 2,
        particle.position.y + Math.sin(t * particle.yFactor) * 2,
        particle.position.z + Math.cos(t * particle.zFactor) * 2
      )
      
      const scale = Math.max(0.3, Math.sin(t * 2)) * 0.8
      dummy.scale.set(scale, scale, scale)
      
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  if (!isFogDense) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color="#ffff00" toneMapped={false} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  )
}
