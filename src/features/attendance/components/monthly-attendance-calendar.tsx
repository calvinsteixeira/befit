import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Pressable, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { colors, spacing } from '@/theme/tokens'

import type { AttendanceRecord } from '../types/attendance'
import {
  buildMonthCalendarGrid,
  formatLocalDateKey,
  formatLocalMonthKey,
} from '../utils/local-date'

interface MonthlyAttendanceCalendarProps {
  canGoNext: boolean
  isError: boolean
  isLoading: boolean
  monthKey: string
  onNextMonth: () => void
  onPreviousMonth: () => void
  onRetry: () => void
  onToggleDate: (dateKey: string) => void
  pendingDateKeys: Set<string>
  records: AttendanceRecord[]
  todayKey: string
}

export function MonthlyAttendanceCalendar({
  canGoNext,
  isError,
  isLoading,
  monthKey,
  onNextMonth,
  onPreviousMonth,
  onRetry,
  onToggleDate,
  pendingDateKeys,
  records,
  todayKey,
}: MonthlyAttendanceCalendarProps) {
  const { t, i18n } = useTranslation()
  const cells = buildMonthCalendarGrid(monthKey)
  const recordsByDate = new Map(records.map((record) => [record.attendedOn, record]))
  const weekdaysShort = t('attendance.calendar.weekdaysShort', {
    returnObjects: true,
  }) as unknown as string[]
  const weekdaysLong = t('attendance.calendar.weekdaysLong', {
    returnObjects: true,
  }) as unknown as string[]

  return (
    <Card className="gap-5 rounded-lg border-border bg-card p-5" testID="attendance-calendar">
      <View className="flex-row items-center justify-between">
        <Pressable
          accessibilityHint={t('attendance.calendar.monthNavigationHint')}
          accessibilityLabel={t('attendance.calendar.previousMonth')}
          accessibilityRole="button"
          className="h-11 w-11 items-center justify-center rounded-md active:opacity-70"
          onPress={onPreviousMonth}
          testID="calendar-previous-month"
        >
          <ChevronLeft
            accessibilityElementsHidden
            aria-hidden={true}
            color={colors.foreground}
            size={spacing.lg}
            strokeWidth={2}
          />
        </Pressable>
        <Text variant="h3" className="text-center text-xl text-card-foreground">
          {formatLocalMonthKey(monthKey, i18n.language)}
        </Text>
        <Pressable
          accessibilityHint={t('attendance.calendar.monthNavigationHint')}
          accessibilityLabel={t('attendance.calendar.nextMonth')}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canGoNext }}
          className={cn(
            'h-11 w-11 items-center justify-center rounded-md active:opacity-70',
            !canGoNext && 'opacity-40',
          )}
          disabled={!canGoNext}
          onPress={onNextMonth}
          testID="calendar-next-month"
        >
          <ChevronRight
            accessibilityElementsHidden
            aria-hidden={true}
            color={colors.foreground}
            size={spacing.lg}
            strokeWidth={2}
          />
        </Pressable>
      </View>

      <View className="gap-2" testID="calendar-grid">
        <View className="flex-row">
          {weekdaysShort.map((weekday, index) => (
            <View className="flex-1 items-center" key={`${weekday}-${index}`}>
              <Text
                accessibilityLabel={t('attendance.calendar.weekdayLabel', {
                  day: weekdaysLong[index],
                })}
                className="text-sm font-semibold text-muted-foreground"
              >
                {weekday}
              </Text>
            </View>
          ))}
        </View>

        {Array.from({ length: cells.length / 7 }, (_, rowIndex) => (
          <View className="flex-row" key={`calendar-row-${rowIndex}`}>
            {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell, cellIndex) => {
              if (!cell.dateKey || !cell.dayNumber) {
                return <View className="flex-1 items-center" key={`empty-${rowIndex}-${cellIndex}`} />
              }

              const record = recordsByDate.get(cell.dateKey)
              const isMarked = Boolean(record)
              const isToday = cell.dateKey === todayKey
              const isFuture = cell.dateKey > todayKey
              const isPending = pendingDateKeys.has(cell.dateKey)
              const isDisabled = isFuture || isPending || isLoading || isError
              const status = isFuture
                ? t('attendance.calendar.futureStatus')
                : isMarked
                  ? t('attendance.calendar.markedStatus')
                  : t('attendance.calendar.unmarkedStatus')
              const action = isFuture
                ? t('attendance.calendar.futureHint')
                : isMarked
                  ? t('attendance.calendar.removeHint')
                  : t('attendance.calendar.markHint')
              const dateLabel = formatLocalDateKey(cell.dateKey, i18n.language, 'long')
              const accessibilityLabel = t('attendance.calendar.dayAccessibility', {
                date: isToday
                  ? `${dateLabel}, ${t('attendance.calendar.today')}`
                  : dateLabel,
                status,
                action,
              })

              return (
                <View className="flex-1 items-center" key={cell.dateKey}>
                  <Pressable
                    accessibilityHint={action}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: isDisabled, selected: isMarked }}
                    android_ripple={{ color: colors.surfaceRaised }}
                    className={cn(
                      'h-11 w-11 items-center justify-center rounded-md active:opacity-70',
                      isMarked && 'bg-primary',
                      isToday && (isMarked ? 'border-2 border-foreground' : 'border-2 border-primary'),
                      isFuture && 'opacity-40',
                    )}
                    disabled={isDisabled}
                    onPress={() => onToggleDate(cell.dateKey as string)}
                    testID={`calendar-day-${cell.dateKey}`}
                  >
                    {isPending ? (
                      <ActivityIndicator
                        accessibilityLabel={t('attendance.calendar.loading')}
                        color={isMarked ? colors.onAccent : colors.accent}
                        size="small"
                      />
                    ) : isMarked ? (
                      <Check
                        accessibilityElementsHidden
                        aria-hidden={true}
                        color={colors.onAccent}
                        size={spacing.lg}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Text className={cn('text-base font-semibold', isFuture ? 'text-muted-foreground' : 'text-card-foreground')}>
                        {cell.dayNumber}
                      </Text>
                    )}
                  </Pressable>
                </View>
              )
            })}
          </View>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator
          accessibilityLabel={t('attendance.calendar.loading')}
          color={colors.accent}
        />
      ) : isError ? (
        <View className="gap-3">
          <Text accessibilityRole="alert" className="text-base leading-6 text-destructive">
            {t('attendance.errors.monthLoad')}
          </Text>
          <Button
            className="self-start"
            onPress={onRetry}
            testID="calendar-retry"
            variant="outline"
          >
            <Text>{t('attendance.actions.retry')}</Text>
          </Button>
        </View>
      ) : null}
    </Card>
  )
}
