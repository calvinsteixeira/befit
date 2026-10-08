import { Redirect } from 'expo-router'

import { useSession } from '@/features/auth/session-provider'
import { AuthenticatedTabs } from '@/features/navigation/components/authenticated-tabs'

export default function AppLayout() {
  const { isLoading, session } = useSession()

  if (isLoading) {
    return null
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  return <AuthenticatedTabs />
}
