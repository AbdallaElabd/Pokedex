import { reposition } from "nanopop";
import { MutableRefObject, useEffect } from "react";

export const usePositionContent = (
  togglerRef: MutableRefObject<HTMLButtonElement | null>,
  contentRef: MutableRefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!togglerRef.current || !contentRef.current) return;
    reposition(togglerRef.current, contentRef.current, {
      margin: 2,
      position: "bottom-end",
    });
  }, [contentRef, togglerRef]);
};
