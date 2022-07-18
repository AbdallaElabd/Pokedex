/* eslint-disable consistent-return */

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useClickAway, useKey } from "react-use";

import { Button } from "../Button";
import { Option, PopoverContent, PopoverRoot } from "./styled";

interface DropdownProps<T> {
  toggler: ReactNode;
  options: T[];
  selected: T;
  renderOption: (option: T, isSelected: boolean) => ReactNode;
  onOptionClicked: (option: T) => void;
}

export function Dropdown<T extends string>({
  toggler,
  options,
  selected,
  renderOption,
  onOptionClicked,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const togglerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useKey("Escape", () => setIsOpen(false));

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const onFocusOut = (event: FocusEvent) => {
      const isFocusedWithin = (event.currentTarget as HTMLDivElement).contains(
        event.relatedTarget as Node
      );
      if (!isFocusedWithin) {
        setIsOpen(false);
      }
    };

    containerElement.addEventListener<"focusout">("focusout", onFocusOut);
    return () =>
      containerElement.removeEventListener<"focusout">("focusout", onFocusOut);
  }, [setIsOpen]);

  useClickAway(containerRef, () => {
    setIsOpen(false);
  });

  const handleOptionClicked = useCallback(
    (option: T) => {
      onOptionClicked(option);
      setIsOpen(false);
    },
    [onOptionClicked]
  );

  return (
    <PopoverRoot ref={containerRef}>
      <Button variant="primary" ref={togglerRef} onClick={toggleIsOpen}>
        {toggler}
      </Button>
      <PopoverContent isOpen={isOpen} position="right">
        {options.map((option) => (
          <Option
            role="button"
            tabIndex={0}
            key={option}
            isSelected={selected === option}
            onClick={() => handleOptionClicked(option)}
          >
            {renderOption(option, selected === option)}
          </Option>
        ))}
      </PopoverContent>
    </PopoverRoot>
  );
}
