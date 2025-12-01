import { Axis } from '@vtrphan/dx-react-chart';
import { withClassName } from '../utils';

export const Tick = withClassName(
  'dx-c-bs4-stroke-current-color', 'dx-c-bs4-crisp-edges', 'dx-c-bs4-axis-opacity',
)(Axis.Tick);
