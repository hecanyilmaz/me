import styled from 'styled-components';

interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'regular' | 'bold';
  color?: 'darkgray' | 'gray' | 'red' | 'darkred' | 'navy' | 'blue' | 'white';
  align?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  margin?: string;
}

export const Text = styled.p<TextProps>`
  font-family: ${({ theme, italic, weight = 'regular' }) => {
    if (italic) return theme.typography.fontFamily.italic;
    return weight === 'bold' ? theme.typography.fontFamily.bold : theme.typography.fontFamily.regular;
  }};
  
  font-size: ${({ theme, size = 'base' }) => theme.typography.fontSize[size]};
  color: ${({ theme, color = 'darkgray' }) => theme.colors[color]};
  text-align: ${({ align = 'left' }) => align};
  line-height: ${({ theme, lineHeight = 'normal' }) => theme.typography.lineHeight[lineHeight]};
  margin: ${({ margin }) => margin || '0 0 1rem 0'};
  
  &:last-child {
    margin-bottom: 0;
  }
`;
