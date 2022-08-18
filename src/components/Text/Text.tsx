import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/**
 * h1 | 2em    | 32px
 * h2 | 1.5em  | 24px
 * h3 | 1.17em | 18.72px
 * h4 | 1em    | 16px
 * h5 | 0.83em | 13.28px
 * h6 | 0.67em | 10.72px
 */
const variants = {
  h1: styled.h1`
    font-size: 4.6rem;
    font-weight: lighter;
    margin: 0;
  `,
  h2: styled.h2`
    font-size: 3.6rem;
    font-weight: lighter;
    margin: 0;
  `,
  h3: styled.h3`
    font-size: 2.8rem;
    font-weight: lighter;
    margin: 0;
  `,
  h4: styled.h4`
    font-size: 2.2rem;
    font-weight: lighter;
    margin: 0;
  `,
  h5: styled.h5`
    font-size: 1.8rem;
    font-weight: lighter;
    margin: 0;
  `,
  h6: styled.h6`
    font-size: 1.6rem;
    font-weight: medium;
    font-weight: lighter;
    margin: 0;
  `,
  body1: styled.span`
    font-size: 1rem;
    font-weight: normal;
  `,
  body2: styled.span`
    font-size: 0.875rem;
    font-weight: normal;
  `,
  button: styled.span`
    font-size: 0.875rem;
    font-weight: normal;
  `,
  caption: styled.span`
    font-size: 0.75rem;
    font-weight: normal;
  `,
};

type TextProps = PropsWithChildren<{
  variant: keyof typeof variants;
  className?: string;
}>;

export function Text({ variant, className, children }: TextProps) {
  const Component = variants[variant];
  return <Component className={className}>{children}</Component>;
}
