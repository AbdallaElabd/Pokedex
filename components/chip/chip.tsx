import classNames from "classnames";
import { PropsWithChildren } from "react";
import { tv,type VariantProps } from "tailwind-variants";

const chip = tv({
  base: "flex w-fit items-center rounded-full font-light text-slate-50",
  variants: {
    variant: {
      primary: "bg-blue-600",
      secondary: "bg-yellow-600",
      neutral: "bg-slate-500",
    },
    size: {
      xs: "text-xs px-2 py-1",
      sm: "text-sm px-3 py-1",
      md: "text-base px-3 py-1",
      lg: "text-lg px-4 py-1",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ChipProps = PropsWithChildren<
  VariantProps<typeof chip> & {
    className?: string;
  }
>;

export function Chip({ children, className, variant, size }: ChipProps) {
  return (
    <div className={classNames([className, chip({ variant, size })])}>
      {children}
    </div>
  );
}
