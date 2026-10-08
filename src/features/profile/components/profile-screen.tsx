import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'

import { useSession } from '@/features/auth/session-provider'

export function ProfileScreen() {
  const { t } = useTranslation()
  const { signOut, user } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState<string | null>(null)

  const handleSignOut = async () => {
    if (isSigningOut) {
      return
    }

    setSignOutError(null)
    setIsSigningOut(true)

    try {
      const { error } = await signOut()

      if (error) {
        setSignOutError(t('profile.errors.signOut'))
      }
    } catch {
      setSignOutError(t('profile.errors.signOut'))
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="flex-1 bg-background"
      testID="profile-screen"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-8 px-6 py-8">
          <View className="gap-3">
            <Text variant="h1" className="text-left text-3xl text-foreground">
              {t('profile.title')}
            </Text>
            <Text className="text-base leading-6 text-muted-foreground">
              {t('profile.description')}
            </Text>
          </View>

          <Card className="gap-4 rounded-lg border-border bg-card p-6">
            <Text variant="h3" className="text-left text-xl text-card-foreground">
              {t('profile.accountTitle')}
            </Text>
            <View className="gap-1">
              <Text className="text-sm font-medium text-muted-foreground">
                {t('profile.emailLabel')}
              </Text>
              <Text className="text-base text-card-foreground">
                {user?.email ?? t('profile.emailUnavailable')}
              </Text>
            </View>
          </Card>

          {signOutError ? (
            <View
              accessible
              accessibilityRole="alert"
              className="rounded-md border border-destructive/60 bg-destructive/10 p-3"
            >
              <Text
                accessibilityLiveRegion="assertive"
                className="text-sm leading-5 text-foreground"
              >
                {signOutError}
              </Text>
            </View>
          ) : null}

          <Button
            className="w-full"
            disabled={isSigningOut}
            onPress={handleSignOut}
            accessibilityLabel={t('profile.actions.signOut')}
            accessibilityState={{ disabled: isSigningOut }}
            testID="profile-sign-out"
          >
            {isSigningOut ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator
                  color={colors.onAccent}
                  accessibilityLabel={t('profile.status.signingOut')}
                />
                <Text>{t('profile.status.signingOut')}</Text>
              </View>
            ) : (
              <Text>{t('profile.actions.signOut')}</Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
