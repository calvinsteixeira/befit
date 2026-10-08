import { render, screen } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { HomeScreen } from './home-screen'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('lucide-react-native', () => ({
  CheckCircle2: () => null,
  CircleDashed: () => null,
}))
jest.mock('@/features/attendance/hooks/use-attendance', () => ({
  useAttendanceSummary: jest.fn(),
}))
jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}))

const mockUseAttendanceSummary = jest.requireMock(
  '@/features/attendance/hooks/use-attendance',
).useAttendanceSummary as jest.Mock

describe('HomeScreen', () => {
  beforeEach(() => {
    mockUseAttendanceSummary.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        today: null,
        currentStreak: 2,
        currentWeekCount: 3,
        recentDays: [
          { dateKey: '2026-10-01', record: null },
          { dateKey: '2026-10-02', record: null },
          { dateKey: '2026-10-03', record: null },
          { dateKey: '2026-10-04', record: null },
          { dateKey: '2026-10-05', record: null },
          { dateKey: '2026-10-06', record: null },
          { dateKey: '2026-10-07', record: null },
        ],
      },
    })
  })

  it('exibe somente o estado real de presença e os resumos derivados', async () => {
    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>,
    )

    expect(screen.getByTestId('home-screen')).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.today.pending'))).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.stats.days', { count: 2 }))).toBeOnTheScreen()
    expect(screen.getAllByText(i18n.t('home.recent.noRecord')).length).toBeGreaterThan(0)
    expect(screen.queryByText(/registrar treino/i)).not.toBeOnTheScreen()
  })

  it('mostra a presença confirmada sem oferecer ação de registro', async () => {
    mockUseAttendanceSummary.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        today: {
          id: 'attendance-1',
          userId: 'user-1',
          attendedOn: '2026-10-07',
          createdAt: '2026-10-07T12:00:00.000Z',
        },
        currentStreak: 1,
        currentWeekCount: 1,
        recentDays: [],
      },
    })

    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>,
    )

    expect(screen.getByText(i18n.t('home.today.confirmed'))).toBeOnTheScreen()
    expect(screen.queryByTestId('home-view-attendance')).not.toBeOnTheScreen()
  })
})
