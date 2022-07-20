import { PropsWithChildren } from "react";

import logo from "./header-logo.png";
import { Backdrop, Container, Content, Header, Logo, Title } from "./styled";

export function Page({ children }: PropsWithChildren) {
  return (
    <>
      <Backdrop />
      <Container>
        <Header>
          <Logo src={logo} alt="Pokédex" />
          <Title>Pokédex</Title>
        </Header>
        <Content>{children}</Content>
      </Container>
    </>
  );
}
