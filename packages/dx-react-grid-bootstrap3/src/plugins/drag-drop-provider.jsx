import { withComponents } from '@vtrphan/dx-react-core';
import { DragDropProvider as DragDropProviderBase } from '@vtrphan/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

export const DragDropProvider = withComponents({ Container, Column })(DragDropProviderBase);
