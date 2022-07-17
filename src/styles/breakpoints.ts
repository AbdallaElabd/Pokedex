import { css, FlattenSimpleInterpolation } from 'styled-components';

export const onBreakPoint = (
  breakpoint: 'sm' | 'md' | 'lg' | 'xl',
  styles: FlattenSimpleInterpolation,
) => {
  switch (breakpoint) {
    case 'sm':
      return css`
        @media screen and (min-width: 576px) {
          ${styles}
        }
      `;
    case 'md':
      return css`
        @media screen and (min-width: 768px) {
          ${styles}
        }
      `;
    case 'lg':
      return css`
        @media screen and (min-width: 992px) {
          ${styles}
        }
      `;
    case 'xl':
    default:
      return css`
        @media screen and (min-width: 1200px) {
          ${styles}
        }
      `;
  }
};
