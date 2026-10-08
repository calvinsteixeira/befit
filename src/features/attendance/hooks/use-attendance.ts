import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/features/auth/session-provider'

import { attendanceRepository } from '../repositories/attendance-repository-instance'
import type { AttendanceSummary } from '../types/attendance'
import { calculateCurrentStreak, countCurrentWeekPresences, buildRecentAttendanceDays } from '../utils/attendance-summary'
import { getLocalDateKey } from '../utils/local-date'

export const attendanceQueryKeys = {
  all: ['attendance'] as const,
  summary: (userId: string, todayKey: string) => ['attendance', userId, 'summary', todayKey] as const,
}

const ATTENDANCE_HISTORY_START = '1970-01-01'

async function fetchAttendanceSummary(userId: string, todayKey: string): Promise<AttendanceSummary> {
  const records = await attendanceRepository.listByDateRange(userId, {
    from: ATTENDANCE_HISTORY_START,
    to: todayKey,
  })

  return {
    today: records.find((record) => record.attendedOn === todayKey) ?? null,
    currentStreak: calculateCurrentStreak(records, todayKey),
    currentWeekCount: countCurrentWeekPresences(records, todayKey),
    recentDays: buildRecentAttendanceDays(records, todayKey),
  }
}

export function useAttendanceSummary() {
  const { user } = useSession()
  const todayKey = getLocalDateKey()

  return useQuery({
    enabled: Boolean(user?.id),
    queryKey: attendanceQueryKeys.summary(user?.id ?? 'anonymous', todayKey),
    queryFn: () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      return fetchAttendanceSummary(user.id, todayKey)
    },
  })
}

function invalidateAttendance(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.all })
}

export function useConfirmToday() {
  const { user } = useSession()
  const queryClient = useQueryClient()
  const todayKey = getLocalDateKey()

  return useMutation({
    mutationFn: () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      return attendanceRepository.confirmToday(user.id, todayKey)
    },
    onSuccess: () => invalidateAttendance(queryClient),
  })
}

export function useRemoveToday() {
  const { user } = useSession()
  const queryClient = useQueryClient()
  const todayKey = getLocalDateKey()

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      await attendanceRepository.removeToday(user.id, todayKey)
    },
    onSuccess: () => invalidateAttendance(queryClient),
  })
}
