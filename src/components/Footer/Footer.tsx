import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Container } from '../Layout';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  background-color: ${({ theme }) => theme.colors.cream};
  border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <SocialLink 
            href="https://www.linkedin.com/in/hecanyilmaz/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink 
            href="https://github.com/hecanyilmaz" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink 
            href="mailto:hecanyilmaz@gmail.com"
            aria-label="Email"
          >
            <FaEnvelope />
          </SocialLink>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};
