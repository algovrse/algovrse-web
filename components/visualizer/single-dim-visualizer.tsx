import { Bar } from '../ui/bar';
import { VisualizerActions } from './constants';
import { getVisualizerActionColor } from './utils';

export interface SingleDimensionBarData {
  value: number;
  action: VisualizerActions;
}

export interface SingleDimensionVisualizerProps {
  data: SingleDimensionBarData[];
}

export const SingleDimensionVisualizer = ({ data }: SingleDimensionVisualizerProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto items-end">
      {data.map((item, index) => (
        <Bar key={`sorting-bar-${index}`} color={getVisualizerActionColor(item.action)} height={item.value} />
      ))}
    </div>
  );
};
