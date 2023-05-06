import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface DropdownProps<T> {
  options: T[];
  selected: T;
  toggler: ReactNode;
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
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{toggler}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex flex-col overflow-hidden rounded-md bg-slate-50 shadow-md"
          sideOffset={5}
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
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
