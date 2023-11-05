import React from 'react';

interface BarProps {
  color: string;
  height: number;
}

export const Bar = ({ color, height }: BarProps) => {
  return (
    <div
      className="transition-[height] duration-100 w-full"
      style={{ backgroundColor: color, height: `${height}px` }}
    />
  );
};
