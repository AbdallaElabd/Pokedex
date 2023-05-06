import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const chip = tv({
  base: 'flex w-fit items-center rounded-full px-3 py-1 text-xs font-light text-slate-50',
  variants: {
    variant: {
      primary: 'bg-blue-600',
      secondary: 'bg-yellow-600',
      neutral: 'bg-slate-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ChipProps = PropsWithChildren<
  VariantProps<typeof chip> & {
    className?: string;
  }
>;

export function Chip({ children, className, variant }: ChipProps) {
  return (
    <div className={classNames([className, chip({ variant })])}>{children}</div>
  );
}
