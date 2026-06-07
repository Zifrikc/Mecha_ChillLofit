import { create } from 'zustand'

export type AudioTrack = 'chill' | 'relax'
export type CameraMode = 'fixed' | 'orbit' | 'subtle'

interface AppState {
  activeTrack: AudioTrack | null
  volume: number
  isPlaying: boolean
  cameraMode: CameraMode
  isLoading: boolean
  loadProgress: number
  isFootstepsEnabled: boolean
  isRainEffectEnabled: boolean
  isSkyMoving: boolean
  isFogDense: boolean
  isMechaWalking: boolean
  isRainWindowOpen: boolean
  setTrack: (track: AudioTrack | null) => void
  setVolume: (vol: number) => void
  setCameraMode: (mode: CameraMode) => void
  setLoading: (loading: boolean) => void
  setProgress: (progress: number) => void
  setFootsteps: (enabled: boolean) => void
  setRainEffect: (enabled: boolean) => void
  setSkyMoving: (enabled: boolean) => void
  setFogDense: (dense: boolean) => void
  setMechaWalking: (walking: boolean) => void
  setRainWindowOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeTrack: null,
  volume: 0.6,
  isPlaying: false,
  cameraMode: 'fixed',
  isLoading: true,
  loadProgress: 0,
  isFootstepsEnabled: false,
  isRainEffectEnabled: false,
  isSkyMoving: false,
  isFogDense: true,
  isMechaWalking: false,
  isRainWindowOpen: false,

  setTrack: (track) => set({ activeTrack: track, isPlaying: track !== null }),
  setVolume: (vol) => set({ volume: vol }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setLoading: (loading) => set({ isLoading: loading }),
  setProgress: (progress) => set({ loadProgress: progress }),
  setFootsteps: (enabled) => set({ isFootstepsEnabled: enabled }),
  setRainEffect: (enabled) => set({ isRainEffectEnabled: enabled }),
  setSkyMoving: (enabled) => set({ isSkyMoving: enabled }),
  setFogDense: (dense) => set({ isFogDense: dense }),
  setMechaWalking: (walking) => set({ isMechaWalking: walking }),
  setRainWindowOpen: (open) => set({ isRainWindowOpen: open }),
}))
