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
  background-color: ${theme.colors.secondary};
`;

export const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 2 * var(--gutter));
  padding: var(--gutter);
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
  z-index: 1;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
  ${onBreakPoint(
    "sm",
    css`
      text-align: initial;
    `
  )}
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 0;
  box-shadow: ${theme.shadow.five};
  ${onBreakPoint(
    "sm",
    css`
      border-radius: 0.5rem;
    `
  )};
`;
