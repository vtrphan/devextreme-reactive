import * as React from 'react';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@vtrphan/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 150;

export const VirtualTableLayout = props => (
  <TableLayout
    layoutComponent={VirtualTableLayoutCore}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    {...props}
  />
);
