import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled, TableRow } from '@mui/material';

const PREFIX = 'Row';
export const classes = {
  row: `${PREFIX}-row`,
};
const StyledTableRow = styled(TableRow)(() => ({
  [`&.${classes.row}`]: {
    height: 'auto',
  },
}));

export const Row = ({
  children = undefined, className = undefined, row = undefined, tableRow = undefined, tableColumn = undefined, forwardedRef = undefined, ...restProps
}) => (
  <StyledTableRow
    className={classNames(classes.row, className)}
    {...restProps}
  >
    {children}
  </StyledTableRow>
);

Row.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
