import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Section, Text } from '../components';
import experiencesData from '../data/experiences.json';
import { Experience as ExperienceType } from '../types/experience';

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const ExperienceItem = styled.div<{ $isVisible: boolean; $delay: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.6s ease ${({ $delay }) => $delay}s, 
              transform 0.6s ease ${({ $delay }) => $delay}s;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[1]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    align-items: flex-start;
  }
`;

const CompanyName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.red};
    }
  }

  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const Duration = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.italic};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
`;

const Location = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
`;

const Position = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const TechTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.darkgray};
  background-color: rgba(51, 51, 51, 0.1);
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: 12px;
  opacity: 0.8;

  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: 2px ${({ theme }) => theme.spacing[1]};
  }
`;

export const Experience: React.FC = () => {
  const experiences = experiencesData as ExperienceType[];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <ExperienceList>
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} $isVisible={isVisible} $delay={index * 0.1}>
                <HeaderRow>
                  <HeaderLeft>
                    <CompanyName>
                      {exp.companyUrl ? (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                    </CompanyName>
                    <Position>{exp.position}</Position>
                  </HeaderLeft>
                  <HeaderRight>
                    <Duration>{exp.duration}</Duration>
                    {exp.location && <Location>{exp.location}</Location>}
                  </HeaderRight>
                </HeaderRow>
                
                <Text>{exp.description}</Text>
                
                {exp.technologies && (
                  <TechnologiesList>
                    {exp.technologies.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechnologiesList>
                )}
              </ExperienceItem>
            ))}
          </ExperienceList>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
