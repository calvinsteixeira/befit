import '../global.css'

import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { PortalHost } from '@rn-primitives/portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SessionProvider } from '@/features/auth/session-provider'
import { SplashScreenController } from '@/features/auth/components/splash-screen-controller'
import i18n, { i18nReady } from '@/i18n'
import { QueryProvider } from '@/lib/query/query-provider'
import { colors } from '@/theme/tokens'

SplashScreen.setOptions({ duration: 300, fade: true })
void SplashScreen.preventAutoHideAsync().catch(() => undefined)

export default function RootLayout() {
  const [isI18nReady, setIsI18nReady] = useState(i18n.isInitialized)

  useEffect(() => {
    let isMounted = true

    void i18nReady.then(() => {
      if (isMounted) {
        setIsI18nReady(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (!isI18nReady) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <QueryProvider>
          <SessionProvider>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}
            />
            <SplashScreenController />
            <PortalHost />
          </SessionProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  )
}
