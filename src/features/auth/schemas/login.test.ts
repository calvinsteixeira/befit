import i18n, { i18nReady } from '@/i18n'

import { createLoginSchema } from './login'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))

let loginSchema: ReturnType<typeof createLoginSchema>

beforeAll(async () => {
  await i18nReady
  loginSchema = createLoginSchema((key) => i18n.t(key))
})

describe('loginSchema', () => {
  it('aceita e-mail e senha preenchidos', () => {
    expect(
      loginSchema.safeParse({ email: ' atleta@befit.app ', password: 'segredo' }).success,
    ).toBe(true)
  })

  it('rejeita e-mail inválido e senha vazia', () => {
      const result = loginSchema.safeParse({ email: 'atleta', password: '' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toEqual([
        i18n.t('auth.validation.invalidEmail'),
        i18n.t('auth.validation.passwordRequired'),
      ])
    }
  })
})
