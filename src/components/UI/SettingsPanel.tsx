import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CameraToggle from './CameraToggle'
import ExtraControls from './ExtraControls'

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="glass-panel rounded-[30px] p-2 flex flex-col gap-3 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden"
      initial={false}
      animate={{ 
        width: isOpen ? 'auto' : '64px',
        height: isOpen ? 'auto' : '64px'
      }}
      transition={{ duration: 0.3 }}
      style={{ minWidth: '64px', minHeight: '64px' }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="icon"
            onClick={() => setIsOpen(true)}
            className="w-[48px] h-[48px] flex items-center justify-center text-2xl text-white/80 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            ⚙️
          </motion.button>
        ) : (
          <motion.div
            key="content"
            className="flex flex-col gap-3 p-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-xs"
            >
              ✕
            </button>
            <div className="mt-4 flex flex-col gap-3">
              <CameraToggle />
              <div className="h-[1px] w-full bg-white/10 my-1" />
              <ExtraControls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
