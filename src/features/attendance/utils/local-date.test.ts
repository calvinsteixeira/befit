import {
  addLocalDays,
  getCurrentWeekStartKey,
  getLocalDateKey,
  getRecentDateKeys,
} from './local-date'

describe('local-date', () => {
  it('gera a chave usando a data local do dispositivo', () => {
    const date = new Date(2026, 9, 7, 23, 30)

    expect(getLocalDateKey(date)).toBe('2026-10-07')
  })

  it('soma dias sem converter a data para UTC', () => {
    expect(addLocalDays('2026-10-01', 1)).toBe('2026-10-02')
    expect(addLocalDays('2026-10-01', -1)).toBe('2026-09-30')
  })

  it('gera os sete dias recentes em ordem cronológica', () => {
    expect(getRecentDateKeys('2026-10-07')).toEqual([
      '2026-10-01',
      '2026-10-02',
      '2026-10-03',
      '2026-10-04',
      '2026-10-05',
      '2026-10-06',
      '2026-10-07',
    ])
  })

  it('considera segunda-feira o início da semana', () => {
    expect(getCurrentWeekStartKey('2026-10-07')).toBe('2026-10-05')
    expect(getCurrentWeekStartKey('2026-10-11')).toBe('2026-10-05')
  })
})
