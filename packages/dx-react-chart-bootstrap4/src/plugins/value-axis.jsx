import { withComponents } from '@vtrphan/dx-react-core';
import { ValueAxis as ValueAxisBase } from '@vtrphan/dx-react-chart';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';
import { Grid } from '../templates/axis/grid';

export const ValueAxis = withComponents({
  Root, Tick, Label, Line, Grid,
})(ValueAxisBase);
