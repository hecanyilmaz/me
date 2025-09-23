import React from 'react';
import styled from 'styled-components';
import { Container, Section, Heading, Text } from '../components';
import { ReadArticle } from '../types/reads';
import readsData from '../data/reads.json';

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const ReadsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const ReadItem = styled.a`
  display: block;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-left: 3px solid transparent;
  text-decoration: none;
  color: inherit;
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

const ReadHeader = styled.div`
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

const ReadTitle = styled.h3`
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

const ReadDate = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
  white-space: nowrap;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ReadSource = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
  opacity: 0.8;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ReadDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0;
  opacity: 0.9;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
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

export const Reads: React.FC = () => {
  // Sort reads by date (most recent first)
  const sortedReads = [...(readsData as ReadArticle[])].sort((a, b) => 
    new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime()
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
              {sortedReads.length} articles read
            </StatsText>
          </StatsSection>

          <ReadsList>
            {sortedReads.map((read) => (
              <ReadItem
                key={read.id}
                href={read.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReadHeader>
                  <ReadTitle>{read.title}</ReadTitle>
                  <ReadDate>{formatDate(read.dateRead)}</ReadDate>
                </ReadHeader>
                <ReadSource>{read.source}</ReadSource>
                <ReadDescription>{read.description}</ReadDescription>
              </ReadItem>
            ))}
          </ReadsList>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
