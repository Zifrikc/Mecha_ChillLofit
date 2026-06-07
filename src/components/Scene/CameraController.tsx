import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useAppStore } from '../../store/useAppStore'
import type { CameraMode } from '../../store/useAppStore'

const TARGET = new Vector3(0, -1.0, 0)

const POSITIONS: Record<CameraMode, Vector3> = {
  fixed: new Vector3(0, -0.5, 10.0),
  orbit: new Vector3(0, 0.0, 12),
  subtle: new Vector3(0, -0.5, 10.0),
}

function noise(t: number) {
  return Math.sin(t * 1.17) * 0.5 + Math.sin(t * 2.31) * 0.3 + Math.sin(t * 3.73) * 0.2
}

export default function CameraController() {
  const { camera } = useThree()
  const mode = useAppStore((s) => s.cameraMode)
  const targetPos = useRef(new Vector3())
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta

    switch (mode) {
      case 'fixed': {
        targetPos.current.copy(POSITIONS.fixed)
        break
      }
      case 'orbit': {
        const angle = time.current * 0.2
        targetPos.current.set(
          12 * Math.sin(angle),
          0.0 + 1.0 * Math.sin(angle * 0.5),
          12 * Math.cos(angle)
        )
        break
      }
      case 'subtle': {
        const nx = noise(time.current * 0.5) * 0.04
        const ny = noise(time.current * 0.5 + 10) * 0.03
        targetPos.current.set(
          POSITIONS.subtle.x + nx,
          POSITIONS.subtle.y + ny,
          POSITIONS.subtle.z
        )
        break
      }
    }

    camera.position.lerp(targetPos.current, 0.04)
    camera.lookAt(TARGET)
  })

  return null
}
