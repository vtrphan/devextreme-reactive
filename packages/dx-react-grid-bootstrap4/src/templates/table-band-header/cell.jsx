import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Cell = ({
  column = undefined,
  children = undefined,
  beforeBorder = false,
  tableRow = undefined,
  tableColumn = undefined,
  row = undefined,
  forwardedRef = undefined,
  className = undefined,
  ...restProps
}) => (
  <th
    className={classNames({
      'dx-g-bs4-banded-cell dx-g-bs4-table-cell text-nowrap border-right': true,
      'border-left': beforeBorder,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </th>
);

Cell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
  forwardedRef: PropTypes.func,
};
