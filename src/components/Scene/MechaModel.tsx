import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Howl } from 'howler'
import { useAppStore } from '../../store/useAppStore'
import type { Group } from 'three'

export default function MechaModel() {
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/mecha.glb')
  const { actions } = useAnimations(animations, groupRef)
  const isFootstepsEnabled = useAppStore(s => s.isFootstepsEnabled)
  const footstepsAudio = useRef<Howl | null>(null)

  useEffect(() => {
    footstepsAudio.current = new Howl({
      src: ['/audio/footsteps.mp3'],
      volume: 0.5,
      preload: true,
      onend: () => {
        setTimeout(() => {
          if (useAppStore.getState().isFootstepsEnabled) {
            footstepsAudio.current?.play()
          }
        }, 1000)
      }
    })
    return () => {
      footstepsAudio.current?.unload()
    }
  }, [])

  useEffect(() => {
    if (isFootstepsEnabled) {
      if (!footstepsAudio.current?.playing()) {
        footstepsAudio.current?.play()
      }
    } else {
      footstepsAudio.current?.stop()
    }
  }, [isFootstepsEnabled])

  const isMechaWalking = useAppStore(s => s.isMechaWalking)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0]
      if (isMechaWalking) {
        firstAction?.play()
        firstAction!.paused = false
      } else {
        firstAction!.paused = true
      }
    }
  }, [actions, isMechaWalking])

  return (
    <group ref={groupRef} position={[0, -5.0, 0]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} scale={1.84} />
    </group>
  )
}
