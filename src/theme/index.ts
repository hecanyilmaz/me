import { colors } from './colors';
import { typography } from './typography';
import { breakpoints, mediaQueries } from './breakpoints';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  breakpoints,
  mediaQueries,
  spacing,
  // Common combinations for convenience
  defaults: {
    backgroundColor: colors.cream,
    textColor: colors.darkgray,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
} as const;

export type Theme = typeof theme;

// Re-export individual theme parts
export { colors, typography, breakpoints, mediaQueries, spacing };
export * from './colors';
export * from './typography';
export * from './breakpoints';
export * from './spacing';
