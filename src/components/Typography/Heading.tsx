import styled from 'styled-components';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: 'regular' | 'bold' | 'extraBold';
  color?: 'darkgray' | 'red' | 'darkred' | 'navy' | 'blue';
  align?: 'left' | 'center' | 'right';
  margin?: string;
}

const getHeadingStyles = (level: number, theme: any) => {
  switch (level) {
    case 1:
      return {
        fontSize: theme.typography.fontSize['5xl'],
        lineHeight: theme.typography.lineHeight.tight,
        marginBottom: theme.spacing[6],
      };
    case 2:
      return {
        fontSize: theme.typography.fontSize['4xl'],
        lineHeight: theme.typography.lineHeight.tight,
        marginBottom: theme.spacing[5],
      };
    case 3:
      return {
        fontSize: theme.typography.fontSize['3xl'],
        lineHeight: theme.typography.lineHeight.normal,
        marginBottom: theme.spacing[4],
      };
    case 4:
      return {
        fontSize: theme.typography.fontSize['2xl'],
        lineHeight: theme.typography.lineHeight.normal,
        marginBottom: theme.spacing[3],
      };
    case 5:
      return {
        fontSize: theme.typography.fontSize.xl,
        lineHeight: theme.typography.lineHeight.normal,
        marginBottom: theme.spacing[2],
      };
    case 6:
      return {
        fontSize: theme.typography.fontSize.lg,
        lineHeight: theme.typography.lineHeight.normal,
        marginBottom: theme.spacing[2],
      };
    default:
      return {
        fontSize: theme.typography.fontSize['3xl'],
        lineHeight: theme.typography.lineHeight.normal,
        marginBottom: theme.spacing[4],
      };
  }
};

export const Heading = styled.h1.attrs<HeadingProps>(({ level = 1 }) => ({
  as: `h${level}` as any,
}))<HeadingProps>`
  font-family: ${({ theme, weight = 'bold' }) => {
    switch (weight) {
      case 'regular':
        return theme.typography.fontFamily.regular;
      case 'bold':
        return theme.typography.fontFamily.bold;
      case 'extraBold':
        return theme.typography.fontFamily.extraBold;
      default:
        return theme.typography.fontFamily.bold;
    }
  }};
  
  color: ${({ theme, color = 'darkgray' }) => theme.colors[color]};
  text-align: ${({ align = 'left' }) => align};
  margin: ${({ margin }) => margin || '0'};
  
  ${({ level = 1, theme }) => {
    const styles = getHeadingStyles(level, theme);
    return `
      font-size: ${styles.fontSize};
      line-height: ${styles.lineHeight};
      margin-bottom: ${styles.marginBottom};
    `;
  }}
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    ${({ level = 1, theme }) => {
      const mobileSize = level === 1 ? theme.typography.fontSize['4xl'] :
                        level === 2 ? theme.typography.fontSize['3xl'] :
                        level === 3 ? theme.typography.fontSize['2xl'] :
                        level === 4 ? theme.typography.fontSize.xl :
                        level === 5 ? theme.typography.fontSize.lg :
                        theme.typography.fontSize.base;
      return `font-size: ${mobileSize};`;
    }}
  }
`;
