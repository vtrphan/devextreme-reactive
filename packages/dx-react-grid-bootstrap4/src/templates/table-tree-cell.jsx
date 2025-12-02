import * as React from "react";
import PropTypes from "prop-types";
import classNames from "clsx";

export const TableTreeCell = ({
  column = undefined,
  children = undefined,
  tableRow = undefined,
  tableColumn = undefined,
  row = undefined,
  forwardedRef = undefined,
  style = null,
  ...restProps
}) => (
  <td ref={forwardedRef} style={style} {...restProps}>
    <div
      className={classNames({
        "d-flex flex-direction-row align-items-center": true,
        "text-nowrap": !(tableColumn && tableColumn.wordWrapEnabled),
        "text-right": tableColumn && tableColumn.align === "right",
        "text-center": tableColumn && tableColumn.align === "center"
      })}
    >
      {children}
    </div>
  </td>
);

TableTreeCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  forwardedRef: PropTypes.func
};
