import React from 'react';
import styled from 'styled-components';
import { Container, Section, Text } from '../components';
import { Project } from '../types/projects';
import projectsData from '../data/projects.json';

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const ProjectItem = styled.div`
  display: block;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(51, 51, 51, 0.05);
    border-left-color: ${({ theme }) => theme.colors.darkgray};
    transform: translateX(4px);
  }
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[1]};
    align-items: flex-start;
  }
`;

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  flex: 1;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ProjectDate = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
  white-space: nowrap;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ProjectDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
  opacity: 0.9;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Technology = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.darkgray};
  background-color: rgba(51, 51, 51, 0.1);
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: 12px;
  opacity: 0.8;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
`;

const ProjectLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.red};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.darkred};
    text-decoration: underline;
  }
`;


const IntroText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 1;
  text-align: left;
  max-width: 600px;
  margin: 0 0 2rem 0;
`;

const StatsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[0]};
  padding: ${({ theme }) => theme.spacing[4]} 0;
  text-align: center;
  border-bottom: 1px solid rgba(51, 51, 51, 0.1);
`;

const StatsText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const Projects: React.FC = () => {
  // Sort projects by date (most recent first)
  const sortedProjects = [...(projectsData as Project[])].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <StatsSection>
            <StatsText>
              {sortedProjects.length} projects showcased
            </StatsText>
          </StatsSection>

          <ProjectsList>
            {sortedProjects.map((project) => (
              <ProjectItem key={project.id}>
                <ProjectHeader>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDate>{formatDate(project.date)}</ProjectDate>
                </ProjectHeader>
                
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectMeta>
                  <TechnologiesContainer>
                    {project.technologies.map((tech, index) => (
                      <Technology key={index}>{tech}</Technology>
                    ))}
                  </TechnologiesContainer>
                  
                  <LinksContainer>
                    {project.githubUrl && (
                      <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </ProjectLink>
                    )}
                    
                    {project.liveUrl && (
                      <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </ProjectLink>
                    )}
                  </LinksContainer>
                </ProjectMeta>
              </ProjectItem>
            ))}
          </ProjectsList>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
