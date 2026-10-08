import type { AttendanceRecord } from '../types/attendance'

import {
  calculateCurrentStreak,
  countCurrentMonthPresences,
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

  it('conta apenas as presenças do mês atual', () => {
    expect(
      countCurrentMonthPresences(
        [record('2026-09-30'), record('2026-10-05'), record('2026-10-07')],
        '2026-10-07',
      ),
    ).toBe(2)
  })
})
