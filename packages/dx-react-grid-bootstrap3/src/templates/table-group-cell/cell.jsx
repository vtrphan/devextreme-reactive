import * as React from 'react';
import PropTypes from 'prop-types';

export const Cell = ({
  row = {}, column = {},
  tableRow = undefined, tableColumn = undefined,
  onToggle = () => {}, children = undefined, style = null,
  forwardedRef = undefined, colSpan = 1,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      style={{
        cursor: 'pointer',
        // TOOD: extract to constant
        whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
        ...style,
      }}
      ref={forwardedRef}
      onClick={handleClick}
      colSpan={colSpan}
      {...restProps}
    >
      {children}
    </td>
  );
};

Cell.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  colSpan: PropTypes.number,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};


