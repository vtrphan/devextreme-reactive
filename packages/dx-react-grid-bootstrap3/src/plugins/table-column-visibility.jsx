import { withComponents } from '@vtrphan/dx-react-core';
import { TableColumnVisibility as TableColumnVisibilityBase } from '@vtrphan/dx-react-grid';
import { EmptyMessage } from '../templates/empty-message';

export const TableColumnVisibility = withComponents({ EmptyMessage })(TableColumnVisibilityBase);
