import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from 'next-themes';
import { getVisualizerActionColor } from './utils';

export interface SingleDimensionVisualizerProps {
  data: Record<string, string | number>[];
}

export const SingleDimensionVisualizer = ({ data }: SingleDimensionVisualizerProps) => {
  return (
    <div className="h-[65vh]">
      <ResponsiveBar
        animate={true}
        margin={{ top: 80, right: 0, bottom: 20, left: 0 }}
        motionConfig="gentle"
        data={data}
        indexBy="value"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={getVisualizerActionColor}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        enableGridX={false}
        enableGridY={false}
        gridYValues={5}
        axisTop={{
          tickSize: 0,
          tickPadding: 60,
        }}
        axisRight={null}
        axisBottom={null}
        enableLabel={false}
        role="application"
        ariaLabel="algovrse: single dimension visualizer"
        barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
      />
    </div>
  );
};
