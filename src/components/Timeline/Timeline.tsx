import React from 'react';
import styled from 'styled-components';
import { Scene } from '../../types/scenes';

interface TimelineProps {
  scenes: Scene[];
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

const SceneImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme }) => theme.mediaQueries.maxTablet} {
    width: 100%;
    max-width: 250px;
    height: 200px;
  }
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

export const Timeline: React.FC<TimelineProps> = ({ scenes }) => {
  return (
    <TimelineContainer>
      {scenes.map((scene, index) => (
        <TimelineItem key={scene.id}>
          <TimelineDot />
          <TimelineContent>
            <SceneImage 
              src={scene.photo_path} 
              alt={scene.place}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <SceneDate>{formatDate(scene.date)}</SceneDate>
            <ScenePlace>{scene.place}</ScenePlace>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};
