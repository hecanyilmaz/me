import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SceneWithPath } from '../../types/scenes';

interface TimelineProps {
  scenes: SceneWithPath[];
}

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 80px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.darkgray};
    
    ${({ theme }) => theme.mediaQueries.maxTablet} {
      left: 30px;
      width: 1px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing[6]} 0;
  position: relative;
  padding-left: 120px;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    padding-left: 70px;
  }
`;

const TimelineContent = styled.div`
  background-color: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.spacing[6]};
  flex: 1;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 100%;
    border: 10px solid transparent;
    border-right-color: ${({ theme }) => theme.colors.cream};
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 80px;
  top: 30px;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.darkgray};
  border-radius: 50%;
  transform: translateX(-50%);
  border: 3px solid ${({ theme }) => theme.colors.darkgray};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.darkgray};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    left: 30px;
    width: 10px;
    height: 10px;
    border: 2px solid ${({ theme }) => theme.colors.darkgray};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.darkgray};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    width: 100%;
    max-width: 250px;
    height: 200px;
  }
`;

const SceneImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
`;

const LoadingSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.lightgray} 25%,
    ${({ theme }) => theme.colors.gray} 50%,
    ${({ theme }) => theme.colors.lightgray} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightgray};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.darkgray};
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SceneDate = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.darkgray};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScenePlace = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
`;



const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
  };

  return (
    <ImageContainer ref={imgRef}>
      {!isLoaded && !isError && <LoadingSkeleton />}
      {isError ? (
        <ErrorPlaceholder>Image not available</ErrorPlaceholder>
      ) : (
        isInView && (
          <SceneImage
            src={src}
            alt={alt}
            $loaded={isLoaded}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        )
      )}
    </ImageContainer>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ scenes }) => {
  return (
    <TimelineContainer>
      {scenes.map((scene, index) => (
        <TimelineItem key={scene.id}>
          <TimelineDot />
          <TimelineContent>
            <LazyImage 
              src={scene.photo_path} 
              alt={scene.place}
            />
            <SceneDate>{formatDate(scene.date)}</SceneDate>
            <ScenePlace>{scene.place}</ScenePlace>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};
