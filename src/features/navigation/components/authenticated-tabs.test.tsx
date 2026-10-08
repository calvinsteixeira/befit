import { render } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'

import i18n, { i18nReady } from '@/i18n'

import { AuthenticatedTabs } from './authenticated-tabs'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('lucide-react-native', () => ({
  CalendarCheck2: () => null,
  House: () => null,
  UserRound: () => null,
}))

jest.mock('expo-router', () => {
  const React = jest.requireActual<typeof import('react')>('react')
  const { Text, View } = jest.requireActual<typeof import('react-native')>('react-native')

  const Tabs = Object.assign(
    function MockTabs({ children }: { children: ReactNode }) {
      return React.createElement(View, { testID: 'authenticated-tabs' }, children)
    },
    {
      Screen: function MockTabsScreen({
        name,
        options,
      }: {
        name: string
        options: { tabBarLabel: string; tabBarAccessibilityLabel: string }
      }) {
        return React.createElement(
          Text,
          { testID: `tab-${name}`, accessibilityLabel: options.tabBarAccessibilityLabel },
          options.tabBarLabel,
        )
      },
    },
  )

  return { Tabs }
})

describe('AuthenticatedTabs', () => {
  it('expõe as três abas com labels localizados', async () => {
    await i18nReady
    const rendered = await render(
      <I18nextProvider i18n={i18n}>
        <AuthenticatedTabs />
      </I18nextProvider>,
    )

    expect(rendered.getByTestId('authenticated-tabs')).toBeOnTheScreen()
    expect(rendered.getByLabelText(i18n.t('tabs.home'))).toBeOnTheScreen()
    expect(rendered.getByLabelText(i18n.t('tabs.attendance'))).toBeOnTheScreen()
    expect(rendered.getByLabelText(i18n.t('tabs.profile'))).toBeOnTheScreen()
  })
})
