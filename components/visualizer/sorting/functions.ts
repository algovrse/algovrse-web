import { Dispatch, SetStateAction } from 'react';

import { VisualizerActions, VisualizerStatus } from '../constants';
import { SingleDimensionBarData } from '../single-dim-visualizer';
import { delayFunction, swap } from '../utils';
import { SortingFunctionProps } from './types';

export async function bubbleSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  const len = propsRef.current?.arrayData.length ?? 0;

  let i = 0;
  let j = 0;

  while (i < len) {
    let currentArray = propsRef.current?.arrayData ?? [];
    while (j < len - i - 1) {
      currentArray[j].action = VisualizerActions.Compare;
      currentArray[j + 1].action = VisualizerActions.Compare;

      // Checking for pause
      if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
        await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
        continue;
      }

      await delayFunction(propsRef.current?.delay ?? 0);

      if (currentArray[j].value > currentArray[j + 1].value) {
        currentArray[j].action = VisualizerActions.Swap;
        currentArray[j + 1].action = VisualizerActions.Swap;

        currentArray = swap<SingleDimensionBarData>(j, j + 1, currentArray, setArray);
      }

      await delayFunction(propsRef.current?.delay ?? 0);

      // Checking for pause
      if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
        await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
        continue;
      }

      currentArray[j].action = VisualizerActions.None;
      currentArray[j + 1].action = VisualizerActions.None;
      setArray([...currentArray]);

      j++;
    }

    j = 0;
    i++;

    currentArray[len - i].action = VisualizerActions.Done;
    setArray([...currentArray]);
  }
}
