import { Button } from '@components/button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

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
        <Button size="sm">
          <div className="flex items-center gap-2">
            {renderPlaceholder(selected)}
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
        </Button>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content sideOffset={3} align="end" asChild>
              <motion.div
                initial={{ opacity: 0, scaleY: 0.6 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.6 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 20,
                }}
                className="z-10 flex flex-col overflow-hidden rounded-md bg-slate-50 shadow-md data-[side=bottom]:origin-top data-[side=top]:origin-bottom"
              >
                {options.map((option) => (
                  <DropdownMenu.Item
                    className={classNames(
                      'cursor-pointer px-4 py-2 outline-none data-[highlighted]:bg-slate-300',
                      {
                        'bg-slate-300': selected === option,
                      }
                    )}
                    key={option}
                    onSelect={() => onChange(option)}
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
