import { Text } from '@components';
import styled from 'styled-components';

export const StyledText = styled(Text).attrs({ variant: 'h5' })`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 2rem;
`;

export function NotFound() {
  return <StyledText>No Pokémon. Try a different search term.</StyledText>;
}
