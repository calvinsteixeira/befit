import { supabaseAttendanceRepository } from './supabase-attendance-repository'

jest.mock('@/lib/supabase/client', () => ({ supabase: { from: jest.fn() } }))

const mockSupabase = jest.requireMock('@/lib/supabase/client').supabase as {
  from: jest.Mock
}

const row = {
  id: 'attendance-1',
  user_id: 'user-1',
  attended_on: '2026-10-07',
  created_at: '2026-10-07T12:00:00.000Z',
}

describe('supabaseAttendanceRepository', () => {
  const query = {
    select: jest.fn(),
    eq: jest.fn(),
    gte: jest.fn(),
    lte: jest.fn(),
    order: jest.fn(),
    maybeSingle: jest.fn(),
    insert: jest.fn(),
    single: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockSupabase.from.mockReturnValue(query)
    query.select.mockReturnValue(query)
    query.eq.mockReturnValue(query)
    query.gte.mockReturnValue(query)
    query.lte.mockReturnValue(query)
    query.order.mockReturnValue(query)
    query.insert.mockReturnValue(query)
    query.delete.mockReturnValue(query)
  })

  it('mapeia registros do adapter para o tipo de domínio', async () => {
    query.order.mockResolvedValue({ data: [row], error: null })

    await expect(
      supabaseAttendanceRepository.listByDateRange('user-1', {
        from: '2026-10-01',
        to: '2026-10-07',
      }),
    ).resolves.toEqual([
      {
        id: row.id,
        userId: row.user_id,
        attendedOn: row.attended_on,
        createdAt: row.created_at,
      },
    ])
  })

  it('trata conflito de unicidade como presença já confirmada', async () => {
    query.single.mockResolvedValue({ data: null, error: { code: '23505' } })
    query.maybeSingle.mockResolvedValue({ data: row, error: null })

    await expect(
      supabaseAttendanceRepository.confirmToday('user-1', '2026-10-07'),
    ).resolves.toEqual({
      id: row.id,
      userId: row.user_id,
      attendedOn: row.attended_on,
      createdAt: row.created_at,
    })
    expect(query.insert).toHaveBeenCalledWith({ user_id: 'user-1', attended_on: '2026-10-07' })
  })

  it('remove somente a presença do usuário e da data informados', async () => {
    query.eq.mockReturnValueOnce(query).mockResolvedValueOnce({ error: null })

    await expect(
      supabaseAttendanceRepository.removeToday('user-1', '2026-10-07'),
    ).resolves.toBeUndefined()
    expect(query.delete).toHaveBeenCalledTimes(1)
  })
})
