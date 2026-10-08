import { ActivityIndicator, ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'
import { useAttendanceInsights } from '@/features/attendance/hooks/use-attendance'

import { getHomeGreetingKey } from '../utils/get-home-greeting'

export function HomeScreen() {
  const { t } = useTranslation()
  const attendanceQuery = useAttendanceInsights()

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="flex-1 bg-background"
      testID="home-screen"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl + spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 px-6 py-8">
          <View className="gap-2">
            <Text className="text-base font-semibold tracking-wide text-primary">
              {t(getHomeGreetingKey(new Date().getHours()))}
            </Text>
            <Text variant="h1" className="text-left text-3xl text-foreground">
              {t('home.title')}
            </Text>
          </View>

          {attendanceQuery.isLoading ? (
            <View className="items-center py-8" testID="home-loading">
              <ActivityIndicator color={colors.accent} accessibilityLabel={t('home.errors.load')} />
            </View>
          ) : attendanceQuery.isError ? (
            <Card className="gap-4 rounded-lg border-border bg-card p-5" testID="home-error">
              <Text className="text-base leading-6 text-card-foreground">
                {t('home.errors.load')}
              </Text>
              <Button
                className="self-start"
                onPress={() => void attendanceQuery.refetch()}
                testID="home-retry"
                variant="outline"
              >
                <Text>{t('home.errors.retry')}</Text>
              </Button>
            </Card>
          ) : attendanceQuery.data ? (
            <View className="flex-row gap-3" testID="home-insights">
              <Card className="flex-1 gap-2 rounded-lg border-border bg-card p-4">
                <Text className="text-sm font-medium text-muted-foreground">
                  {t('home.insights.streak')}
                </Text>
                <Text variant="h3" className="text-left text-xl text-card-foreground">
                  {attendanceQuery.data.currentStreak > 0
                    ? t('home.insights.streakValue', {
                        count: attendanceQuery.data.currentStreak,
                      })
                    : t('home.insights.streakEmpty')}
                </Text>
              </Card>
              <Card className="flex-1 gap-2 rounded-lg border-border bg-card p-4">
                <Text className="text-sm font-medium text-muted-foreground">
                  {t('home.insights.month')}
                </Text>
                <Text variant="h3" className="text-left text-xl text-card-foreground">
                  {attendanceQuery.data.currentMonthCount > 0
                    ? t('home.insights.monthValue', {
                        count: attendanceQuery.data.currentMonthCount,
                      })
                    : t('home.insights.monthEmpty')}
                </Text>
              </Card>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
