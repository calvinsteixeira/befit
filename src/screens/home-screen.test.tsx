import { render, screen } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { HomeScreen } from './home-screen'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('@/features/attendance/hooks/use-attendance', () => ({
  useAttendanceInsights: jest.fn(),
}))

const mockUseAttendanceInsights = jest.requireMock(
  '@/features/attendance/hooks/use-attendance',
).useAttendanceInsights as jest.Mock

describe('HomeScreen', () => {
  beforeEach(() => {
    mockUseAttendanceInsights.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        currentStreak: 3,
        currentMonthCount: 8,
      },
    })
  })

  it('exibe apenas os insights reais de sequência e mês', async () => {
    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>,
    )

    expect(screen.getByTestId('home-screen')).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.insights.streakValue', { count: 3 }))).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.insights.monthValue', { count: 8 }))).toBeOnTheScreen()
    expect(screen.queryByText(/últimos sete dias/i)).not.toBeOnTheScreen()
    expect(screen.queryByText(/hoje/i)).not.toBeOnTheScreen()
    expect(screen.queryByText(/nesta semana/i)).not.toBeOnTheScreen()
  })

  it('mostra um estado curto quando ainda não há sequência nem presenças no mês', async () => {
    mockUseAttendanceInsights.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        currentStreak: 0,
        currentMonthCount: 0,
      },
    })

    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>,
    )

    expect(screen.getByText(i18n.t('home.insights.streakEmpty'))).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.insights.monthEmpty'))).toBeOnTheScreen()
  })
})
