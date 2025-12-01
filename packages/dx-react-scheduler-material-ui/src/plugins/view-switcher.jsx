import { withComponents } from '@vtrphan/dx-react-core';
import { ViewSwitcher as ViewSwitcherBase } from '@vtrphan/dx-react-scheduler';
import { Switcher } from '../templates/view-switcher/switcher';

export const ViewSwitcher = withComponents({ Switcher })(ViewSwitcherBase);
