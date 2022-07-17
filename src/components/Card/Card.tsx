import { theme } from '@styles/theme';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: ${theme.shadow.one};
`;

export function Card({ children }:PropsWithChildren) {
  return <Container>{children}</Container>;
}
