import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useSession } from '@/features/auth/session-provider'

import { attendanceRepository } from '../repositories/attendance-repository-instance'
import type { AttendanceMonth, AttendanceSummary } from '../types/attendance'
import { calculateCurrentStreak, countCurrentMonthPresences } from '../utils/attendance-summary'
import {
  getLocalDateKey,
  getLocalMonthKey,
  getMonthDateRange,
} from '../utils/local-date'

export const attendanceQueryKeys = {
  all: ['attendance'] as const,
  insights: (userId: string, todayKey: string) => ['attendance', userId, 'insights', todayKey] as const,
  month: (userId: string, monthKey: string) => ['attendance', userId, 'month', monthKey] as const,
}

const ATTENDANCE_HISTORY_START = '1970-01-01'

async function fetchAttendanceInsights(userId: string, todayKey: string): Promise<AttendanceSummary> {
  const records = await attendanceRepository.listByDateRange(userId, {
    from: ATTENDANCE_HISTORY_START,
    to: todayKey,
  })

  return {
    currentStreak: calculateCurrentStreak(records, todayKey),
    currentMonthCount: countCurrentMonthPresences(records, todayKey),
  }
}

async function fetchAttendanceMonth(userId: string, monthKey: string): Promise<AttendanceMonth> {
  const records = await attendanceRepository.listByDateRange(userId, getMonthDateRange(monthKey))

  return { monthKey, records }
}

export function useAttendanceInsights() {
  const { user } = useSession()
  const todayKey = getLocalDateKey()

  return useQuery({
    enabled: Boolean(user?.id),
    queryKey: attendanceQueryKeys.insights(user?.id ?? 'anonymous', todayKey),
    queryFn: () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      return fetchAttendanceInsights(user.id, todayKey)
    },
  })
}

export function useAttendanceMonth(monthKey: string) {
  const { user } = useSession()

  return useQuery({
    enabled: Boolean(user?.id),
    queryKey: attendanceQueryKeys.month(user?.id ?? 'anonymous', monthKey),
    queryFn: () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      return fetchAttendanceMonth(user.id, monthKey)
    },
  })
}

function invalidateAttendance(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.all })
}

export function useConfirmAttendance() {
  const { user } = useSession()
  const queryClient = useQueryClient()
  const todayKey = getLocalDateKey()

  return useMutation({
    mutationFn: (attendedOn: string) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      if (attendedOn > todayKey) {
        throw new Error('Não é permitido confirmar uma presença futura.')
      }

      return attendanceRepository.confirm(user.id, attendedOn)
    },
    onSuccess: () => invalidateAttendance(queryClient),
  })
}

export function useRemoveAttendance() {
  const { user } = useSession()
  const queryClient = useQueryClient()
  const todayKey = getLocalDateKey()

  return useMutation({
    mutationFn: async (attendedOn: string) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado.')
      }

      if (attendedOn > todayKey) {
        throw new Error('Não é permitido remover uma presença futura.')
      }

      await attendanceRepository.remove(user.id, attendedOn)
    },
    onSuccess: () => invalidateAttendance(queryClient),
  })
}

export function getCurrentAttendanceMonth() {
  return getLocalMonthKey()
}
