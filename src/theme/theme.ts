import { brand, colors, radius, spacing } from './tokens'

/**
 * Semantic tokens shared by NativeWind/Reusables and native code.
 * The CSS variables in global.css are the HSL representation of these values.
 */
export const theme = {
  colors: {
    background: colors.background,
    surface: colors.surface,
    surfaceRaised: colors.surfaceRaised,
    foreground: colors.foreground,
    muted: colors.muted,
    border: colors.border,
    accent: colors.accent,
    onAccent: colors.onAccent,
  },
  radius,
  spacing,
  brand,
} as const
