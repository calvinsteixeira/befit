import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { LoginScreen } from './login-screen'

const mockSignIn = jest.fn()

jest.mock('../session-provider', () => ({
  useSession: jest.fn(),
}))
jest.mock('lucide-react-native', () => ({
  Eye: () => null,
  EyeOff: () => null,
}))
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))

const mockUseSession = jest.requireMock('../session-provider').useSession as jest.Mock

async function renderLoginScreen() {
  await i18nReady

  return render(
    <I18nextProvider i18n={i18n}>
      <LoginScreen />
    </I18nextProvider>,
  )
}

describe('LoginScreen', () => {
  beforeEach(() => {
    mockSignIn.mockReset()
    mockUseSession.mockReturnValue({ signIn: mockSignIn })
  })

  afterEach(() => {
    cleanup()
  })

  it('submete credenciais válidas pelo serviço de sessão', async () => {
    mockSignIn.mockResolvedValue({ error: null })
    await renderLoginScreen()

    await fireEvent.changeText(screen.getByLabelText(i18n.t('auth.fields.email.label')), 'atleta@befit.app')
    await fireEvent.changeText(screen.getByLabelText(i18n.t('auth.fields.password.label')), 'segredo')
    await fireEvent.press(screen.getByRole('button', { name: i18n.t('auth.actions.signIn') }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'atleta@befit.app',
        password: 'segredo',
      })
    })
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: i18n.t('auth.actions.signIn') }).props.disabled,
      ).not.toBe(true)
    })
  })

  it('exibe erro genérico para credenciais inválidas', async () => {
    mockSignIn.mockResolvedValue({
      error: { status: 400, message: 'Invalid login credentials' },
    })
    await renderLoginScreen()

    await fireEvent.changeText(screen.getByLabelText(i18n.t('auth.fields.email.label')), 'atleta@befit.app')
    await fireEvent.changeText(screen.getByLabelText(i18n.t('auth.fields.password.label')), 'incorreta')
    await fireEvent.press(screen.getByRole('button', { name: i18n.t('auth.actions.signIn') }))

    expect(await screen.findByText(i18n.t('auth.errors.invalidCredentials'))).toBeOnTheScreen()
  })
})
