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
      // @ts-expect-error TS2367
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

export async function selectionSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  const len = propsRef.current?.arrayData.length ?? 0;

  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < len; j++) {
      if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
        await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
        continue;
      }

      await delayFunction(propsRef.current?.delay ?? 0);

      if (propsRef.current?.arrayData?.[j]?.value && propsRef.current?.arrayData?.[minIdx]?.value) {
        if (propsRef.current.arrayData[j].value < propsRef.current.arrayData[minIdx].value) {
          minIdx = j;
        }
      }
    }

    const currentArray = propsRef.current?.arrayData ?? [];

    if (minIdx !== i) {
      swap<SingleDimensionBarData>(i, minIdx, currentArray, setArray);
    }
  }
}

export async function mergeSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  const currentArray = propsRef.current?.arrayData ?? [];
  await mergeSortHelper(propsRef, setArray, currentArray, 0, currentArray.length - 1);
}

async function mergeSortHelper(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
  array: SingleDimensionBarData[],
  left: number,
  right: number,
) {
  if (left < right) {
    if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
      await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
      return;
    }

    await delayFunction(propsRef.current?.delay ?? 0);

    const middle = Math.floor((right + left) / 2);

    await mergeSortHelper(propsRef, setArray, array, left, middle);
    await mergeSortHelper(propsRef, setArray, array, middle + 1, right);

    await merge(propsRef, setArray, array, left, middle, right);
  }
}

async function merge(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
  array: SingleDimensionBarData[],
  left: number,
  middle: number,
  right: number,
) {
  // Merge the temp arrays back into original array
  const leftPart = array.slice(left, middle + 1);
  const rightPart = array.slice(middle + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
      await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
      continue;
    }

    await delayFunction(propsRef.current?.delay ?? 0);

    if (leftPart[i].value <= rightPart[j].value) {
      array[k] = leftPart[i];
      i++;
    } else {
      array[k] = rightPart[j];
      j++;
    }
    k++;
  }

  // Remaining elements
  while (i < leftPart.length) {
    array[k] = leftPart[i];
    i++;
    k++;
  }

  while (j < rightPart.length) {
    array[k] = rightPart[j];
    j++;
    k++;
  }

  setArray([...array]);
}

export async function heapSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  let array = propsRef.current?.arrayData ?? [];
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    array = await heapify(propsRef, array, n, i, setArray);
  }

  for (let i = n - 1; i >= 0; i--) {
    if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
      await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
      continue;
    }

    await delayFunction(propsRef.current?.delay ?? 0);

    // swap
    swap<SingleDimensionBarData>(0, i, array, setArray);

    // Heapify root element
    array = await heapify(propsRef, array, i, 0, setArray);
  }
}

async function heapify(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  array: SingleDimensionBarData[],
  n: number,
  i: number,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  // Initialize largest as root index, left as left child index and right as right child index
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root, update largest as left child's index
  if (left < n && array[left].value > array[largest].value) {
    largest = left;
  }

  // If right child is larger than the largest so far, update largest as right child's index
  if (right < n && array[right].value > array[largest].value) {
    largest = right;
  }

  // If the largest is not root index, swap them and continue heapify the affected subtree
  if (largest != i) {
    // If the sortingStatus is PAUSED, delay the function execution
    if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
      await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
      return array;
    }

    // Swap i and largest
    await delayFunction(propsRef.current?.delay ?? 0);
    swap<SingleDimensionBarData>(i, largest, array, setArray);

    // Recursively heapify the affected sub-tree
    array = await heapify(propsRef, array, n, largest, setArray);
  }

  return array;
}

export async function quickSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  const currentArray = propsRef.current?.arrayData ?? [];
  await quickSortHelper(propsRef, setArray, 0, currentArray.length - 1);
}

async function quickSortHelper(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
  low: number,
  high: number,
) {
  if (low < high) {
    const partIndex = await partition(propsRef, setArray, low, high);

    await quickSortHelper(propsRef, setArray, low, partIndex - 1);
    await quickSortHelper(propsRef, setArray, partIndex + 1, high);
  }
}

async function partition(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
  low: number,
  high: number,
) {
  const pivot = propsRef.current?.arrayData[high].value;
  let i = low - 1;
  const currentArray = propsRef.current?.arrayData ?? [];

  for (let j = low; j < high; j++) {
    if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
      await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
      continue;
    }

    await delayFunction(propsRef.current?.delay ?? 0);

    if (pivot && currentArray[j].value < pivot) {
      i++;
      swap<SingleDimensionBarData>(i, j, currentArray, setArray);
    }
  }
  swap<SingleDimensionBarData>(i + 1, high, currentArray, setArray);
  return i + 1;
}

export async function insertionSort(
  propsRef: React.RefObject<SortingFunctionProps | null>,
  setArray: Dispatch<SetStateAction<SingleDimensionBarData[]>>,
) {
  const len = propsRef.current?.arrayData.length ?? 0;
  const currentArray = propsRef.current?.arrayData ?? [];

  for (let i = 1; i < len; i++) {
    const key = currentArray[i].value;
    let j = i - 1;

    while (j >= 0 && currentArray[j].value > key) {
      if (propsRef.current?.sortingStatus === VisualizerStatus.PAUSED) {
        await new Promise((resolve) => setTimeout(() => resolve(null), propsRef.current?.delay));
        continue;
      }

      await delayFunction(propsRef.current?.delay ?? 0);

      currentArray[j + 1].value = currentArray[j].value;
      j = j - 1;
    }
    currentArray[j + 1].value = key;
  }

  setArray(currentArray);
}
