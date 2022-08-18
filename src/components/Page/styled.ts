import { onBreakPoint } from '@styles';
import { theme } from '@styles/theme';
import styled, { css } from 'styled-components';

import { Text } from '../Text';

export const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 14rem;
  background-color: ${theme.colors.primary.background};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 var(--gutter);
  --gutter: 0rem;
  ${onBreakPoint(
    'sm',
    css`
      --gutter: 2rem;
    `
  )};
  ${onBreakPoint(
    'md',
    css`
      --gutter: 3rem;
    `
  )};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: center;
  ${onBreakPoint(
    'sm',
    css`
      justify-content: flex-start;
      padding: 1rem;
    `
  )}
`;

export const Logo = styled.img`
  height: 100%;
  width: 6rem;
  ${onBreakPoint(
    'sm',
    css`
      width: 8rem;
    `
  )}
`;

export const Title = styled(Text).attrs({ variant: 'h2' })`
  color: ${theme.colors.primary.foreground};
  z-index: 1;
  margin-right: 2rem;
  ${onBreakPoint(
    'sm',
    css`
      margin-right: 0;
    `
  )}
`;

export const Content = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  background-color: ${theme.colors.surface.background};
  color: ${theme.colors.surface.foreground};
  margin-bottom: var(--gutter);
  padding: 2rem;
  border-radius: 0;
  box-shadow: ${theme.shadow[8]};
  ${onBreakPoint(
    'sm',
    css`
      border-radius: 0.5rem;
      flex: 1;
    `
  )};
`;
