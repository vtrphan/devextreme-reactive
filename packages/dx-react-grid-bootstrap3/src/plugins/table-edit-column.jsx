import { withComponents } from '@vtrphan/dx-react-core';
import { TableEditColumn as TableEditColumnBase } from '@vtrphan/dx-react-grid';
import {
  EditCommandHeadingCell as HeaderCell,
  EditCommandCell as Cell,
  CommandButton as Command,
} from '../templates/table-edit-command-cell';

export const TableEditColumn = withComponents({ Cell, HeaderCell, Command })(TableEditColumnBase);

TableEditColumn.COLUMN_TYPE = TableEditColumnBase.COLUMN_TYPE;
