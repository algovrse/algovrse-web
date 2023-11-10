import { Bar } from '../ui/bar';
import { VisualizerActions } from './constants';
import { getVisualizerActionColor } from './utils';

export interface SingleDimensionBarData {
  value: number;
  action: VisualizerActions;
}

export interface SingleDimensionVisualizerProps {
  data: SingleDimensionBarData[];
  gap?: number;
}

export const SingleDimensionVisualizer = ({ data, gap }: SingleDimensionVisualizerProps) => {
  return (
    <div className="flex overflow-x-auto items-end h-full w-full" style={{ gap: `${gap}px` }}>
      {data.map((item, index) => (
        <Bar key={`sorting-bar-${index}`} color={getVisualizerActionColor(item.action)} height={item.value} />
      ))}
    </div>
  );
};
