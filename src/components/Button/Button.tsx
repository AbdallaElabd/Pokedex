import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'flex items-center justify-center rounded-lg font-medium text-white outline-none focus:shadow-md',
  variants: {
    variant: {
      primary: 'bg-blue-600',
      secondary: 'bg-yellow-600',
      neutral: 'bg-slate-600',
    },
    size: {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    className?: string;
  };

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const { children, variant, size, className, ...rest } = props;
  return (
    <button
      type="button"
      ref={ref}
      className={classNames(buttonVariants({ variant, size }), className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </button>
  );
});
