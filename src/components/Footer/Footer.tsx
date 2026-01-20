import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Container } from '../Layout';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  background-color: ${({ theme }) => theme.colors.cream};
  margin-top: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - ${({ theme }) => theme.spacing[16]});
    max-width: 900px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.lightgray};
    
    ${({ theme }) => theme.mediaQueries.tablet} {
      width: calc(100% - ${({ theme }) => theme.spacing[24]});
    }
    
    ${({ theme }) => theme.mediaQueries.desktop} {
      width: calc(100% - ${({ theme }) => theme.spacing[32]});
      max-width: 800px;
    }
    
    ${({ theme }) => theme.mediaQueries.wide} {
      width: calc(100% - ${({ theme }) => theme.spacing[40]});
      max-width: 900px;
    }
    
    ${({ theme }) => theme.mediaQueries.maxTablet} {
      width: calc(100% - ${({ theme }) => theme.spacing[8]});
    }
  }
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
