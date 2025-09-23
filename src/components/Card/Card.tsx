import styled from 'styled-components';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  border?: boolean;
  background?: 'white' | 'cream' | 'transparent';
}

export const Card = styled.div<CardProps>`
  background-color: ${({ theme, background = 'white' }) => {
    switch (background) {
      case 'white':
        return theme.colors.white;
      case 'cream':
        return theme.colors.cream;
      default:
        return 'transparent';
    }
  }};
  
  padding: ${({ theme, padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return theme.spacing[4];
      case 'md':
        return theme.spacing[6];
      case 'lg':
        return theme.spacing[8];
      default:
        return theme.spacing[6];
    }
  }};
  
  border-radius: 8px;
  
  ${({ border, theme }) => border && `
    border: 1px solid ${theme.colors.lightgray};
  `}
  
  ${({ shadow, theme }) => shadow && `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `}
  
  transition: all 0.2s ease-in-out;
  
  &:hover {
    ${({ shadow }) => shadow && `
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    `}
  }
`;
