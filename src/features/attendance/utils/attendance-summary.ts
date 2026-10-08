import type { AttendanceDay, AttendanceRecord } from '../types/attendance'
import { addLocalDays, getCurrentWeekStartKey, getRecentDateKeys } from './local-date'

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

export function countCurrentWeekPresences(
  records: Pick<AttendanceRecord, 'attendedOn'>[],
  todayKey: string,
) {
  const weekStartKey = getCurrentWeekStartKey(todayKey)

  return records.filter(
    (record) => record.attendedOn >= weekStartKey && record.attendedOn <= todayKey,
  ).length
}

export function buildRecentAttendanceDays(
  records: AttendanceRecord[],
  todayKey: string,
): AttendanceDay[] {
  const recordsByDate = new Map(records.map((record) => [record.attendedOn, record]))

  return getRecentDateKeys(todayKey).map((dateKey) => ({
    dateKey,
    record: recordsByDate.get(dateKey) ?? null,
  }))
}
