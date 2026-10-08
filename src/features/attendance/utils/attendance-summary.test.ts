import type { AttendanceRecord } from '../types/attendance'

import {
  buildRecentAttendanceDays,
  calculateCurrentStreak,
  countCurrentWeekPresences,
} from './attendance-summary'

const record = (attendedOn: string): AttendanceRecord => ({
  id: attendedOn,
  userId: 'user-1',
  attendedOn,
  createdAt: `${attendedOn}T12:00:00.000Z`,
})

describe('attendance-summary', () => {
  it('calcula a sequência atual até hoje', () => {
    expect(
      calculateCurrentStreak(
        [record('2026-10-05'), record('2026-10-06'), record('2026-10-07')],
        '2026-10-07',
      ),
    ).toBe(3)
  })

  it('mantém a sequência de ontem quando hoje ainda não foi confirmado', () => {
    expect(
      calculateCurrentStreak(
        [record('2026-10-05'), record('2026-10-06')],
        '2026-10-07',
      ),
    ).toBe(2)
  })

  it('conta apenas as presenças da semana atual', () => {
    expect(
      countCurrentWeekPresences(
        [record('2026-09-30'), record('2026-10-05'), record('2026-10-07')],
        '2026-10-07',
      ),
    ).toBe(2)
  })

  it('preenche os últimos sete dias sem transformar ausência em falta', () => {
    const days = buildRecentAttendanceDays([record('2026-10-07')], '2026-10-07')

    expect(days).toHaveLength(7)
    expect(days.at(-1)).toEqual({ dateKey: '2026-10-07', record: record('2026-10-07') })
    expect(days.at(0)).toEqual({ dateKey: '2026-10-01', record: null })
  })
})
