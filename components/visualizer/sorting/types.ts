import { VisualizerStatus } from '../constants';
import { SingleDimensionBarData } from '../single-dim-visualizer';

export type SortingFunctionProps = {
  delay: number;
  sortingStatus: VisualizerStatus;
  arrayData: SingleDimensionBarData[];
};
