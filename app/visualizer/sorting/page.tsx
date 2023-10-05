'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { SingleDimensionVisualizer } from '@algovrse/components/visualizer';
import { generateSingleDimensionalArray } from '@algovrse/components/visualizer/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Visualizer() {
  const visualizerRef = useRef<HTMLDivElement | null>(null);

  const [sortingArrayData, setSortingArrayData] = useState<Record<string, string | number>[]>([]);

  useEffect(() => {
    setSortingArrayData(generateSingleDimensionalArray(visualizerRef));
  }, [visualizerRef.current?.clientWidth, visualizerRef.current?.clientHeight]);

  return (
    <AnimatePresence>
      <motion.div layout>
        <NavigationHeader />
        <main className="p-6 bg-primary">
          <div className="flex flex-col gap-10 border border-border">
            <div className="flex items-center border-b border-border px-5 h-11 text-sm bg-secondary">visualizer</div>
            <div className="flex items-center h-[60vh]" ref={visualizerRef}>
              <SingleDimensionVisualizer data={sortingArrayData} />
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
