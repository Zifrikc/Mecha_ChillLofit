import { Suspense } from 'react'
import { useProgress } from '@react-three/drei'
import { useAppStore } from '../store/useAppStore'
import Layout from './Layout'
import { useEffect } from 'react'

function LoadingHandler() {
  const { progress, active } = useProgress()
  const setLoading = useAppStore((s) => s.setLoading)
  const setProgress = useAppStore((s) => s.setProgress)

  useEffect(() => {
    setProgress(progress)
    if (!active && progress === 100) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [progress, active, setLoading, setProgress])

  return null
}

export default function App() {
  return (
    <>
      <LoadingHandler />
      <Layout />
    </>
  )
}
