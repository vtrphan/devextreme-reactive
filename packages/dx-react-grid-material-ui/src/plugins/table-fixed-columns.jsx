import { withComponents } from '@vtrphan/dx-react-core';
import { TableFixedColumns as TableFixedColumnsBase } from '@vtrphan/dx-react-grid';
import { FixedCell as Cell } from '../templates/table-fixed-cell';
import { TableInvisibleRow as ListenerRow } from '../templates/table-invisible-row';
import { TableListenerCell as ListenerCell } from '../templates/table-listener-cell';

export const TableFixedColumns = withComponents({
  Cell, ListenerRow, ListenerCell,
})(TableFixedColumnsBase);
