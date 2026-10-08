import { ActivityIndicator, ScrollView, View } from 'react-native'
import { router } from 'expo-router'
import { CheckCircle2, CircleDashed } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'
import { useAttendanceSummary } from '@/features/attendance/hooks/use-attendance'
import { formatLocalDateKey, getLocalDateKey } from '@/features/attendance/utils/local-date'

import { getHomeGreetingKey } from '../utils/get-home-greeting'

export function HomeScreen() {
  const { t, i18n } = useTranslation()
  const attendanceQuery = useAttendanceSummary()
  const todayKey = getLocalDateKey()

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
            <>
              <Card className="gap-4 rounded-lg border-border bg-card p-5" testID="home-today">
                <View className="flex-row items-start gap-3">
                  {attendanceQuery.data.today ? (
                    <CheckCircle2
                      accessibilityElementsHidden
                      aria-hidden={true}
                      color={colors.accent}
                      size={spacing.xl}
                      strokeWidth={2}
                    />
                  ) : (
                    <CircleDashed
                      accessibilityElementsHidden
                      aria-hidden={true}
                      color={colors.muted}
                      size={spacing.xl}
                      strokeWidth={1.75}
                    />
                  )}
                  <View className="flex-1 gap-1">
                    <Text variant="h3" className="text-left text-xl text-card-foreground">
                      {t('home.today.title')}
                    </Text>
                    <Text className="text-base leading-6 text-muted-foreground">
                      {attendanceQuery.data.today
                        ? t('home.today.confirmed')
                        : t('home.today.pending')}
                    </Text>
                  </View>
                </View>

                {!attendanceQuery.data.today ? (
                  <Button
                    className="self-start"
                    onPress={() => router.push('/(app)/attendance')}
                    accessibilityLabel={t('home.actions.viewAttendance')}
                    testID="home-view-attendance"
                    variant="outline"
                  >
                    <Text>{t('home.actions.viewAttendance')}</Text>
                  </Button>
                ) : null}
              </Card>

              <View className="flex-row gap-3">
                <Card className="flex-1 gap-2 rounded-lg border-border bg-card p-4">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {t('home.stats.streak')}
                  </Text>
                  <Text variant="h3" className="text-left text-2xl text-card-foreground">
                    {t('home.stats.days', { count: attendanceQuery.data.currentStreak })}
                  </Text>
                </Card>
                <Card className="flex-1 gap-2 rounded-lg border-border bg-card p-4">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {t('home.stats.week')}
                  </Text>
                  <Text variant="h3" className="text-left text-2xl text-card-foreground">
                    {t('home.stats.presences', { count: attendanceQuery.data.currentWeekCount })}
                  </Text>
                </Card>
              </View>

              <Card className="gap-4 rounded-lg border-border bg-card p-5">
                <Text variant="h3" className="text-left text-xl text-card-foreground">
                  {t('home.recent.title')}
                </Text>
                <View className="gap-3">
                  {attendanceQuery.data.recentDays.map((day) => (
                    <View className="min-h-11 flex-row items-center gap-3" key={day.dateKey}>
                      {day.record ? (
                        <CheckCircle2
                          accessibilityElementsHidden
                          aria-hidden={true}
                          color={colors.accent}
                          size={spacing.lg}
                          strokeWidth={2}
                        />
                      ) : (
                        <CircleDashed
                          accessibilityElementsHidden
                          aria-hidden={true}
                          color={colors.muted}
                          size={spacing.lg}
                          strokeWidth={1.75}
                        />
                      )}
                      <View className="flex-1 flex-row items-center justify-between gap-2">
                        <Text className="text-base text-card-foreground">
                          {day.dateKey === todayKey
                            ? t('attendance.today')
                            : formatLocalDateKey(day.dateKey, i18n.language)}
                        </Text>
                        <Text className="text-sm text-muted-foreground">
                          {day.record ? t('home.recent.present') : t('home.recent.noRecord')}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Card>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
