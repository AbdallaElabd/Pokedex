import { Button, Text } from '@components';
import styled from 'styled-components';

export const StyledButton = styled(Button).attrs({ circular: true })`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledText = styled(Text)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
