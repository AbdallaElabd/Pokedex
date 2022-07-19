import { onBreakPoint } from "@styles";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

import { Text } from "../Text";

export const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 14rem;
  background-color: ${theme.colors.primary};
`;

export const Container = styled.div`
  position: relative;
  padding: 0 var(--gutter);
  --gutter: 0rem;
  ${onBreakPoint(
    "sm",
    css`
      --gutter: 2rem;
    `
  )};
  ${onBreakPoint(
    "md",
    css`
      --gutter: 3rem;
    `
  )};
`;

export const Title = styled(Text).attrs({ variant: "h2" })`
  color: ${theme.colors.onPrimary};
  z-index: 1;
  padding: 1rem 0;
  text-align: center;
  padding: 0.5em 0;
  ${onBreakPoint(
    "sm",
    css`
      padding: 0.8em 0;
      text-align: initial;
    `
  )}
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${theme.colors.surface};
  color: ${theme.colors.onSuface};
  margin-bottom: var(--gutter);
  padding: 2rem;
  border-radius: 0;
  box-shadow: ${theme.shadow[8]};
  ${onBreakPoint(
    "sm",
    css`
      border-radius: 0.5rem;
    `
  )};
`;
