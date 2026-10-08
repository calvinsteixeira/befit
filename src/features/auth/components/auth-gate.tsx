import { Redirect } from 'expo-router'

import { useSession } from '../session-provider'

export function AuthGate() {
  const { isLoading, session } = useSession()

  if (isLoading) {
    return null
  }

  return <Redirect href={session ? '/(app)' : '/(auth)/login'} />
}
