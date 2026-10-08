import { render, screen } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { HomeScreen } from './home-screen'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('lucide-react-native', () => ({
  CircleDashed: () => null,
}))

describe('HomeScreen', () => {
  it('mantém uma base visual vazia para as próximas funcionalidades', async () => {
    await i18nReady
    await render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>,
    )

    expect(screen.getByTestId('home-screen')).toBeOnTheScreen()
    expect(screen.getByText(i18n.t('home.empty.title'))).toBeOnTheScreen()
    expect(screen.queryByText(/streak|faltas/i)).not.toBeOnTheScreen()
  })
})
