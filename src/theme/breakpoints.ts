export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
} as const;

export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  
  // Max-width queries for mobile-first approach
  maxMobile: `@media (max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
  maxTablet: `@media (max-width: ${parseInt(breakpoints.desktop) - 1}px)`,
  maxDesktop: `@media (max-width: ${parseInt(breakpoints.wide) - 1}px)`,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;
