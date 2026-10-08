import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { authApi } from './api/auth'
import type { AuthActionResult, LoginCredentials, SessionContextValue } from './types'

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<SessionContextValue['session']>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const {
      data: { subscription },
    } = authApi.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession)
        setIsLoading(false)
      }
    })

    void authApi
      .getSession()
      .then(({ data }) => {
        if (isMounted) {
          setSession(data.session)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (credentials: LoginCredentials): Promise<AuthActionResult> => {
    const { error } = await authApi.signIn(credentials)
    return { error }
  }, [])

  const signOut = useCallback(async (): Promise<AuthActionResult> => {
    const { error } = await authApi.signOut()
    return { error }
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isLoading,
      signIn,
      signOut,
    }),
    [isLoading, session, signIn, signOut],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession deve ser usado dentro de SessionProvider.')
  }

  return context
}
