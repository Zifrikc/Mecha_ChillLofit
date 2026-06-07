import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Lighting from './Lighting'
import Skybox from './Skybox'
import MechaModel from './MechaModel'
import ForestEnvironment from './ForestEnvironment'
import Particles from './Particles'
import Rain from './Rain'
import CameraController from './CameraController'
import Effects from './Effects'
import Fireflies from './Fireflies'

export default function SceneContainer() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: 3,
        outputColorSpace: 'srgb',
      }}
      camera={{
        position: [0, 1.8, 5],
        fov: 50,
        near: 0.1,
        far: 80,
      }}
      shadows="soft"
      onCreated={(state) => {
        state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
    >
      <color attach="background" args={['#a0b8cc']} />
      <Lighting />
      <Skybox />
      <MechaModel />
      <Fireflies />
      <ForestEnvironment />
      <Particles />
      <Rain />
      <CameraController />
      <Effects />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={false}
        maxDistance={12}
        minDistance={2}
        zoomSpeed={0.8}
      />
    </Canvas>
  )
}
