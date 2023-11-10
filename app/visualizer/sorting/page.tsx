'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { ControlPanel, ControlType } from '@algovrse/components/molecules/control-panel';
import { SingleDimensionBarData, SingleDimensionVisualizer } from '@algovrse/components/visualizer';
import { generateSingleDimensionalArray } from '@algovrse/components/visualizer/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Visualizer() {
  const visualizerRef = useRef<HTMLDivElement | null>(null);

  const [sortingArrayData, setSortingArrayData] = useState<SingleDimensionBarData[]>([]);
  const [barWidth, setBarWidth] = useState(25);
  const [barGap, setBarGap] = useState(5);

  useEffect(() => {
    setSortingArrayData(generateSingleDimensionalArray(visualizerRef, barWidth, barGap));
  }, [visualizerRef.current?.clientWidth, visualizerRef.current?.clientHeight, barWidth, barGap]);

  const navigationHeader = useMemo(() => <NavigationHeader />, []);

  return (
    <AnimatePresence>
      <motion.div layout>
        {navigationHeader}
        <main className="p-6 bg-primary">
          <div className="flex flex-col border border-border">
            <div className="flex items-center border-b border-border px-5 h-11 text-sm bg-secondary">visualizer</div>
            <div className="flex justify-end flex-col p-5 gap-5 h-full">
              <div ref={visualizerRef} className="flex w-full items-end h-[60vh] min-h-[500px]">
                <SingleDimensionVisualizer data={sortingArrayData} gap={barGap - 1} />
              </div>
              <ControlPanel
                config={[
                  { id: 'start-buttons', label: 'Sort', type: ControlType.Button },
                  {
                    defaultValue: barWidth,
                    id: 'count-slider',
                    label: 'Count',
                    maxValue: 100,
                    minValue: 10,
                    onChange: (value) => {
                      if (typeof value === 'number') {
                        setBarWidth(value);
                      }
                    },
                    step: 5,
                    type: ControlType.Slider,
                  },
                  {
                    defaultValue: barGap,
                    id: 'gap-slider',
                    label: 'Gap',
                    maxValue: 11,
                    minValue: 1,
                    onChange: (value) => {
                      if (typeof value === 'number') {
                        setBarGap(value);
                      }
                    },
                    step: 1,
                    type: ControlType.Slider,
                  },
                ]}
              />
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
