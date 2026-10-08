import type { AuthError, Session, User } from '@supabase/supabase-js'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthActionResult {
  error: AuthError | null
}

export interface SessionContextValue {
  session: Session | null
  user: User | null
  isLoading: boolean
  signIn: (credentials: LoginCredentials) => Promise<AuthActionResult>
  signOut: () => Promise<AuthActionResult>
}
