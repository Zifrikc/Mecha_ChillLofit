import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export default function ExtraControls() {
  const {
    isRainEffectEnabled,
    isFootstepsEnabled,
    isSkyMoving,
    isFogDense,
    isMechaWalking,
    setRainEffect,
    setFootsteps,
    setSkyMoving,
    setFogDense,
    setMechaWalking
  } = useAppStore()

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={() => setMechaWalking(!isMechaWalking)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12 ${isMechaWalking ? 'shadow-[0_0_15px_rgba(100,255,150,0.4)] bg-white/10' : ''}`}
        title="Caminar"
      >
        <span>🤖</span>
      </motion.button>

      <motion.button
        onClick={() => setFogDense(!isFogDense)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12 ${!isFogDense ? 'shadow-[0_0_15px_rgba(255,255,255,0.4)] bg-white/10' : ''}`}
        title="Reducir Niebla"
      >
        <span>🌫️</span>
      </motion.button>

      <motion.button
        onClick={() => setRainEffect(!isRainEffectEnabled)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12 ${isRainEffectEnabled ? 'shadow-[0_0_15px_rgba(100,150,255,0.4)] bg-white/10' : ''}`}
        title="Activar/Desactivar Lluvia"
      >
        <span>🌧️</span>
      </motion.button>

      <motion.button
        onClick={() => setFootsteps(!isFootstepsEnabled)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12 ${isFootstepsEnabled ? 'shadow-[0_0_15px_rgba(255,150,100,0.4)] bg-white/10' : ''}`}
        title="Sonido de pasos del Mecha"
      >
        <span>👣</span>
      </motion.button>

      <motion.button
        onClick={() => setSkyMoving(!isSkyMoving)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`glass-button text-xl p-3 rounded-full flex items-center justify-center w-12 h-12 ${isSkyMoving ? 'shadow-[0_0_15px_rgba(200,100,255,0.4)] bg-white/10' : ''}`}
        title="Rotar el cielo"
      >
        <span>🌌</span>
      </motion.button>
    </div>
  )
}
