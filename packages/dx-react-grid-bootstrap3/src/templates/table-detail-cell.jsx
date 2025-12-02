import * as React from 'react';
import classNames from 'clsx';
import PropTypes from 'prop-types';

export const TableDetailCell = ({
  colSpan = 1,
  children = undefined,
  className = undefined,
  tableColumn = undefined, tableRow = undefined, row = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames('active', className)}
    {...restProps}
  >
    {children}
  </td>
);

TableDetailCell.propTypes = {
  colSpan: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};
