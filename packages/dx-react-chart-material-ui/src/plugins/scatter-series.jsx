import { withComponents } from '@vtrphan/dx-react-core';
import { ScatterSeries as ScatterSeriesBase } from '@vtrphan/dx-react-chart';
import { Point } from '../templates/series/point';

export const ScatterSeries = withComponents({ Point })(ScatterSeriesBase);
