import { withComponents } from '@vtrphan/dx-react-core';
import { PagingPanel as PagingPanelBase } from '@vtrphan/dx-react-grid';
import { Pager as Container } from '../templates/paging-panel/pager';

export const PagingPanel = withComponents({ Container })(PagingPanelBase);
