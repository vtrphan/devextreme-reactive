import * as React from "react";
import PropTypes from "prop-types";

import { DragSource } from "@vtrphan/dx-react-core";

import { CellLayout } from "./table-header-cell/cell-layout";

export const TableHeaderCell = ({
  column,
  draggingEnabled = false,
  getCellWidth = () => {},
  ...restProps
}) => {
  const dragRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const handleDragStart = React.useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragEnd = React.useCallback(() => {
    if (dragRef.current) {
      setDragging(false);
    }
  }, []);

  const cellLayoutProps = {
    column,
    draggingEnabled,
    getCellWidth,
    ...restProps,
    dragging
  };

  return draggingEnabled ? (
    <DragSource
      ref={dragRef}
      payload={[{ type: "column", columnName: column?.name }]}
      onStart={handleDragStart}
      onEnd={handleDragEnd}
    >
      <CellLayout {...cellLayoutProps} />
    </DragSource>
  ) : (
    <CellLayout {...cellLayoutProps} />
  );
};

TableHeaderCell.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  className: PropTypes.string,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  getCellWidth: PropTypes.func
};
