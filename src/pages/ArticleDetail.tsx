import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MarkdownViewer, Container, Section, Text } from '../components';
import { Article } from '../types/articles';
import articlesData from '../data/articles.json';

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
      <MarkdownViewer markdownFile={article.markdownFile} />
    </Section>
  );
};

