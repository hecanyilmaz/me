import styled from 'styled-components';

interface SectionProps {
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'cream' | 'white' | 'transparent';
}

export const Section = styled.section<SectionProps>`
  background-color: ${({ theme, background = 'transparent' }) => {
    switch (background) {
      case 'cream':
        return theme.colors.cream;
      case 'white':
        return theme.colors.white;
      default:
        return 'transparent';
    }
  }};
  
  padding: ${({ theme, padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return `${theme.spacing[2]} 0`;
      case 'md':
        return `${theme.spacing[2]} 0`;
      case 'lg':
        return `${theme.spacing[2]} 0`;
      case 'xl':
        return `${theme.spacing[2]} 0`;
      default:
        return `${theme.spacing[2]} 0`;
    }
  }};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    padding: ${({ padding = 'md' }) => {
      switch (padding) {
        case 'sm':
          return '0 0';
        case 'md':
          return '0 0';
        case 'lg':
          return '0 0';
        case 'xl':
          return '0 0';
        default:
          return '0 0';
      }
    }};
  }
`;
