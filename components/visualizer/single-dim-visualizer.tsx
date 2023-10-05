import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from 'next-themes';
import { getVisualizerActionColor } from './utils';

export interface SingleDimensionVisualizerProps {
  data: Record<string, string | number>[];
}

export const SingleDimensionVisualizer = ({ data }: SingleDimensionVisualizerProps) => {
  console.log('data', data);
  return (
    <ResponsiveBar
      animate={true}
      motionConfig="gentle"
      data={data}
      indexBy="value"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={getVisualizerActionColor}
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisLeft={null}
      axisRight={null}
      axisBottom={null}
      enableLabel={false}
      ariaLabel="algovrse: single dimension visualizer"
    />
  );
};
