import { withComponents } from '@vtrphan/dx-react-core';
import { Title as TitleBase } from '@vtrphan/dx-react-chart';
import { Text } from '../templates/title/text';

export const Title = withComponents({ Text })(TitleBase);
