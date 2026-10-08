import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useSession } from '../session-provider'
import { LaunchScreen } from './launch-screen'

export function SplashScreenController() {
  const { isLoading } = useSession()
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false)
  const [launchComplete, setLaunchComplete] = useState(false)
  const [launchRendered, setLaunchRendered] = useState(false)
  const hideRequested = useRef(false)

  useEffect(() => {
    if (isLoading || !launchRendered || hideRequested.current) {
      return
    }

    hideRequested.current = true
    void SplashScreen.hideAsync().finally(() => {
      setNativeSplashHidden(true)
    })
  }, [isLoading, launchRendered])

  const handleComplete = useCallback(() => {
    setLaunchComplete(true)
  }, [])

  const handleLaunchLayout = useCallback(() => {
    setLaunchRendered(true)
  }, [])

  if (launchComplete) {
    return null
  }

  return (
    <LaunchScreen
      ready={nativeSplashHidden}
      onComplete={handleComplete}
      onLayout={handleLaunchLayout}
    />
  )
}
