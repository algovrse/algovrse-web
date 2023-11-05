'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { ControlPanel, ControlType } from '@algovrse/components/molecules/control-panel';
import { SingleDimensionBarData, SingleDimensionVisualizer } from '@algovrse/components/visualizer';
import { generateSingleDimensionalArray } from '@algovrse/components/visualizer/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Visualizer() {
  const visualizerRef = useRef<HTMLDivElement | null>(null);

  const [sortingArrayData, setSortingArrayData] = useState<SingleDimensionBarData[]>([]);

  useEffect(() => {
    setSortingArrayData(generateSingleDimensionalArray(visualizerRef));
  }, [visualizerRef.current?.clientWidth, visualizerRef.current?.clientHeight]);

  return (
    <AnimatePresence>
      <motion.div layout>
        <NavigationHeader />
        <main className="p-6 bg-primary">
          <div className="flex flex-col border border-border">
            <div className="flex items-center border-b border-border px-5 h-11 text-sm bg-secondary">visualizer</div>
            <div className="flex flex-col p-5 gap-5">
              <div ref={visualizerRef} className="h-[60vh] min-h-[500px]">
                <SingleDimensionVisualizer data={sortingArrayData} />
              </div>
              <ControlPanel
                config={[
                  { id: 'start-buttons', label: 'Sort', type: ControlType.Button },
                  { id: 'count-slider', label: 'Count', type: ControlType.Slider },
                ]}
              />
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
