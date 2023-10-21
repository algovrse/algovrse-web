export enum ControlType {
  Button = 'button',
  Checkbox = 'checkbox',
  Slider = 'slider',
  Toggle = 'toggle',
}

export interface ControlPanelConfig {
  type: ControlType;
  minValue?: number;
  maxValue?: number;
  label: string;
  step?: number;
  defaultValue?: number;
  onChange?: () => void;
  id: string;
}
