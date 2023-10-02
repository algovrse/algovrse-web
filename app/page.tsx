'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div layout>
        <NavigationHeader />
      </motion.div>
    </AnimatePresence>
  );
}
