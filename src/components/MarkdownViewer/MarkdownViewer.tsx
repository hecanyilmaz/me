import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styled from 'styled-components';
import { Container, Section } from '../';

const MarkdownContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

const MarkdownContent = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    color: ${({ theme }) => theme.colors.darkgray};
    margin-top: ${({ theme }) => theme.spacing[8]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: 800;
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: 700;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: 700;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  
  pre {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: ${({ theme }) => theme.spacing[4]};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing[4]} 0;
    border: 1px solid ${({ theme }) => theme.colors.lightgray};
  }
  
  code {
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-family: 'Monaco', 'Consolas', monospace;
  }
  
  pre code {
    background-color: transparent;
    padding: 0;
  }
  
  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.red};
    padding-left: ${({ theme }) => theme.spacing[4]};
    margin: ${({ theme }) => theme.spacing[4]} 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.gray};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    padding-left: ${({ theme }) => theme.spacing[6]};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  a {
    color: ${({ theme }) => theme.colors.red};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.darkred};
      text-decoration: underline;
    }
  }
  
  hr {
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.lightgray};
    margin: ${({ theme }) => theme.spacing[8]} 0;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  color: ${({ theme }) => theme.colors.gray};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  color: ${({ theme }) => theme.colors.red};
`;

interface MarkdownViewerProps {
  markdownFile: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownFile }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use process.env.PUBLIC_URL to handle GitHub Pages deployment
        const publicUrl = process.env.PUBLIC_URL || '';
        const fetchUrl = `${publicUrl}/articles/${markdownFile}`;
        
        console.log('Fetching markdown from:', fetchUrl);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Public URL:', publicUrl);
        
        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
          console.error('Fetch failed:', response.status, response.statusText);
          throw new Error(`Failed to load article: ${response.status} ${response.statusText}`);
        }
        
        const content = await response.text();
        setMarkdown(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [markdownFile]);

  if (loading) {
    return (
      <Section background="cream">
        <Container>
          <MarkdownContainer>
            <LoadingState>Loading article...</LoadingState>
          </MarkdownContainer>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="cream">
        <Container>
          <MarkdownContainer>
            <ErrorState>Error: {error}</ErrorState>
          </MarkdownContainer>
        </Container>
      </Section>
    );
  }

  return (
    <Section background="cream">
      <Container>
        <MarkdownContainer>
          <MarkdownContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </MarkdownContent>
        </MarkdownContainer>
      </Container>
    </Section>
  );
};

