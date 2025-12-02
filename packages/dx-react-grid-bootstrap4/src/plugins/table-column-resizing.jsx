import * as React from "react";
import PropTypes from "prop-types";
import { TableColumnResizing as TableColumnResizingBase } from "@vtrphan/dx-react-grid";

export const TableColumnResizing = ({
  minColumnWidth = 55,
  maxColumnWidth = Infinity,
  ...restProps
}) => (
  <TableColumnResizingBase
    {...restProps}
    minColumnWidth={minColumnWidth}
    maxColumnWidth={maxColumnWidth}
  />
);

TableColumnResizing.propTypes = {
  minColumnWidth: PropTypes.number,
  maxColumnWidth: PropTypes.number
};
