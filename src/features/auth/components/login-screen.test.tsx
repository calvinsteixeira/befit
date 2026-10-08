import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { LoginScreen } from './login-screen'

const mockSignIn = jest.fn()

jest.mock('../session-provider', () => ({
  useSession: jest.fn(),
}))
jest.mock('lucide-react-native', () => ({
  Eye: () => null,
  EyeOff: () => null,
}))

const mockUseSession = jest.requireMock('../session-provider').useSession as jest.Mock

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
    await render(<LoginScreen />)

    await fireEvent.changeText(screen.getByLabelText('E-mail'), 'atleta@befit.app')
    await fireEvent.changeText(screen.getByLabelText('Senha'), 'segredo')
    await fireEvent.press(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'atleta@befit.app',
        password: 'segredo',
      })
    })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Entrar' }).props.disabled).not.toBe(true)
    })
  })

  it('exibe erro genérico para credenciais inválidas', async () => {
    mockSignIn.mockResolvedValue({
      error: { status: 400, message: 'Invalid login credentials' },
    })
    await render(<LoginScreen />)

    await fireEvent.changeText(screen.getByLabelText('E-mail'), 'atleta@befit.app')
    await fireEvent.changeText(screen.getByLabelText('Senha'), 'incorreta')
    await fireEvent.press(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('E-mail ou senha inválidos.')).toBeOnTheScreen()
  })
})
