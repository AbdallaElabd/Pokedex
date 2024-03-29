import classNames from "classnames";
import { tv,type VariantProps } from "tailwind-variants";

const card = tv({
  base: "overflow-hidden rounded-md bg-slate-50 shadow-md transition-all hover:shadow-lg",
  variants: {
    elevation: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-xl",
    },
  },
  defaultVariants: {
    elevation: "sm",
  },
});

export function Card({
  children,
  className,
  elevation,
}: {
  children: React.ReactNode;
  className?: string;
  elevation?: VariantProps<typeof card>["elevation"];
}) {
  return (
    <div className={classNames([className, card({ elevation })])}>
      {children}
    </div>
  );
}
