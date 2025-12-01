import * as React from 'react';
import { DataTypeProvider } from '@vtrphan/dx-react-grid';

const Formatter = ({ value }) => (value ? 'Yes' : 'No');

export const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    {...props}
  />
);
