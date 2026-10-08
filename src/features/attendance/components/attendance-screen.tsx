import {
  ActivityIndicator,
  Alert,
  ScrollView,
  View,
} from 'react-native'
import { CalendarCheck2, CheckCircle2, CircleDashed } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'

import { useAttendanceSummary, useConfirmToday, useRemoveToday } from '../hooks/use-attendance'
import { formatLocalDateKey, getLocalDateKey } from '../utils/local-date'

export function AttendanceScreen() {
  const { t, i18n } = useTranslation()
  const summaryQuery = useAttendanceSummary()
  const confirmMutation = useConfirmToday()
  const removeMutation = useRemoveToday()
  const todayKey = getLocalDateKey()
  const isActionPending = confirmMutation.isPending || removeMutation.isPending

  function handleRemoveToday() {
    Alert.alert(t('attendance.confirmation.title'), t('attendance.confirmation.description'), [
      {
        text: t('attendance.actions.cancel'),
        style: 'cancel',
      },
      {
        text: t('attendance.confirmation.confirm'),
        style: 'destructive',
        onPress: () => removeMutation.mutate(),
      },
    ])
  }

  function handleRetryAction() {
    if (summaryQuery.data?.today) {
      handleRemoveToday()
      return
    }

    confirmMutation.mutate()
  }

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="flex-1 bg-background"
      testID="attendance-screen"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl + spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 px-6 py-8">
          <View className="gap-2">
            <Text variant="h1" className="text-left text-3xl text-foreground">
              {t('attendance.question')}
            </Text>
            <Text className="text-base leading-6 text-muted-foreground">
              {t('attendance.questionDescription')}
            </Text>
          </View>

          {summaryQuery.isLoading ? (
            <View className="items-center py-8" testID="attendance-loading">
              <ActivityIndicator color={colors.accent} accessibilityLabel={t('attendance.actions.confirming')} />
            </View>
          ) : summaryQuery.isError ? (
            <Card className="gap-4 rounded-lg border-border bg-card p-5" testID="attendance-error">
              <Text className="text-base leading-6 text-card-foreground">
                {t('attendance.errors.load')}
              </Text>
              <Button
                className="self-start"
                onPress={() => void summaryQuery.refetch()}
                testID="attendance-retry"
                variant="outline"
              >
                <Text>{t('attendance.actions.retry')}</Text>
              </Button>
            </Card>
          ) : summaryQuery.data ? (
            <>
              <Card className="gap-4 rounded-lg border-border bg-card p-5">
                <View className="flex-row items-start gap-3">
                  {summaryQuery.data.today ? (
                    <CheckCircle2
                      accessibilityElementsHidden
                      aria-hidden={true}
                      color={colors.accent}
                      size={spacing.xl}
                      strokeWidth={2}
                    />
                  ) : (
                    <CalendarCheck2
                      accessibilityElementsHidden
                      aria-hidden={true}
                      color={colors.accent}
                      size={spacing.xl}
                      strokeWidth={1.75}
                    />
                  )}
                  <View className="flex-1 gap-1">
                    <Text variant="h3" className="text-left text-xl text-card-foreground">
                      {summaryQuery.data.today
                        ? t('attendance.status.confirmed')
                        : t('attendance.question')}
                    </Text>
                    <Text className="text-base leading-6 text-muted-foreground">
                      {summaryQuery.data.today
                        ? t('attendance.status.confirmedDescription')
                        : t('attendance.questionDescription')}
                    </Text>
                  </View>
                </View>

                {summaryQuery.data.today ? (
                  <Button
                    className="self-start"
                    disabled={isActionPending}
                    onPress={handleRemoveToday}
                    accessibilityState={{ disabled: isActionPending }}
                    testID="attendance-remove"
                    variant="outline"
                  >
                    {removeMutation.isPending ? (
                      <View className="flex-row items-center gap-2">
                        <ActivityIndicator color={colors.foreground} />
                        <Text>{t('attendance.actions.removing')}</Text>
                      </View>
                    ) : (
                      <Text>{t('attendance.actions.remove')}</Text>
                    )}
                  </Button>
                ) : (
                  <Button
                    disabled={isActionPending}
                    onPress={() => confirmMutation.mutate()}
                    accessibilityState={{ disabled: isActionPending }}
                    testID="attendance-confirm"
                  >
                    {confirmMutation.isPending ? (
                      <View className="flex-row items-center gap-2">
                        <ActivityIndicator color={colors.onAccent} />
                        <Text>{t('attendance.actions.confirming')}</Text>
                      </View>
                    ) : (
                      <Text>{t('attendance.actions.confirm')}</Text>
                    )}
                  </Button>
                )}
              </Card>

              {confirmMutation.isError || removeMutation.isError ? (
                <View className="gap-2">
                  <Text accessibilityRole="alert" className="text-base leading-6 text-destructive">
                    {t('attendance.errors.action')}
                  </Text>
                  <Button
                    className="self-start"
                    onPress={handleRetryAction}
                    testID="attendance-action-retry"
                    variant="outline"
                  >
                    <Text>{t('attendance.actions.retry')}</Text>
                  </Button>
                </View>
              ) : null}

              <Card className="gap-4 rounded-lg border-border bg-card p-5">
                <View className="gap-1">
                  <Text variant="h3" className="text-left text-xl text-card-foreground">
                    {t('attendance.historyTitle')}
                  </Text>
                  <Text className="text-base leading-6 text-muted-foreground">
                    {t('attendance.historyDescription')}
                  </Text>
                </View>

                {summaryQuery.data.recentDays.every((day) => !day.record) ? (
                  <Text className="text-base leading-6 text-muted-foreground">
                    {t('attendance.emptyHistory')}
                  </Text>
                ) : null}

                <View className="gap-3">
                  {summaryQuery.data.recentDays.map((day) => {
                    const isToday = day.dateKey === todayKey
                    const status = day.record
                      ? t('attendance.present')
                      : t('attendance.noRecord')

                    return (
                      <View
                        className="min-h-11 flex-row items-center gap-3"
                        key={day.dateKey}
                        testID={`attendance-day-${day.dateKey}`}
                      >
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
                            {isToday ? t('attendance.today') : formatLocalDateKey(day.dateKey, i18n.language)}
                          </Text>
                          <Text className="text-sm text-muted-foreground">{status}</Text>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </Card>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
