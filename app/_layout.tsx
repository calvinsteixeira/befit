import '../global.css'

import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { PortalHost } from '@rn-primitives/portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SessionProvider } from '@/features/auth/session-provider'
import { SplashScreenController } from '@/features/auth/components/splash-screen-controller'
import { QueryProvider } from '@/lib/query/query-provider'
import { colors } from '@/theme/tokens'

SplashScreen.setOptions({ duration: 300, fade: true })
void SplashScreen.preventAutoHideAsync().catch(() => undefined)

export default function RootLayout() {
  return (
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
  )
}
