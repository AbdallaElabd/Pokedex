import { PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @see https://material.io/design/typography/the-type-system.html
 */
const variants = {
  h1: styled.h1`
    font-size: 6rem;
    letter-spacing: calc(-1.5 / 1rem);
    font-weight: light;
    margin: 0;
  `,
  h2: styled.h2`
    font-size: 5rem;
    letter-spacing: calc(-2.5 / 1rem);
    font-weight: light;
    margin: 0;
  `,
  h3: styled.h3`
    font-size: 3rem;
    letter-spacing: 0;
    font-weight: regular;
    margin: 0;
  `,
  h4: styled.h4`
    font-size: 2.125rem;
    letter-spacing: calc(0.25 / 1rem);
    font-weight: regular;
    margin: 0;
  `,
  h5: styled.h5`
    font-size: 1.5rem;
    letter-spacing: 0;
    font-weight: regular;
    margin: 0;
  `,
  h6: styled.h6`
    font-size: 1.25rem;
    letter-spacing: calc(0.15 / 1rem);
    font-weight: medium;
    margin: 0;
  `,
  body1: styled.span`
    font-size: 1rem;
    letter-spacing: calc(0.5 / 1rem);
    font-weight: normal;
  `,
  body2: styled.span`
    font-size: 0.875rem;
    letter-spacing: calc(0.25 / 1rem);
    font-weight: normal;
  `,
  button: styled.span`
    font-size: 0.875rem;
    letter-spacing: calc(1.25 / 1rem);
    font-weight: medium;
  `,
  caption: styled.span`
    font-size: 0.75rem;
    letter-spacing: calc(0.4 / 1rem);
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
