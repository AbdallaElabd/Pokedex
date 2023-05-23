import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef,PropsWithChildren } from "react";
import { tv,type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "flex items-center justify-center rounded-lg font-medium text-white shadow-sm outline-none transition-all hover:shadow-md focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 ring-blue-400",
      secondary:
        "bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 focus:ring-2 ring-yellow-400",
      neutral:
        "bg-slate-600 hover:bg-slate-700 focus:bg-slate-700 focus:ring-2 ring-slate-400",
    },
    size: {
      xs: "text-xs px-2 py-1",
      sm: "text-sm px-3 py-2",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
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
>(function Button(props, ref) {
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
