import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">🌲</span>
        <h1 className="text-sm font-semibold tracking-wide text-surface-light">
          MechaUI <span className="font-light text-surface-muted">· Relaxing Travel</span>
        </h1>
      </div>
    </motion.header>
  )
}
