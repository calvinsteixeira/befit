import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { ProfileScreen } from './profile-screen'

const mockSignOut = jest.fn()

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('@/features/auth/session-provider', () => ({
  useSession: jest.fn(),
}))

const mockUseSession = jest.requireMock('@/features/auth/session-provider').useSession as jest.Mock

async function renderProfileScreen() {
  await i18nReady

  return render(
    <I18nextProvider i18n={i18n}>
      <ProfileScreen />
    </I18nextProvider>,
  )
}

describe('ProfileScreen', () => {
  beforeEach(() => {
    mockSignOut.mockReset()
    mockUseSession.mockReturnValue({
      signOut: mockSignOut,
      user: { email: 'atleta@befit.app' },
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('executa logout e sinaliza o estado de carregamento', async () => {
    let resolveSignOut: (value: { error: null }) => void = () => undefined
    mockSignOut.mockReturnValue(
      new Promise((resolve) => {
        resolveSignOut = resolve
      }),
    )

    await renderProfileScreen()
    const signOutButton = screen.getByTestId('profile-sign-out')

    fireEvent.press(signOutButton)

    await waitFor(() => {
      expect(screen.getByTestId('profile-sign-out').props.accessibilityState.disabled).toBe(true)
    })
    expect(screen.getByText(i18n.t('profile.status.signingOut'))).toBeOnTheScreen()
    expect(mockSignOut).toHaveBeenCalledTimes(1)

    resolveSignOut({ error: null })

    await waitFor(() => {
      expect(screen.getByTestId('profile-sign-out').props.accessibilityState.disabled).not.toBe(true)
    })
  })
})
