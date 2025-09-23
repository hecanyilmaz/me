import React from 'react';
import styled from 'styled-components';
import { Container, Section, Heading, Text, Timeline } from '../components';
import scenesData from '../data/scenes.json';
import { ScenesData } from '../types/scenes';

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

export const Scenes: React.FC = () => {
  const data: ScenesData = scenesData;
  
  return (
    <Section background="cream">
      <Container>
        <ContentWrapper>
          <Timeline scenes={data.scenes} />
        </ContentWrapper>
      </Container>
    </Section>
  );
};
