import i18n, { i18nReady, resolveLocale } from './index'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'en-US' }],
}))

describe('i18n', () => {
  it('usa pt-BR para o idioma suportado e como fallback', async () => {
    await i18nReady

    expect(resolveLocale('pt-BR')).toBe('pt-BR')
    expect(resolveLocale('en-US')).toBe('pt-BR')
    expect(i18n.language).toBe('pt-BR')
    expect(i18n.t('tabs.home')).toBe('Início')
  })
})
