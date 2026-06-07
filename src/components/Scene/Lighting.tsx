import { FogExp2, Color } from 'three'
import { useAppStore } from '../../store/useAppStore'

export default function Lighting() {
  const isFogDense = useAppStore((s) => s.isFogDense)

  return (
    <>
      <fogExp2 attach="fog" args={[new Color('#b8c8d8'), isFogDense ? 0.04 : 0.01]} />

      <directionalLight
        position={[8, 12, 4]}
        intensity={0.6}
        color="#ffd8b0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <ambientLight intensity={0.5} color="#8899bb" />
      <hemisphereLight
        args={['#aaccff', '#445533', 0.6]}
        position={[0, 10, 0]}
      />
    </>
  )
}
