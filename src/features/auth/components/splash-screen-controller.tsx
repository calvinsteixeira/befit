import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'

import { useSession } from '../session-provider'
import { LaunchScreen } from './launch-screen'

export function SplashScreenController() {
  const { isLoading } = useSession()
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false)
  const [launchComplete, setLaunchComplete] = useState(false)

  useEffect(() => {
    if (isLoading) {
      return
    }

    void SplashScreen.hideAsync().finally(() => {
      setNativeSplashHidden(true)
    })
  }, [isLoading])

  const handleComplete = useCallback(() => {
    setLaunchComplete(true)
  }, [])

  if (launchComplete) {
    return null
  }

  return <LaunchScreen ready={nativeSplashHidden} onComplete={handleComplete} />
}
