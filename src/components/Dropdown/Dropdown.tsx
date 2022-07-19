/* eslint-disable consistent-return */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useClickAway, useKey } from "react-use";

import { Button } from "../Button";
import { Option, PopoverContent, PopoverRoot } from "./styled";
import { usePositionContent } from "./usePositionContent";

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
  const togglerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = useCallback(() => setIsOpen(true), []);
  const closeDropdown = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  usePositionContent(togglerRef, contentRef);
  useKey("Escape", closeDropdown);
  useClickAway(containerRef, closeDropdown);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const onFocusOut = (event: FocusEvent) => {
      const isFocusedWithin = (event.currentTarget as HTMLDivElement).contains(
        event.relatedTarget as Node
      );
      if (!isFocusedWithin) {
        closeDropdown();
      }
    };

    containerElement.addEventListener<"focusout">("focusout", onFocusOut);
    return () =>
      containerElement.removeEventListener<"focusout">("focusout", onFocusOut);
  }, [closeDropdown]);

  const handleOptionClicked = useCallback(
    (option: T) => {
      onOptionClicked(option);
      closeDropdown();
    },
    [closeDropdown, onOptionClicked]
  );

  return (
    <PopoverRoot ref={containerRef}>
      <Button
        variant="primary"
        ref={togglerRef}
        onClick={isOpen ? closeDropdown : openDropdown}
      >
        {toggler}
      </Button>
      <PopoverContent ref={contentRef} isOpen={isOpen}>
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
