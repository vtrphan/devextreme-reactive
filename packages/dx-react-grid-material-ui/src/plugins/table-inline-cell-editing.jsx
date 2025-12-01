import { withComponents } from '@vtrphan/dx-react-core';
import { TableInlineCellEditing as TableInlineCellEditingBase } from '@vtrphan/dx-react-grid';
import { EditCell as Cell } from '../templates/table-edit-cell';

export const TableInlineCellEditing = withComponents({ Cell })(TableInlineCellEditingBase);
