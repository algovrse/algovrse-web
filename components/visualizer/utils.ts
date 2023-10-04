import { VisualizerActions } from './constants';

export const generateSingleDimensionalArray = (ref: React.RefObject<HTMLDivElement>, barWidth = 20) => {
  const width = ref.current?.clientWidth || 0;
  const height = ref.current?.clientHeight || 0;
  const numBars = Math.floor(width / barWidth);
  const arr = new Array(numBars).fill(0).map(() => Math.floor(Math.random() * height));
  arr.pop();
  return arr;
};

export const getVisualizerActionColor = (d: any) => {
  if (d.data.action === VisualizerActions.Swap) {
    return '#A555EC';
  } else if (d.data.action === VisualizerActions.Compare) {
    return '#FEA82F';
  } else if (d.data.action === VisualizerActions.Done) {
    return '#43DA50';
  } else if (d.data.action === VisualizerActions.Select) {
    return '#1C6DD0';
  } else {
    return '#5B30B5';
  }
};
