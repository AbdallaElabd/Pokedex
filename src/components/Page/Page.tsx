import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

export const Page: FunctionComponent<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  ::before {
    content: "";
    z-index: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 33vh;
    background-color: #1f2937;
  }

  --gutter: 4rem;

  min-height: calc(100vh - 2 * var(--gutter));
  padding: var(--gutter);
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem; ;
`;
