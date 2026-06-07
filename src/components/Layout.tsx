import SceneContainer from './Scene/SceneContainer'
import Header from './UI/Header'
import LoadingScreen from './UI/LoadingScreen'
import SettingsPanel from './UI/SettingsPanel'
import MusicPlayer from './UI/MusicPlayer'
import RainWindow from './UI/RainWindow'

import MotivationalText from './UI/MotivationalText'

export default function Layout() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0">
        <SceneContainer />
      </div>

      <Header />
      <MotivationalText />

      <div className="absolute top-4 right-6 z-40 flex flex-col gap-3">
        <SettingsPanel />
      </div>

      <RainWindow />
      <MusicPlayer />

      <LoadingScreen />
    </div>
  )
}
