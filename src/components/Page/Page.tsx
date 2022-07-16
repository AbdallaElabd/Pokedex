import { onBreakPoint } from '@styles';
import { FunctionComponent, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

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
    content: '';
    z-index: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 33vh;
    background-color: #1f2937;
  }

  background-color: #f3f4f6;
  min-height: calc(100vh - 2 * var(--gutter));
  padding: var(--gutter);
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

const Title = styled.h1`
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 3rem;
  margin: 1rem 0;
  text-align: center;
  ${onBreakPoint(
    'sm',
    css`
      text-align: initial;
      margin: 0 0 2rem 0;
    `
  )}
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0;
  ${onBreakPoint(
    'sm',
    css`
      border-radius: 0.5rem;
    `
  )}
`;
