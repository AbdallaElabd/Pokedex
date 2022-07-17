import { Button } from '@components';
import styled from 'styled-components';

export const Container = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
