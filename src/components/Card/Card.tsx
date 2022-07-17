import { theme } from "@styles/theme";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 1rem;
  box-shadow: ${theme.shadow.one};
`;

export function Card({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <Container className={className}>{children}</Container>;
}
