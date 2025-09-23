import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { MarkdownViewer, Container, Section, Text } from '../components';
import { Article } from '../types/articles';
import articlesData from '../data/articles.json';

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.darkgray};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  
  &::before {
    content: '←';
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const NotFoundWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} 0;
`;

const NotFoundText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the article by slug (markdown file name without .md)
  const article = (articlesData as Article[]).find(
    a => a.markdownFile.replace('.md', '') === slug
  );

  if (!article) {
    return (
      <Section background="cream">
        <Container>
          <ContentWrapper>
            <BackLink to="/articles">Back to Articles</BackLink>
            <NotFoundWrapper>
              <NotFoundText>Article not found</NotFoundText>
              <Text size="base" color="gray">
                The article you're looking for doesn't exist or has been removed.
              </Text>
            </NotFoundWrapper>
          </ContentWrapper>
        </Container>
      </Section>
    );
  }

  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <BackLink to="/articles">Back to Articles</BackLink>
        </ContentWrapper>
      </Container>
      <MarkdownViewer markdownFile={article.markdownFile} />
    </Section>
  );
};

