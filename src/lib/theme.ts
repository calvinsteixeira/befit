import { colors } from '@/theme/tokens'

const sharedColors = {
  background: colors.background,
  foreground: colors.foreground,
  card: colors.surface,
  cardForeground: colors.foreground,
  popover: colors.surfaceRaised,
  popoverForeground: colors.foreground,
  primary: colors.accent,
  primaryForeground: colors.onAccent,
  secondary: colors.surfaceRaised,
  secondaryForeground: colors.foreground,
  muted: colors.surfaceRaised,
  mutedForeground: colors.muted,
  accent: colors.accent,
  accentForeground: colors.onAccent,
  destructive: '#F87171',
  destructiveForeground: '#FFFFFF',
  border: colors.border,
  input: colors.border,
  ring: colors.accent,
  radius: '1rem',
  chart1: colors.accent,
  chart2: '#5D8C65',
  chart3: colors.muted,
  chart4: colors.surfaceRaised,
  chart5: colors.border,
} as const

export const THEME = {
  light: sharedColors,
  dark: sharedColors,
} as const

export const NAV_THEME = {
  light: {
    dark: false,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    dark: true,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
} as const

export { theme } from '@/theme/theme'
