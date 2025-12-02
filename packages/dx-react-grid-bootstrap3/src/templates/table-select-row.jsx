import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSelectRow = ({
  highlighted = false, selectByRowClick = false, onToggle = () => {},
  children = undefined, className = undefined,
  row = undefined, tableRow = undefined, tableColumn = undefined, forwardedRef = undefined,
  ...restProps
}) => (
  <tr
    ref={forwardedRef}
    className={classNames(highlighted ? 'active' : '', className)}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  highlighted: PropTypes.bool,
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  className: PropTypes.string,
  row: PropTypes.any,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
