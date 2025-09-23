import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: 0 ${({ theme }) => theme.spacing[12]};
  }
  
  ${({ theme }) => theme.mediaQueries.desktop} {
    padding: 0 ${({ theme }) => theme.spacing[16]};
    max-width: 800px;
  }
  
  ${({ theme }) => theme.mediaQueries.wide} {
    padding: 0 ${({ theme }) => theme.spacing[20]};
    max-width: 900px;
  }
`;
