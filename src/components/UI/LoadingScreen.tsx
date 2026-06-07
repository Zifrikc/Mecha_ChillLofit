import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export default function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading)
  const progress = useAppStore((s) => s.loadProgress)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-4xl mb-8"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤖
          </motion.div>

          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="mt-4 text-sm text-surface-muted font-light tracking-wide">
            Cargando bosque...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
