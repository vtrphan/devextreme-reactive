import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow as RowBase } from '../table-row';

export const Row = ({ style = null, ...props }) => (
  <RowBase
    {...props}
    style={{
      cursor: 'pointer',
      ...style,
    }}
  />
);

Row.propTypes = {
  style: PropTypes.object,
};
