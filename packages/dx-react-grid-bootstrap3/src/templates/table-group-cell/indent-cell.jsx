import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from '../layout';

export const IndentCell = ({
  tableRow = undefined,
  tableColumn = undefined,
  row = {}, column = {},
  style = null, position = undefined, side = 'left',
  forwardedRef = undefined,
  ...restProps
}) => {
  const { backgroundColor, stickyPosition } = useContext(StyleContext);

  return (
    <td
      ref={forwardedRef}
      style={{
        [side]: position,
        backgroundColor,
        backgroundClip: 'padding-box',
        position: stickyPosition,
        zIndex: 300,
        ...style,
      }}
      {...restProps}
    />
  );
};

IndentCell.propTypes = {
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.number,
  forwardedRef: PropTypes.func,
};
