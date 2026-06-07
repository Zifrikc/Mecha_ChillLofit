import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export default function VolumeSlider() {
  const volume = useAppStore((s) => s.volume)
  const setVolume = useAppStore((s) => s.setVolume)

  const icon = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">{icon}</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-24 h-1 appearance-none bg-white/10 rounded-full cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-accent-violet
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-accent-violet-glow
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-3
          [&::-moz-range-thumb]:h-3
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-accent-violet
          [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:cursor-pointer"
      />
      <span className="text-xs text-surface-muted w-8 text-right tabular-nums">
        {Math.round(volume * 100)}%
      </span>
    </div>
  )
}
