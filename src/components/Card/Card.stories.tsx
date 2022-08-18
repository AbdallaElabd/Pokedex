import styled from 'styled-components';

import { Card } from './Card';

export default {
  component: Card,
};

const Container = styled.div`
  display: flex;
  padding: 3rem;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5rem;
`;

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13rem;
  height: 13rem;
  padding: 1rem;
`;

export function Default() {
  return (
    <Container>
      <StyledCard elevation={0}>Elevation: 0</StyledCard>
      <StyledCard elevation={1}>Elevation: 1</StyledCard>
      <StyledCard elevation={2}>Elevation: 2</StyledCard>
      <StyledCard elevation={4}>Elevation: 4</StyledCard>
      <StyledCard elevation={8}>Elevation: 8</StyledCard>
      <StyledCard elevation={16}>Elevation: 16</StyledCard>
    </Container>
  );
}
