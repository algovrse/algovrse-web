'use client';

import { NavigationHeader } from '@algovrse/components/molecules';
import { ControlPanel, ControlType } from '@algovrse/components/molecules/control-panel';
import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
  SingleDimensionBarData,
  SingleDimensionVisualizer,
  SORTING_CONSTANTS,
  SortingFunctionProps,
  VisualizerStatus,
} from '@algovrse/components/visualizer';
import { generateSingleDimensionalArray } from '@algovrse/components/visualizer/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function SortingVisualizer({ params }: { readonly params: { slug: string } }) {
  const algoId = params.slug;

  const [delay, setDelay] = useState(SORTING_CONSTANTS.DEFAULT_DELAY);
  const [barGap, setBarGap] = useState(SORTING_CONSTANTS.DEFAULT_BAR_GAP);
  const [barWidth, setBarWidth] = useState(SORTING_CONSTANTS.DEFAULT_BAR_WIDTH);
  const [arrayData, setArrayData] = useState<SingleDimensionBarData[]>([]);
  const [sortingStatus, setSortingStatus] = useState<VisualizerStatus>(VisualizerStatus.IDLE);

  const visualizerRef = useRef<HTMLDivElement | null>(null);
  const sortingFunctionPropsRef = useRef<SortingFunctionProps | null>({ arrayData, delay, sortingStatus });

  useEffect(() => {
    setArrayData(generateSingleDimensionalArray(visualizerRef, barWidth, barGap));
  }, [visualizerRef.current?.clientWidth, visualizerRef.current?.clientHeight, barWidth, barGap]);

  useEffect(() => {
    sortingFunctionPropsRef.current = {
      arrayData,
      delay,
      sortingStatus,
    };
  }, [delay, arrayData, sortingStatus]);

  const sortingFunction = useCallback(async () => {
    switch (algoId) {
      case 'bubble-sort':
        await bubbleSort(sortingFunctionPropsRef, setArrayData);
        break;
      case 'merge-sort':
        await mergeSort(sortingFunctionPropsRef, setArrayData);
        break;
      case 'selection-sort':
        await selectionSort(sortingFunctionPropsRef, setArrayData);
        break;
      case 'heap-sort':
        await heapSort(sortingFunctionPropsRef, setArrayData);
        break;
      case 'quick-sort':
        await quickSort(sortingFunctionPropsRef, setArrayData);
        break;
      case 'insertion-sort':
        await insertionSort(sortingFunctionPropsRef, setArrayData);
        break;
    }
    if (sortingFunctionPropsRef.current) {
      sortingFunctionPropsRef.current.sortingStatus = VisualizerStatus.FINISHED;
    }
  }, [algoId]);

  const executeSort = () => {
    if (sortingStatus === VisualizerStatus.IDLE) {
      setSortingStatus(VisualizerStatus.RUNNING);
      sortingFunction();
    } else if (sortingStatus === VisualizerStatus.RUNNING) {
      setSortingStatus(VisualizerStatus.PAUSED);
    } else if (sortingStatus === VisualizerStatus.PAUSED) {
      setSortingStatus(VisualizerStatus.RUNNING);
    }
  };

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
                <SingleDimensionVisualizer data={arrayData} gap={barGap - 1} />
              </div>
              <ControlPanel
                config={[
                  { id: 'start-buttons', label: 'Sort', onChange: executeSort, type: ControlType.Button },
                  {
                    defaultValue: barWidth ?? 1,
                    id: 'count-slider',
                    label: 'Count',
                    maxValue: SORTING_CONSTANTS.MAX_BAR_WIDTH,
                    minValue: SORTING_CONSTANTS.MIN_BAR_WIDTH,
                    onChange: (value) => {
                      if (typeof value === 'number') {
                        setBarWidth(Math.abs(SORTING_CONSTANTS.MAX_BAR_WIDTH - value) + 1);
                      }
                    },
                    type: ControlType.Slider,
                  },
                  {
                    defaultValue: barGap,
                    id: 'gap-slider',
                    label: 'Gap',
                    maxValue: SORTING_CONSTANTS.MAX_BAR_GAP,
                    minValue: SORTING_CONSTANTS.MIN_BAR_GAP + 1,
                    onChange: (value) => {
                      if (typeof value === 'number') {
                        setBarGap(value);
                      }
                    },
                    step: 1,
                    type: ControlType.Slider,
                  },
                  {
                    defaultValue: barGap,
                    id: 'delay-slider',
                    label: 'Speed',
                    maxValue: SORTING_CONSTANTS.MAX_SPEED,
                    minValue: SORTING_CONSTANTS.MIN_SPEED,
                    onChange: (value) => {
                      if (typeof value === 'number') {
                        setDelay(value + 1);
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
