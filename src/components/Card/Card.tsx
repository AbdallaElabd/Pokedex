import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

export const Card: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
