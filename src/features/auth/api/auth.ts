import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase/client'

export const authApi = {
  getSession: () => supabase.auth.getSession(),
  onAuthStateChange: (
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) => supabase.auth.onAuthStateChange(callback),
  signIn: (credentials: { email: string; password: string }) =>
    supabase.auth.signInWithPassword(credentials),
  signOut: () => supabase.auth.signOut(),
}
