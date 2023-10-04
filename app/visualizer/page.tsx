'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { SingleDimensionVisualizer } from '@algovrse/components/visualizer';
import { VisualizerActions } from '@algovrse/components/visualizer/constants';
import { AnimatePresence, motion } from 'framer-motion';

export default function Visualizer() {
  return (
    <AnimatePresence>
      <motion.div layout>
        <NavigationHeader />
        <SingleDimensionVisualizer
          data={[
            {
              value: 30,
              action: VisualizerActions.Swap,
            },
            {
              value: 50,
              action: VisualizerActions.Select,
            },
            {
              value: 10,
            },
            {
              value: 40,
            },
            {
              value: 80,
            },
            {
              value: 39,
            },
          ]}
        />
      </motion.div>
    </AnimatePresence>
  );
}
