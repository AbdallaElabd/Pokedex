"use client";

import { Button } from "@/components/button";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface DropdownProps<T> {
  options: T[];
  selected: T;
  onChange: (option: T) => void;
  renderPlaceholder: (option: T) => ReactNode;
  renderOption?: (option: T, isSelected: boolean) => ReactNode;
}

export function Dropdown<T extends string | number>({
  options,
  selected,
  onChange,
  renderPlaceholder,
  renderOption,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="primary"
          size="sm"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          {renderPlaceholder(selected)}
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </Button>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content sideOffset={3} align="end">
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    opacity: 1,
                    scaleY: 1,
                    originY: 0,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  },
                  closed: {
                    opacity: 0,
                    scaleY: 0.8,
                    originY: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                }}
                className="z-10 flex flex-col overflow-hidden rounded-md bg-slate-50 shadow-md data-[side=bottom]:origin-top data-[side=top]:origin-bottom"
              >
                {options.map((option) => (
                  <DropdownMenu.Item
                    className={classNames(
                      "cursor-pointer bg-blue-800 px-4 py-2 outline-none transition-all data-[highlighted]:bg-blue-600 data-[highlighted]:text-white",
                      {
                        "bg-blue-500 text-white": selected === option,
                      }
                    )}
                    key={option}
                    onSelect={() => {
                      onChange(option);
                    }}
                  >
                    {renderOption ? (
                      renderOption(option, selected === option)
                    ) : (
                      <span>{option}</span>
                    )}
                  </DropdownMenu.Item>
                ))}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
