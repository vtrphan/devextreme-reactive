import { withComponents } from '@vtrphan/dx-react-core';
import { CurrentTimeIndicator as CurrentTimeIndicatorBase } from '@vtrphan/dx-react-scheduler';
import { Indicator } from '../templates/current-time-indicator/indicator';

export const CurrentTimeIndicator = withComponents({ Indicator })(CurrentTimeIndicatorBase);
