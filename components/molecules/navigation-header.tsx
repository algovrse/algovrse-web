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
import { motion } from 'framer-motion';

export const NavigationHeader = () => {
  const currentPage = NavigationPages.Home;

  return (
    <motion.div
      className="flex justify-center px-2 border-b border-border"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};
