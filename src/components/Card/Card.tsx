// import classnames library
import classNames from 'classnames';
import { tv, VariantProps } from 'tailwind-variants';

const card = tv({
  base: 'flex rounded-md px-2 py-1',
  variants: {
    elevation: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-xl',
    },
  },
  defaultVariants: {
    elevation: 'sm',
  },
});

export function Card({
  children,
  className,
  elevation,
}: {
  children: React.ReactNode;
  className?: string;
  elevation: VariantProps<typeof card>['elevation'];
}) {
  return (
    <div className={classNames(className, card({ elevation }))}>{children}</div>
  );
}
