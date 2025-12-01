import { withComponents } from '@vtrphan/dx-react-core';
import { Legend as LegendBase } from '@vtrphan/dx-react-chart';
import { Root } from '../templates/legend/root';
import { Label } from '../templates/legend/label';
import { Item } from '../templates/legend/item';

export const Legend = withComponents({
  Root, Item, Label,
})(LegendBase);
