import { Button } from '@components/button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface DropdownProps<T> {
  options: T[];
  selected: T;
  toggler: ReactNode;
  renderOption: (option: T, isSelected: boolean) => ReactNode;
  onOptionClicked: (option: T) => void;
}

export function Dropdown<T extends string | number>({
  toggler,
  options,
  selected,
  renderOption,
  onOptionClicked,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button size="sm">{toggler}</Button>
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
                className="z-10 flex origin-top flex-col overflow-hidden rounded-md bg-slate-50 shadow-md"
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
                    onSelect={() => onOptionClicked(option)}
                  >
                    {renderOption(option, selected === option)}
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