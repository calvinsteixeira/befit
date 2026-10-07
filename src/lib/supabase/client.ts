import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

import { getSupabaseEnvironment } from './env'

export function createClient() {
  const { publishableKey, url } = getSupabaseEnvironment()

  return createSupabaseClient(url, publishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: AsyncStorage,
    },
  })
}
