import * as Localization from 'expo-localization'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBR from './locales/pt-BR'

const supportedLocales = ['pt-BR'] as const
const fallbackLocale = 'pt-BR'

export function resolveLocale(deviceLocale?: string) {
  return (
    supportedLocales.find(
      (locale) => locale.toLowerCase() === deviceLocale?.toLowerCase(),
    ) ?? fallbackLocale
  )
}

const deviceLocale = Localization.getLocales()[0]?.languageTag
const locale = resolveLocale(deviceLocale)

const i18n = createInstance()

export const i18nReady = i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  debug: false,
  fallbackLng: fallbackLocale,
  interpolation: { escapeValue: false },
  lng: locale,
  resources: {
    'pt-BR': ptBR,
  },
  returnNull: false,
  supportedLngs: supportedLocales,
})

export default i18n
