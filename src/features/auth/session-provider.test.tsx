import type { Session } from '@supabase/supabase-js'
import { fireEvent, render, screen } from '@testing-library/react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { SessionProvider, useSession } from './session-provider'

jest.mock('./api/auth', () => ({
  authApi: {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
}))

const mockedAuthApi = jest.requireMock('./api/auth').authApi as {
  getSession: jest.Mock
  onAuthStateChange: jest.Mock
  signIn: jest.Mock
  signOut: jest.Mock
}
const mockUnsubscribe = jest.fn()

function SessionProbe() {
  const { isLoading, user, signOut } = useSession()

  return (
    <>
      <Text testID="session-status">
        {isLoading ? 'loading' : user ? 'authenticated' : 'anonymous'}
      </Text>
      <Button onPress={() => void signOut()}>
        <Text>Sair</Text>
      </Button>
    </>
  )
}

describe('SessionProvider', () => {
  beforeEach(() => {
    mockedAuthApi.getSession.mockReset()
    mockedAuthApi.onAuthStateChange.mockReset()
    mockedAuthApi.signIn.mockReset()
    mockedAuthApi.signOut.mockReset()
    mockUnsubscribe.mockReset()
    mockedAuthApi.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    })
  })

  it('resolve sessão persistida e disponibiliza signOut', async () => {
    const session = { user: { id: 'user-1' } } as Session
    mockedAuthApi.getSession.mockResolvedValue({ data: { session }, error: null })
    mockedAuthApi.signOut.mockResolvedValue({ error: null })

    await render(
      <SessionProvider>
        <SessionProbe />
      </SessionProvider>,
    )

    expect(await screen.findByText('authenticated')).toBeOnTheScreen()
    expect(mockedAuthApi.onAuthStateChange).toHaveBeenCalledTimes(1)

    fireEvent.press(screen.getByRole('button', { name: 'Sair' }))

    expect(mockedAuthApi.signOut).toHaveBeenCalledTimes(1)
  })

  it('mantém sessão anônima quando não há sessão persistida', async () => {
    mockedAuthApi.getSession.mockResolvedValue({ data: { session: null }, error: null })

    await render(
      <SessionProvider>
        <SessionProbe />
      </SessionProvider>,
    )

    expect(await screen.findByText('anonymous')).toBeOnTheScreen()
  })
})
