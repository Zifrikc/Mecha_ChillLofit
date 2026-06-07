import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useAppStore } from '../../store/useAppStore'

export default function Skybox() {
  const texture = useTexture('/textures/skybox/forest_skybox.jpeg')
  texture.mapping = 301
  const meshRef = useRef<any>(null)
  const isSkyMoving = useAppStore(s => s.isSkyMoving)

  useFrame((_, delta) => {
    if (isSkyMoving && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -5, 0]}>
      <sphereGeometry args={[45, 32, 32]} />
      <meshBasicMaterial map={texture} side={BackSide} depthWrite={false} />
    </mesh>
  )
}
