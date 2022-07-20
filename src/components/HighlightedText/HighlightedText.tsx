import { theme } from "@styles/theme";
import { PropsWithChildren } from "react";

export function HighlightedText({ children }: PropsWithChildren) {
  return (
    <mark
      style={{
        backgroundColor: theme.colors.secondaryLight.background,
      }}
    >
      {children}
    </mark>
  );
}
