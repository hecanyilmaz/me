import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styled from 'styled-components';
import { Container, Section } from '../';
import { markdownCache } from '../../hooks/useMarkdownPreloader';
import { useReadingProgress } from '../../hooks/useReadingProgress';

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

const LoadingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;

const LoadingSkeleton = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const SkeletonLine = styled.div<{ width?: string; height?: string; marginBottom?: string }>`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.lightgray} 25%,
    ${({ theme }) => theme.colors.gray} 50%,
    ${({ theme }) => theme.colors.lightgray} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '12px'};
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonTitle = styled(SkeletonLine)`
  height: 32px;
  width: 60%;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SkeletonParagraph = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.7;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  color: ${({ theme }) => theme.colors.red};
`;

const MarkdownWrapper = styled.div<{ $isLoaded: boolean }>`
  opacity: ${({ $isLoaded }) => $isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1000;
  background-color: rgba(51, 51, 51, 0.1);
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.red},
    ${({ theme }) => theme.colors.darkred}
  );
  transition: width 0.15s ease;
`;


interface MarkdownViewerProps {
  markdownFile: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownFile }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const markdownRef = useRef<HTMLDivElement>(null);
  const readingProgress = useReadingProgress({ contentRef: markdownRef });

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsContentLoaded(false);
        
        // Check cache first
        const cachedContent = markdownCache.get(markdownFile);
        if (cachedContent) {
          setMarkdown(cachedContent);
          setTimeout(() => setIsContentLoaded(true), 50); // Small delay for smooth transition
          setLoading(false);
          return;
        }
        
        // Use process.env.PUBLIC_URL to handle GitHub Pages deployment
        const publicUrl = process.env.PUBLIC_URL || '';
        // Ensure we have the correct base path for GitHub Pages
        const basePath = publicUrl || (process.env.NODE_ENV === 'production' ? '/me' : '');
        const fetchUrl = `${basePath}/articles/${markdownFile}`;
        
        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
          console.error('Fetch failed:', response.status, response.statusText);
          throw new Error(`Failed to load article: ${response.status} ${response.statusText}`);
        }
        
        const content = await response.text();
        
        // Cache the content
        markdownCache.set(markdownFile, content);
        
        setMarkdown(content);
        setTimeout(() => setIsContentLoaded(true), 100); // Delay for smooth fade-in
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [markdownFile]);

  const renderSkeleton = () => (
    <LoadingSkeleton>
      <SkeletonTitle />
      <SkeletonParagraph>
        <SkeletonLine width="100%" />
        <SkeletonLine width="95%" />
        <SkeletonLine width="88%" />
        <SkeletonLine width="92%" />
      </SkeletonParagraph>
      <SkeletonParagraph>
        <SkeletonLine width="96%" />
        <SkeletonLine width="100%" />
        <SkeletonLine width="85%" />
      </SkeletonParagraph>
      <SkeletonParagraph>
        <SkeletonLine width="93%" />
        <SkeletonLine width="98%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="87%" />
      </SkeletonParagraph>
      <LoadingText>Loading article...</LoadingText>
    </LoadingSkeleton>
  );

  if (loading) {
    return (
      <Section background="cream">
        <Container>
          <LoadingContainer>
            {renderSkeleton()}
          </LoadingContainer>
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
    <>
      <ProgressBar>
        <ProgressFill $progress={readingProgress} />
      </ProgressBar>
      <Section background="cream">
        <Container>
          <MarkdownContainer>
            <MarkdownWrapper $isLoaded={isContentLoaded} ref={markdownRef}>
              <MarkdownContent>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {markdown}
                </ReactMarkdown>
              </MarkdownContent>
            </MarkdownWrapper>
          </MarkdownContainer>
        </Container>
      </Section>
    </>
  );
};

