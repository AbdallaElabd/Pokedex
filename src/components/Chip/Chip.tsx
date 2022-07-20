import { theme } from "@styles/theme";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Text } from "../Text";

const Container = styled(Text).attrs({ variant: "caption" })`
  display: flex;
  align-items: center;
  background: ${theme.colors.primaryDark};
  color: ${theme.colors.onPrimary};
  border-radius: 0.8rem;
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
`;

export function Chip({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
