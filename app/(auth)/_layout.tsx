import { Redirect, Stack } from 'expo-router'

import { useSession } from '@/features/auth/session-provider'

export default function AuthLayout() {
  const { isLoading, session } = useSession()

  if (isLoading) {
    return null
  }

  if (session) {
    return <Redirect href="/(app)" />
  }

  return <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
}
