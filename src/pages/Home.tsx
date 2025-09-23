import React from 'react';
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

const ImageSection = styled.div`
  flex-shrink: 0;
  
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

const TextSection = styled.div`
  flex: 1;
  
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
  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <AboutContent>
            <ImageSection>
              <ProfileImage src={profileImage} alt="Can Yılmaz" />
            </ImageSection>
            
            <TextSection>
              <ContactText as="p">
                Hi there!
              </ContactText>

              <ContactText as="p">
                My name is Can, and I actively finding 
                wonder in the details of technology, nature, and art. I also like questioning the things that are not clear to me.
              </ContactText>

              <ContactText as="p">
                I'm currently working as a Software Engineer at <b>GarantiBBVA</b>. I'm graduated from Hacettepe University, Computer Engineering Department in 2024.
              </ContactText>
              
              <ContactText as="p">
                You can contact me using <ContactLink href="https://github.com/hecanyilmaz" target="_blank" rel="noopener noreferrer">GitHub</ContactLink>, <ContactLink href="https://www.linkedin.com/in/hecanyilmaz/" target="_blank" rel="noopener noreferrer">LinkedIn</ContactLink> and through <ContactLink href="mailto:hecanyilmaz@gmail.com">e-mail</ContactLink>.
              </ContactText>
            </TextSection>
          </AboutContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
