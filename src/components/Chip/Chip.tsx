import { PropsWithChildren } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const chip = tv({
  base: 'flex w-fit items-center rounded-full px-2 py-1 text-xs font-light text-slate-50',
  variants: {
    variant: {
      primary: 'bg-blue-600',
      secondary: 'bg-yellow-600',
      neutral: 'bg-slate-500',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ChipProps = PropsWithChildren<VariantProps<typeof chip>>;

export function Chip({ children, ...variantProps }: ChipProps) {
  return <div className={chip(variantProps)}>{children}</div>;
}
