import { motion } from 'framer-motion'

export default function MotivationalText() {
  return (
    <motion.div
      className="absolute top-8 left-8 z-40 select-none"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="group relative cursor-crosshair"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="relative inline-block">
          <h1 
            className="text-4xl md:text-5xl font-black tracking-widest text-white opacity-90 transition-all duration-300 whitespace-nowrap"
            style={{
              fontFamily: '"Orbitron", "Noto Sans JP", sans-serif',
              textShadow: '0 0 10px rgba(255,255,255,0.2)'
            }}
          >
            Ash {'>'} Dev
          </h1>
          
          <h1 
            className="absolute top-0 left-0 text-4xl md:text-5xl font-black tracking-widest text-[#00ffff] opacity-0 group-hover:opacity-80 cyber-glitch-1 mix-blend-screen pointer-events-none whitespace-nowrap"
            style={{ fontFamily: '"Orbitron", "Noto Sans JP", sans-serif', left: '-3px' }}
          >
            Ash {'>'} Dev
          </h1>
          
          <h1 
            className="absolute top-0 left-0 text-4xl md:text-5xl font-black tracking-widest text-[#ff00ff] opacity-0 group-hover:opacity-80 cyber-glitch-2 mix-blend-screen pointer-events-none whitespace-nowrap"
            style={{ fontFamily: '"Orbitron", "Noto Sans JP", sans-serif', left: '3px' }}
          >
            Ash {'>'} Dev
          </h1>

          <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff] group-hover:w-full transition-all duration-500 ease-out" />
        </div>

        <div className="flex flex-col mt-3 pl-2 border-l-[3px] border-transparent group-hover:border-[#00ffff] transition-all duration-300">
          <p 
            className="text-sm md:text-base tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            君の魔法は前進すること
          </p>
          <p 
            className="text-[0.65rem] md:text-xs tracking-[0.2em] text-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 uppercase"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            NO TE RINDAS, TU MAGIA ES PROGRESAR
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
