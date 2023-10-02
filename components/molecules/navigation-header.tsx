'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@algovrse/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from '@algovrse/components/ui/button';
import { Separator } from '../ui/separator';
import { SelectNavigationDropdown } from './dropdowns/select-navigation-dropdown';
import { NavigationPages } from '@algovrse/lib/types';

export const NavigationHeader = () => {
  const currentPage = NavigationPages.Home;

  return (
    <div className="flex justify-center px-2 border-b border-border">
      <NavigationMenu className="h-navigation-header">
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <Button variant="navigation" className="h-navigation-header">
                home
              </Button>
            </Link>
          </NavigationMenuItem>

          <Separator orientation="vertical" className="h-navigation-header" />

          <NavigationMenuItem>
            <NavigationMenuList>
              algovrse / <SelectNavigationDropdown currentPage={currentPage} />
            </NavigationMenuList>
          </NavigationMenuItem>

          <Separator orientation="vertical" className="h-navigation-header" />

          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <Button variant="navigation" className="h-navigation-header">
                about
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
