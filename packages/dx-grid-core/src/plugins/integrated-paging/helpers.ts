import { PureComputed } from '@vtrphan/dx-core';

export const clamp: PureComputed<[number, number]> = (value, max) => (
  Math.max(Math.min(value, max), 0)
);
