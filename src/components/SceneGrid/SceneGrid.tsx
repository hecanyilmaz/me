import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SceneWithPath } from '../../types/scenes';

interface SceneGridProps {
  scenes: SceneWithPath[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing[4]} 0;
  }
`;

const GridItem = styled.div<{ $delay: number; $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.cream};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.8s ease ${({ $delay }) => $delay}s, 
              transform 0.8s ease ${({ $delay }) => $delay}s;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
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

const SceneInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SceneDate = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.darkgray};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScenePlace = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0;
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

export const SceneGrid: React.FC<SceneGridProps> = ({ scenes }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GridContainer>
      {scenes.map((scene, index) => (
        <GridItem 
          key={scene.photo_name}
          $delay={index * 0.1}
          $isVisible={isVisible}
        >
          <LazyImage 
            src={scene.photo_path} 
            alt={scene.place}
          />
          <SceneInfo>
            <SceneDate>{formatDate(scene.date)}</SceneDate>
            <ScenePlace>{scene.place}</ScenePlace>
          </SceneInfo>
        </GridItem>
      ))}
    </GridContainer>
  );
};

