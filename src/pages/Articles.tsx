import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Section, Text } from '../components';
import { Article } from '../types/articles';
import articlesData from '../data/articles.json';

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const ArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const ArticleItem = styled(Link)`
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

const ArticleHeader = styled.div`
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

const ArticleTitle = styled.h3`
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

const ArticleDate = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  opacity: 0.7;
  white-space: nowrap;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ArticleSummary = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
  opacity: 0.8;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

const Tag = styled.span`
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

export const Articles: React.FC = () => {
  // Sort articles by date (most recent first)
  const sortedArticles = [...(articlesData as Article[])].sort((a, b) => 
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

  const getArticleSlug = (markdownFile: string): string => {
    return markdownFile.replace('.md', '');
  };

  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>

          <StatsSection>
            <StatsText>
              {sortedArticles.length} articles published
            </StatsText>
          </StatsSection>

          <ArticlesList>
            {sortedArticles.map((article) => (
              <ArticleItem
                key={article.id}
                to={`/articles/${getArticleSlug(article.markdownFile)}`}
              >
                <ArticleHeader>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDate>{formatDate(article.date)}</ArticleDate>
                </ArticleHeader>
                <ArticleSummary>{article.summary}</ArticleSummary>
                <TagsContainer>
                  {article.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </ArticleItem>
            ))}
          </ArticlesList>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
