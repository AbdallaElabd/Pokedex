import { Theme, theme } from '@styles/theme';
import styled from 'styled-components';

export const Card = styled.div<{ elevation: keyof Theme['shadow'] }>`
  border-radius: 1rem;
  box-shadow: ${({ elevation }) => theme.shadow[elevation]};
`;
