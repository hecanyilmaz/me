import React from 'react';
import styled from 'styled-components';
import { Container, Section, Heading, Text } from '../components';
import { Link } from 'react-router-dom';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.red};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.darkred};
    text-decoration: underline;
  }
`;

export const NotFound: React.FC = () => {
  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <Heading level={1} color="darkgray">404</Heading>
          <Heading level={2} color="darkgray">Page Not Found</Heading>
          <Text color="darkgray" size="lg">
            The page you are looking for doesn't exist or has been moved.
          </Text>
          <StyledLink to="/">Go back home</StyledLink>
        </ContentWrapper>
      </Container>
    </Section>
  );
};


