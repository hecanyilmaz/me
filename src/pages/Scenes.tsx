import React from 'react';
import styled from 'styled-components';
import { Container, Section, Heading, Text, Timeline } from '../components';
import scenesData from '../data/scenes.json';
import { ScenesData, SceneWithPath } from '../types/scenes';
import { sceneImages } from '../assets/scenes';

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

export const Scenes: React.FC = () => {
  const data: ScenesData = scenesData;
  
  // Transform scenes to include actual image imports
  const scenesWithImages: SceneWithPath[] = data.scenes.map(scene => ({
    ...scene,
    photo_path: sceneImages[scene.photo_name] || ''
  }));
  
  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <Timeline scenes={scenesWithImages} />
        </ContentWrapper>
      </Container>
    </Section>
  );
};
