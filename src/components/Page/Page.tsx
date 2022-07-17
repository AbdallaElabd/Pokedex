import { PropsWithChildren } from 'react';

import {
  Backdrop, Container, Content, Title,
} from './styled';

export function Page({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <Backdrop />
      <Container>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </Container>
    </>
  );
}
