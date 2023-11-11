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
      if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
        // access updated state value from ref
        await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
        continue;
      }

      currentArray[j].action = VisualizerActions.Compare;
      currentArray[j + 1].action = VisualizerActions.Compare;

      await delayFunction(propsRef.current?.delay ?? 0);

      if (currentArray[j].value > currentArray[j + 1].value) {
        currentArray[j].action = VisualizerActions.Swap;
        currentArray[j + 1].action = VisualizerActions.Swap;

        currentArray = await swap<SingleDimensionBarData>(
          j,
          j + 1,
          currentArray,
          setArray,
          propsRef.current?.delay ?? 0,
        );
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
