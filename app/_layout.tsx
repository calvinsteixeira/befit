import '../global.css'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PortalHost } from '@rn-primitives/portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryProvider } from '@/lib/query/query-provider'
import { colors } from '@/theme/tokens'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
        <PortalHost />
      </QueryProvider>
    </SafeAreaProvider>
  )
}
