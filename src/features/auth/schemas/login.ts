import { z } from 'zod'

import type { Translate } from '@/i18n/types'

export function createLoginSchema(t: Translate) {
  return z.object({
    email: z.string().trim().email(t('auth.validation.invalidEmail')),
    password: z.string().min(1, t('auth.validation.passwordRequired')),
  })
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
