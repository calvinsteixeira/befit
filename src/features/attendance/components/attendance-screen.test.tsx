import { fireEvent, render, screen } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { AttendanceScreen } from './attendance-screen'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('lucide-react-native', () => ({
  CalendarCheck2: () => null,
  CheckCircle2: () => null,
  CircleDashed: () => null,
}))
jest.mock('@/features/auth/session-provider', () => ({
  useSession: () => ({ user: { id: 'user-1' } }),
}))
jest.mock('@/features/attendance/hooks/use-attendance', () => ({
  useAttendanceSummary: jest.fn(),
  useConfirmToday: jest.fn(),
  useRemoveToday: jest.fn(),
}))

const attendanceHooks = jest.requireMock('@/features/attendance/hooks/use-attendance') as {
  useAttendanceSummary: jest.Mock
  useConfirmToday: jest.Mock
  useRemoveToday: jest.Mock
}
const mockUseAttendanceSummary = attendanceHooks.useAttendanceSummary
const mockConfirmToday = jest.fn()
const mockRemoveToday = jest.fn()

const emptySummary = {
  today: null,
  currentStreak: 0,
  currentWeekCount: 0,
  recentDays: [
    { dateKey: '2026-10-01', record: null },
    { dateKey: '2026-10-02', record: null },
    { dateKey: '2026-10-03', record: null },
    { dateKey: '2026-10-04', record: null },
    { dateKey: '2026-10-05', record: null },
    { dateKey: '2026-10-06', record: null },
    { dateKey: '2026-10-07', record: null },
  ],
}

describe('AttendanceScreen', () => {
  beforeEach(() => {
    mockConfirmToday.mockReset()
    mockRemoveToday.mockReset()
    attendanceHooks.useConfirmToday.mockReturnValue({
      mutate: mockConfirmToday,
      isPending: false,
      isError: false,
    })
    attendanceHooks.useRemoveToday.mockReturnValue({
      mutate: mockRemoveToday,
      isPending: false,
      isError: false,
    })
    mockUseAttendanceSummary.mockReturnValue({
      isLoading: false,
      isError: false,
      data: emptySummary,
      refetch: jest.fn(),
    })
  })

  it('oferece confirmação quando hoje ainda não tem presença', async () => {
    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <AttendanceScreen />
      </I18nextProvider>,
    )

    fireEvent.press(screen.getByTestId('attendance-confirm'))

    expect(mockConfirmToday).toHaveBeenCalledTimes(1)
    expect(screen.getAllByText(i18n.t('attendance.noRecord')).length).toBeGreaterThan(0)
  })

  it('exibe estado confirmado e ação para desfazer', async () => {
    mockUseAttendanceSummary.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        ...emptySummary,
        today: {
          id: 'attendance-1',
          userId: 'user-1',
          attendedOn: '2026-10-07',
          createdAt: '2026-10-07T12:00:00.000Z',
        },
      },
      refetch: jest.fn(),
    })

    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <AttendanceScreen />
      </I18nextProvider>,
    )

    expect(screen.getByText(i18n.t('attendance.status.confirmed'))).toBeOnTheScreen()
    expect(screen.getByTestId('attendance-remove')).toBeOnTheScreen()
    expect(screen.queryByTestId('attendance-confirm')).not.toBeOnTheScreen()
  })

  it('exibe retry quando a consulta falha', async () => {
    const refetch = jest.fn()
    mockUseAttendanceSummary.mockReturnValue({ isLoading: false, isError: true, refetch })

    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <AttendanceScreen />
      </I18nextProvider>,
    )

    fireEvent.press(screen.getByTestId('attendance-retry'))

    expect(refetch).toHaveBeenCalledTimes(1)
    expect(screen.getByText(i18n.t('attendance.errors.load'))).toBeOnTheScreen()
  })
})
