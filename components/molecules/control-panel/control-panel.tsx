import React from 'react';
import { ControlPanelConfig } from './types';

import { Button } from '@algovrse/components/ui/button';
import { Slider } from '@algovrse/components/ui/slider';
import { Toggle } from '@algovrse/components/ui/toggle';

interface ControlPanelProps {
  config: ControlPanelConfig[];
}

export const ControlPanel = ({ config }: ControlPanelProps) => {
  if (!Array.isArray(config) || config.length <= 0) return null;

  return (
    <div>
      {config.map((controller, index) => {
        const { type, ...props } = controller;

        switch (type) {
          case 'button':
            return <Button onClick={props.onChange}>{props.label ? props.label : 'Click Me'}</Button>;
          case 'slider':
            return (
              <div className="flex flex-col gap-1">
                {props.label ?? ''}
                <Slider
                  defaultValue={[props?.defaultValue ?? 2]}
                  min={props?.minValue ?? 0}
                  max={props?.maxValue ?? 10}
                  step={props?.step ?? 1}
                />
              </div>
            );
          case 'toggle':
            return <Toggle>{props.label ?? ''}</Toggle>;
        }
      })}
    </div>
  );
};
