'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@algovrse/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from '@algovrse/components/ui/button';
import { Separator } from '../ui/separator';
import { SelectNavigationDropdown } from './dropdowns/select-navigation-dropdown';
import { NavigationPages } from '@algovrse/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Swords } from 'lucide-react';
import Icon from '../icon';
import { SelectThemeDropdown } from './dropdowns';

export const NavigationHeader = () => {
  const currentPage = NavigationPages.Home;

  return (
    <AnimatePresence>
      <motion.div
        className="w-full px-2 border-b border-border "
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavigationMenu className="w-full max-w-full h-navigation-header">
          <motion.div className="w-full">
            <NavigationMenuList className="gap-10 grow shrink-0 justify-between">
              <NavigationMenuItem className="w-full justify-start">
                {/* Dashboard Button */}
                <Link href="/dashboard" legacyBehavior passHref>
                  <Button variant="navigation" className="h-navigation-header">
                    <Icon name={'layout-dashboard'} />
                  </Button>
                </Link>
                {/* Challenges Button */}
                <Link href="/challenges" legacyBehavior passHref>
                  <Button variant="navigation" className="h-navigation-header">
                    <Icon name={'swords'} />
                  </Button>
                </Link>
              </NavigationMenuItem>

              <Separator orientation="vertical" className="h-navigation-header" />

              <NavigationMenuItem>
                <NavigationMenuList>
                  <motion.div className="flex gap-2 justify-center items-center w-full min-w-[300px]">
                    algovrse / <SelectNavigationDropdown currentPage={currentPage} />
                  </motion.div>
                </NavigationMenuList>
              </NavigationMenuItem>

              <Separator orientation="vertical" className="h-navigation-header" />

              <NavigationMenuItem className="w-full flex items-center justify-end">
                <SelectThemeDropdown />
                <Link href="/settings" legacyBehavior passHref>
                  <Button variant="navigation" className="h-navigation-header">
                    <Icon name={'settings'} />
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </motion.div>
        </NavigationMenu>
      </motion.div>
    </AnimatePresence>
  );
};
