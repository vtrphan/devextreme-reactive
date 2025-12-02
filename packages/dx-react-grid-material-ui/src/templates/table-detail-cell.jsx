import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { TableCell, styled } from '@mui/material';

const PREFIX = 'TableDetailCell';
export const classes = {
  active: `${PREFIX}-active`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.active}`]: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const TableDetailCell = ({
  colSpan = 1, style = null, children = undefined,
  className = undefined, forwardedRef = undefined,
  tableColumn = undefined, tableRow = undefined, row = undefined,
  ...restProps
}) => (
  <StyledTableCell
    style={style}
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames(classes.active, className)}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};
