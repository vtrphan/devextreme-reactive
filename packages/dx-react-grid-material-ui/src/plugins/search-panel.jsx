import { withComponents } from '@vtrphan/dx-react-core';
import { SearchPanel as SearchPanelBase } from '@vtrphan/dx-react-grid';
import { SearchPanelInput as Input } from '../templates/search-panel-input';

export const SearchPanel = withComponents({ Input })(SearchPanelBase);
