import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useMemo } from 'react'

export default function RainWindow() {
  const isRainWindowOpen = useAppStore(s => s.isRainWindowOpen)

  const drops = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      left: Math.random() * 100 + '%',
      duration: 0.8 + Math.random() * 2.5 + 's',
      delay: Math.random() * 5 + 's',
      opacity: 0.2 + Math.random() * 0.4
    }))
  }, [])

  return (
    <AnimatePresence>
      {isRainWindowOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden backdrop-blur-sm bg-slate-900/20"
        >
          {drops.map((drop, i) => (
            <div
              key={i}
              className="absolute -top-10 w-[2px] h-8 bg-gradient-to-b from-transparent to-white/40 rounded-full"
              style={{
                left: drop.left,
                opacity: drop.opacity,
                animation: `rain-fall ${drop.duration} linear infinite`,
                animationDelay: drop.delay
              }}
            />
          ))}
          <style>{`
            @keyframes rain-fall {
              0% { transform: translateY(0); opacity: 0; }
              5% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(120vh); opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
