import { loginSchema } from './login'

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
        'Digite um e-mail válido.',
        'Digite sua senha.',
      ])
    }
  })
})
