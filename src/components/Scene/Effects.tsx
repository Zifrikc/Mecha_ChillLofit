import { Bloom, ToneMapping, Vignette, EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { Vector2 } from 'three'

export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <DepthOfField target={[0, 0, 5]} focalLength={0.02} bokehScale={2} height={480} />
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.1}
        intensity={0.8}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)} // color offset
      />
      <ToneMapping mode={2} />
      <Vignette
        offset={0.4}
        darkness={0.6}
      />
    </EffectComposer>
  )
}
