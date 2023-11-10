import { Button } from '@algovrse/components/ui/button';
import { Slider } from '@algovrse/components/ui/slider';
import { Toggle } from '@algovrse/components/ui/toggle';
import React from 'react';

import { ControlPanelConfig } from './types';

interface ControlPanelProps {
  config: ControlPanelConfig[];
}

export const ControlPanel = ({ config }: ControlPanelProps) => {
  if (!Array.isArray(config) || config.length <= 0) return null;

  return (
    <div className="flex justify-center px-5 flex-wrap">
      {config.map((controller) => {
        const { type, ...props } = controller;

        switch (type) {
          case 'button':
            return (
              <>
                {props.onChange && (
                  <Button onClick={props.onChange} variant="default">
                    {props.label ? props.label : 'Click Me'}
                  </Button>
                )}
              </>
            );
          case 'slider':
            return (
              <>
                {props.label && props.defaultValue && (
                  <div className="flex gap-1 items-center">
                    {props.label ?? ''}
                    <Slider
                      className="min-w-[150px]"
                      defaultValue={[props?.defaultValue]}
                      max={props?.maxValue ?? 10}
                      min={props?.minValue ?? 0}
                      onValueChange={(value) => {
                        props?.onChange?.(value[0]);
                      }}
                      step={props?.step ?? 1}
                    />
                  </div>
                )}
              </>
            );
          case 'toggle':
            return <Toggle>{props.label ?? ''}</Toggle>;
        }
      })}
    </div>
  );
};
