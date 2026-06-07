import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AudioControls from './AudioControls'
import VolumeSlider from './VolumeSlider'
import { useAppStore } from '../../store/useAppStore'

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const currentTrack = useAppStore((s) => s.activeTrack)

  // Inactivity timer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleMouseMove = () => {
      setIsIdle(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsIdle(true)
      }, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    handleMouseMove() // init

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  const isRainWindowOpen = useAppStore((s) => s.isRainWindowOpen)
  const setRainWindowOpen = useAppStore((s) => s.setRainWindowOpen)

  return (
    <motion.div
      className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3"
      initial={{ opacity: 1 }}
      animate={{ opacity: isIdle ? 0.3 : 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsIdle(false)}
    >
      <div className={`glass-panel rounded-full flex items-center transition-all duration-500 overflow-hidden ${isOpen ? 'shadow-[0_0_30px_rgba(150,100,255,0.4)] px-4 py-2' : 'p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
        
        {/* Main toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center rounded-full w-12 h-12 transition-all duration-300 ${isOpen ? 'bg-white/10' : 'glass-button'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Controles de Música"
        >
          <span className="text-xl">🎵</span>
        </motion.button>

        {/* Rain Window Toggle */}
        {!isOpen && (
          <motion.button
            onClick={() => setRainWindowOpen(!isRainWindowOpen)}
            className={`flex items-center justify-center rounded-full w-10 h-10 ml-2 transition-all duration-300 ${isRainWindowOpen ? 'bg-white/20 shadow-[0_0_10px_rgba(100,150,255,0.5)]' : 'glass-button'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Ventana de Lluvia"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-sm">🌧️</span>
          </motion.button>
        )}

        {/* Expandable Controls */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 'auto', opacity: 1, marginLeft: 16 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 overflow-hidden"
            >
              <AudioControls />
              <div className="w-[1px] h-8 bg-white/20" />
              <VolumeSlider />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
