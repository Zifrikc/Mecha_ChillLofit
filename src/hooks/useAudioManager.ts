import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { useAppStore } from '../store/useAppStore'
import type { AudioTrack } from '../store/useAppStore'

const TRACKS: Record<AudioTrack, string> = {
  chill: '/audio/chill.mp3',
  relax: '/audio/relax.mp3',
}

export function useAudioManager() {
  const activeTrack = useAppStore((s) => s.activeTrack)
  const volume = useAppStore((s) => s.volume)
  const setTrack = useAppStore((s) => s.setTrack)
  const isRainEffectEnabled = useAppStore((s) => s.isRainEffectEnabled)
  
  const howlsRef = useRef<Record<string, Howl>>({})
  const currentIdRef = useRef<string | null>(null)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rainHowlRef = useRef<Howl | null>(null)

  useEffect(() => {
    (Object.entries(TRACKS) as [AudioTrack, string][]).forEach(([key, src]) => {
      if (!howlsRef.current[key]) {
        howlsRef.current[key] = new Howl({
          src: [src],
          loop: true,
          volume: 0,
          preload: true,
        })
      }
    })
    
    if (!rainHowlRef.current) {
      rainHowlRef.current = new Howl({
        src: ['/audio/rain.mp3'],
        loop: true,
        volume: 0,
        preload: true,
      })
    }
  }, [])

  useEffect(() => {
    if (rainHowlRef.current) {
      if (isRainEffectEnabled) {
        if (!rainHowlRef.current.playing()) {
          rainHowlRef.current.play()
        }
        rainHowlRef.current.fade(rainHowlRef.current.volume(), volume, 1000)
      } else {
        if (rainHowlRef.current.playing()) {
          rainHowlRef.current.fade(rainHowlRef.current.volume(), 0, 1000)
          setTimeout(() => {
            if (!useAppStore.getState().isRainEffectEnabled) {
              rainHowlRef.current?.stop()
            }
          }, 1000)
        }
      }
    }
  }, [isRainEffectEnabled, volume])

  useEffect(() => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    const prevId = currentIdRef.current
    const nextId = activeTrack

    if (prevId && prevId !== nextId) {
      const prevHowl = howlsRef.current[prevId]
      if (prevHowl && prevHowl.playing()) {
        prevHowl.fade(prevHowl.volume(), 0, 800)
        fadeTimeoutRef.current = setTimeout(() => {
          prevHowl.stop()
        }, 800)
      }
    }

    if (nextId && nextId !== prevId) {
      const nextHowl = howlsRef.current[nextId]
      if (nextHowl) {
        nextHowl.volume(0)
        nextHowl.play()
        nextHowl.fade(0, volume, 800)
      }
    } else if (nextId === null && prevId) {
      const prevHowl = howlsRef.current[prevId]
      if (prevHowl && prevHowl.playing()) {
        prevHowl.fade(prevHowl.volume(), 0, 800)
        fadeTimeoutRef.current = setTimeout(() => {
          prevHowl.stop()
        }, 800)
      }
    }

    currentIdRef.current = nextId
  }, [activeTrack, volume])

  useEffect(() => {
    if (activeTrack && howlsRef.current[activeTrack]) {
      howlsRef.current[activeTrack].volume(volume)
    }
  }, [volume, activeTrack])

  const toggleTrack = useCallback((track: AudioTrack) => {
    setTrack(activeTrack === track ? null : track)
  }, [activeTrack, setTrack])

  return { toggleTrack }
}
