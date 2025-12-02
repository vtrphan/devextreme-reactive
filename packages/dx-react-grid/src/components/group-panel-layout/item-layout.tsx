import * as React from "react";
import { DragSource } from "@vtrphan/dx-react-core";
import { GroupingPanel as GP } from "../../types";

/** @internal */
export const ItemLayout: React.FC<GP.GroupingItemLayoutProps> = ({
  draggingEnabled = false,
  onDragStart = () => {},
  onDragEnd = () => {},
  item,
  itemComponent: Item,
  itemRef
}) => {
  const [dragging, setDragging] = React.useState(false);

  const itemElement = (
    <Item item={{ ...item, draft: dragging || item.draft }} />
  );

  return draggingEnabled ? (
    <DragSource
      payload={[{ type: "column", columnName: item.column.name }]}
      onStart={() => {
        setDragging(true);
        onDragStart();
      }}
      onEnd={() => {
        setDragging(false);
        onDragEnd();
      }}
      ref={itemRef}
    >
      {itemElement}
    </DragSource>
  ) : (
    itemElement
  );
};
