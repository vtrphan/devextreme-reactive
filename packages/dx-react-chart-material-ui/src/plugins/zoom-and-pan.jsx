import { ZoomAndPan as ZoomAndPanBase } from '@vtrphan/dx-react-chart';
import { withComponents } from '@vtrphan/dx-react-core';
import { DragBox } from '../templates/zoom-and-pan/drag-box';

export const ZoomAndPan = withComponents({ DragBox })(ZoomAndPanBase);
