import type { AttendanceRecord } from '../types/attendance'
import { addLocalDays } from './local-date'

export function calculateCurrentStreak(records: Pick<AttendanceRecord, 'attendedOn'>[], todayKey: string) {
  const attendedDates = new Set(records.map((record) => record.attendedOn))
  const startsWithToday = attendedDates.has(todayKey)
  let dateKey = startsWithToday ? todayKey : addLocalDays(todayKey, -1)
  let streak = 0

  while (attendedDates.has(dateKey)) {
    streak += 1
    dateKey = addLocalDays(dateKey, -1)
  }

  return streak
}

export function countCurrentMonthPresences(
  records: Pick<AttendanceRecord, 'attendedOn'>[],
  todayKey: string,
) {
  const currentMonthKey = todayKey.slice(0, 7)

  return records.filter((record) => record.attendedOn.startsWith(currentMonthKey)).length
}
