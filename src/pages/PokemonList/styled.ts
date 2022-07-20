import { onBreakPoint } from "@styles";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  gap: 1rem;
`;

export const TopRow = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Separator = styled.div`
  background-color: ${theme.colors.background};
  height: 1px;
  width: 100%;
  margin: 0.5rem 0;
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 2rem;

  --columns: 1;
  ${onBreakPoint(
    "sm",
    css`
      --columns: 2;
    `
  )};
  ${onBreakPoint(
    "md",
    css`
      --columns: 3;
    `
  )};
  ${onBreakPoint(
    "lg",
    css`
      --columns: 4;
    `
  )};
  ${onBreakPoint(
    "xl",
    css`
      --columns: 5;
    `
  )};
`;
