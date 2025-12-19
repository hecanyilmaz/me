import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Section, Heading, Text } from '../components';
import profileImage from '../assets/image.png';

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const AboutContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: flex-start;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
    align-items: center;
    text-align: center;
  }
`;

const ImageSection = styled.div<{ $isVisible: boolean }>`
  flex-shrink: 0;
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'scale(1)' : 'scale(0.9)'};
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    order: -1;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    width: 160px;
    height: 160px;
  }
`;

const TextSection = styled.div<{ $isVisible: boolean }>`
  flex: 1;
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    text-align: center;
  }
`;

const IntroText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const ContactText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.red};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.darkred};
    text-decoration: underline;
  }
`;

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <AboutContent>
            <ImageSection $isVisible={isVisible}>
              <ProfileImage src={profileImage} alt="Can Yılmaz" />
            </ImageSection>
            
            <TextSection $isVisible={isVisible}>
              <ContactText as="p">
                <b>Hi there! My name is Can, I graduated from Hacettepe University. I'm a software engineer with two years of experience at GarantiBBVA and interested in distributed systems and cloud computing.</b>
              </ContactText>
              
              <ContactText as="p">
                <b>You can contact me using <ContactLink href="https://github.com/hecanyilmaz" target="_blank" rel="noopener noreferrer">GitHub</ContactLink>, <ContactLink href="https://www.linkedin.com/in/hecanyilmaz/" target="_blank" rel="noopener noreferrer">LinkedIn</ContactLink> and through <ContactLink href="mailto:hecanyilmaz@gmail.com">e-mail</ContactLink>.</b>
              </ContactText>
            </TextSection>
          </AboutContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
