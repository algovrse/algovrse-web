import { VisualizerActions } from './constants';
import { SingleDimensionBarData } from './single-dim-visualizer';

export const generateSingleDimensionalArray = (
  ref: React.RefObject<HTMLDivElement>,
  barWidth = 25,
): SingleDimensionBarData[] => {
  const width = ref.current?.clientWidth ?? 0;
  const height = ref.current?.clientHeight ?? 0;

  const numBars = Math.floor(width / barWidth);
  const arr = new Array(numBars).fill(0).map(() => Math.floor(Math.random() * height + 5));
  arr.pop();
  return arr.map((value) => ({ action: VisualizerActions.None, value: value }));
};

export const getVisualizerActionColor = (action: VisualizerActions) => {
  if (action === VisualizerActions.Swap) {
    return '#A555EC';
  } else if (action === VisualizerActions.Compare) {
    return '#FEA82F';
  } else if (action === VisualizerActions.Done) {
    return '#43DA50';
  } else if (action === VisualizerActions.Select) {
    return '#1C6DD0';
  } else {
    return '#5B30B5';
  }
};
