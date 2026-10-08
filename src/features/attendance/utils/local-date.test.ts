import {
  addLocalDays,
  addLocalMonths,
  buildMonthCalendarGrid,
  formatLocalMonthKey,
  getLocalDateKey,
  getMonthDateRange,
} from './local-date'

describe('local-date', () => {
  it('gera a chave usando a data local do dispositivo', () => {
    const date = new Date(2026, 9, 7, 23, 30)

    expect(getLocalDateKey(date)).toBe('2026-10-07')
  })

  it('soma dias e meses sem converter a data para UTC', () => {
    expect(addLocalDays('2026-10-01', 1)).toBe('2026-10-02')
    expect(addLocalDays('2026-10-01', -1)).toBe('2026-09-30')
    expect(addLocalMonths('2026-01', -1)).toBe('2025-12')
    expect(addLocalMonths('2026-12', 1)).toBe('2027-01')
  })

  it('monta a grade começando na segunda-feira', () => {
    const cells = buildMonthCalendarGrid('2026-10')

    expect(cells.slice(0, 3)).toEqual([
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
    ])
    expect(cells[3]).toEqual({ dateKey: '2026-10-01', dayNumber: 1 })
    expect(cells).toHaveLength(35)
    expect(cells.filter((cell) => cell.dateKey)).toHaveLength(31)
  })

  it('preenche os espaços anteriores quando o mês começa no domingo', () => {
    const cells = buildMonthCalendarGrid('2026-11')

    expect(cells.slice(0, 6)).toEqual([
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
      { dateKey: null, dayNumber: null },
    ])
    expect(cells[6]).toEqual({ dateKey: '2026-11-01', dayNumber: 1 })
  })

  it('gera o intervalo local e o cabeçalho localizado do mês', () => {
    expect(getMonthDateRange('2026-10')).toEqual({
      from: '2026-10-01',
      to: '2026-10-31',
    })
    expect(formatLocalMonthKey('2026-10', 'pt-BR')).toBe('Outubro de 2026')
  })
})
