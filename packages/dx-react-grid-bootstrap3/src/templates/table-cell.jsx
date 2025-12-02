import * as React from 'react';
import PropTypes from 'prop-types';

export const TableCell = ({
  style = null, column = undefined, value = undefined, children = undefined,
  tableRow = undefined, tableColumn = undefined, row = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
    style={{
      whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: (tableColumn && tableColumn.align) || 'left',
      ...style,
    }}
    {...restProps}
  >
    {children || value}
  </td>
);

TableCell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.func,
};
