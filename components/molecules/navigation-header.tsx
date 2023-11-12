'use client';

import { Button } from '@algovrse/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@algovrse/components/ui/navigation-menu';
import { NavigationPages } from '@algovrse/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import Icon from '../icon';
import { Separator } from '../ui/separator';
import { SelectThemeDropdown } from './dropdowns';
import { SelectNavigationDropdown } from './dropdowns/select-navigation-dropdown';

export const NavigationHeader = () => {
  const currentPage = NavigationPages.Dashboard;

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-2 border-b border-border "
        exit={{ opacity: 0, y: -100 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <NavigationMenu className="w-full max-w-full h-navigation-header">
          <motion.div className="w-full">
            <NavigationMenuList className="gap-10 grow shrink-0 justify-between">
              <NavigationMenuItem className="w-full justify-start">
                {/* Dashboard Button */}
                <Link href="/dashboard" legacyBehavior passHref>
                  <Button className="h-navigation-header" variant="navigation">
                    <Icon name={'layout-dashboard'} />
                  </Button>
                </Link>
                {/* Challenges Button */}
                <Link href="/challenges" legacyBehavior passHref>
                  <Button className="h-navigation-header" variant="navigation">
                    <Icon name={'swords'} />
                  </Button>
                </Link>
              </NavigationMenuItem>

              <Separator className="h-navigation-header" orientation="vertical" />

              <NavigationMenuItem>
                <NavigationMenuList>
                  <motion.div className="flex gap-2 justify-center items-center w-full min-w-[300px]">
                    algovrse / <SelectNavigationDropdown currentPage={currentPage} />
                  </motion.div>
                </NavigationMenuList>
              </NavigationMenuItem>

              <Separator className="h-navigation-header" orientation="vertical" />

              <NavigationMenuItem className="w-full flex items-center justify-end">
                <SelectThemeDropdown />
                <Link href="/settings" legacyBehavior passHref>
                  <Button className="h-navigation-header" variant="navigation">
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
