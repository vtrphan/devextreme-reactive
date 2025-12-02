import * as React from "react";
import classNames from "clsx";
import PropTypes from "prop-types";

export const TableDetailCell = ({
  colSpan = 1,
  children = undefined,
  className = undefined,
  tableColumn = undefined,
  tableRow = undefined,
  row = undefined,
  forwardedRef = undefined,
  style = null,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames("table-active", className)}
    style={style}
    {...restProps}
  >
    {children}
  </td>
);

TableDetailCell.propTypes = {
  colSpan: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
  style: PropTypes.object
};
