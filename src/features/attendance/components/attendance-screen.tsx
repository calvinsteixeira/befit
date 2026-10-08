import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/ui/text'
import { spacing } from '@/theme/tokens'

import {
  getCurrentAttendanceMonth,
  useAttendanceMonth,
  useConfirmAttendance,
  useRemoveAttendance,
} from '../hooks/use-attendance'
import { addLocalMonths, getLocalDateKey } from '../utils/local-date'
import { MonthlyAttendanceCalendar } from './monthly-attendance-calendar'

export function AttendanceScreen() {
  const { t } = useTranslation()
  const todayKey = getLocalDateKey()
  const currentMonthKey = getCurrentAttendanceMonth()
  const [monthKey, setMonthKey] = useState(currentMonthKey)
  const [pendingDateKeys, setPendingDateKeys] = useState<Set<string>>(new Set())
  const [actionErrorDateKey, setActionErrorDateKey] = useState<string | null>(null)
  const monthQuery = useAttendanceMonth(monthKey)
  const confirmMutation = useConfirmAttendance()
  const removeMutation = useRemoveAttendance()

  function handleToggleDate(dateKey: string) {
    if (pendingDateKeys.has(dateKey)) {
      return
    }

    const isMarked = Boolean(monthQuery.data?.records.some((record) => record.attendedOn === dateKey))
    setActionErrorDateKey(null)
    setPendingDateKeys((current) => new Set(current).add(dateKey))

    const mutation = isMarked ? removeMutation : confirmMutation
    void mutation
      .mutateAsync(dateKey)
      .catch(() => {
        setActionErrorDateKey(dateKey)
      })
      .finally(() => {
        setPendingDateKeys((current) => {
          const next = new Set(current)
          next.delete(dateKey)
          return next
        })
      })
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

          <MonthlyAttendanceCalendar
            canGoNext={monthKey < currentMonthKey}
            isError={monthQuery.isError}
            isLoading={monthQuery.isLoading}
            monthKey={monthKey}
            onNextMonth={() => setMonthKey((current) => addLocalMonths(current, 1))}
            onPreviousMonth={() => setMonthKey((current) => addLocalMonths(current, -1))}
            onRetry={() => void monthQuery.refetch()}
            onToggleDate={handleToggleDate}
            pendingDateKeys={pendingDateKeys}
            records={monthQuery.data?.records ?? []}
            todayKey={todayKey}
          />

          {actionErrorDateKey ? (
            <View className="gap-2">
              <Text accessibilityRole="alert" className="text-base leading-6 text-destructive">
                {t('attendance.errors.action')}
              </Text>
              <Text className="text-sm leading-5 text-muted-foreground">
                {t('attendance.calendar.actionErrorHint')}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
