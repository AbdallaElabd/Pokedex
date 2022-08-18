import { Text } from '@components';
import styled from 'styled-components';

export const StyledText = styled(Text)<{ capitalize?: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: ${({ capitalize }) =>
    capitalize ? 'capitalize' : 'initial'};
  text-align: center;
`;
