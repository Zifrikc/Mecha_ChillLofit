import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import type { CameraMode } from '../../store/useAppStore'

const MODES: { id: CameraMode; label: string }[] = [
  { id: 'fixed', label: 'Fija' },
  { id: 'orbit', label: 'Órbita' },
  { id: 'subtle', label: 'Sutil' },
]

const MODE_ICONS: Record<CameraMode, string> = {
  fixed: '📷',
  orbit: '🎬',
  subtle: '🎥',
}

const MODE_LABELS: Record<CameraMode, string> = {
  fixed: 'Cámara Fija',
  orbit: 'Órbita lenta',
  subtle: 'Mov. sutil',
}

export default function CameraToggle() {
  const mode = useAppStore((s) => s.cameraMode)
  const setCameraMode = useAppStore((s) => s.setCameraMode)

  const cycleMode = () => {
    const currentIdx = MODES.findIndex((m) => m.id === mode)
    const nextIdx = (currentIdx + 1) % MODES.length
    setCameraMode(MODES[nextIdx].id)
  }

  const currentMode = MODES.find((m) => m.id === mode) || MODES[0]

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={cycleMode}
        className="glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Cámara: ${currentMode.label}`}
      >
        <span>{MODE_ICONS[mode]}</span>
      </motion.button>
    </div>
  )
}
