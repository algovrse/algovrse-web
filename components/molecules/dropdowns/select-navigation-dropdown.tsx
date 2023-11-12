'use client';

import { Button } from '@algovrse/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@algovrse/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@algovrse/components/ui/popover';
import { NavigationPages } from '@algovrse/lib/types';
import { cn, navigationPageMap } from '@algovrse/lib/utils';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

interface SelectNavigationDropdownProps {
  currentPage: NavigationPages;
}

const navigationOptions = [
  {
    label: 'dashboard',
    value: NavigationPages.Dashboard,
  },
  {
    label: 'visualizer',
    value: NavigationPages.Visualizer,
  },
  {
    label: 'challenges',
    value: NavigationPages.Challenges,
  },
];

export const SelectNavigationDropdown = ({ currentPage }: SelectNavigationDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentPage);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button aria-expanded={open} className="justify-between items-center p-0" role="combobox" variant="navigation">
          {value ? navigationOptions.find((option) => option.value === value)?.label : 'select'}
          {!open ? (
            <ChevronDown className="ml-2" size={20} strokeWidth={1.5} />
          ) : (
            <ChevronUp className="ml-2" size={20} strokeWidth={1.5} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="select" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {navigationOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? NavigationPages.Dashboard : navigationPageMap(currentValue));
                  setOpen(false);
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
