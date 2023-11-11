import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { NavigationPages } from './types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const navigationPageMap = (value: string): NavigationPages => {
  switch (value) {
    case 'home':
      return NavigationPages.Dashboard;
    case 'visualizer':
      return NavigationPages.Visualizer;
    case 'challenges':
      return NavigationPages.Challenges;
    default:
      return NavigationPages.Dashboard;
  }
};
