'use client';

import * as React from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn, navigationPageMap } from '@algovrse/lib/utils';
import { Button } from '@algovrse/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@algovrse/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@algovrse/components/ui/popover';
import { NavigationPages } from '@algovrse/lib/types';

interface SelectNavigationDropdownProps {
  currentPage: NavigationPages;
}

const navigationOptions = [
  {
    value: NavigationPages.Home,
    label: 'home',
    hidden: true,
  },
  {
    value: NavigationPages.Visualizer,
    label: 'visualizer',
  },
  {
    value: NavigationPages.Challenges,
    label: 'challenges',
  },
];

export const SelectNavigationDropdown = ({ currentPage }: SelectNavigationDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentPage);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="navigation" role="combobox" aria-expanded={open} className="justify-between p-0">
          {value ? navigationOptions.find((option) => option.value === value)?.label : 'select'}
          {!open ? (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                  setValue(currentValue === value ? NavigationPages.Home : navigationPageMap(currentValue));
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
