import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useAudioManager } from '../../hooks/useAudioManager'
import type { AudioTrack } from '../../store/useAppStore'

const TRACK_ITEMS: { id: AudioTrack; icon: string; label: string }[] = [
  { id: 'chill', icon: '🎵', label: 'Chill' },
  { id: 'relax', icon: '🎵', label: 'Relax' },
]

export default function AudioControls() {
  const activeTrack = useAppStore((s) => s.activeTrack)
  const { toggleTrack } = useAudioManager()

  return (
    <div className="flex items-center gap-2">
      {TRACK_ITEMS.map((item) => {
        const isActive = activeTrack === item.id
        return (
          <motion.button
            key={item.id}
            onClick={() => toggleTrack(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`glass-button relative ${isActive ? 'active shadow-[0_0_20px_rgba(124,58,237,0.5)]' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            {isActive && (
              <motion.span
                className="flex gap-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] bg-accent-violet rounded-full"
                    animate={{
                      height: [6, 14, 8, 16, 6],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
