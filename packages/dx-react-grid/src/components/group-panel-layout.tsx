import * as React from "react";
import { flushSync } from "react-dom";
import { DropTarget } from "@vtrphan/dx-react-core";
import { getGroupCellTargetIndex } from "@vtrphan/dx-grid-core";
import { ItemLayout } from "./group-panel-layout/item-layout";
import { GroupingPanel as GP } from "../types";

/** @internal */
export const GroupPanelLayout: React.ComponentType<GP.LayoutProps> = ({
  onGroup = () => {},
  draggingEnabled = false,
  isColumnGroupingEnabled = () => false,
  onGroupDraft = () => {},
  onGroupDraftCancel = () => {},
  items,
  emptyMessageComponent: EmptyMessage,
  containerComponent: Container,
  itemComponent: Item
}) => {
  const dragStateRef = React.useRef<GP.GroupingItemLayoutState>({
    sourceColumnName: null,
    targetItemIndex: -1
  });
  const setDragState = React.useCallback(
    <
      T extends
        | GP.GroupingItemLayoutState
        | ((state: GP.GroupingItemLayoutState) => GP.GroupingItemLayoutState)
    >(
      stateOrUpdater: T
    ) => {
      dragStateRef.current =
        typeof stateOrUpdater === "function"
          ? (stateOrUpdater as (
              state: GP.GroupingItemLayoutState
            ) => GP.GroupingItemLayoutState)(dragStateRef.current)
          : stateOrUpdater;
    },
    []
  );
  const draggingColumnName = React.useRef<string | null>(null);
  const itemRefs = React.useRef<Element[]>([]);

  const resetState = React.useCallback(() => {
    onGroupDraftCancel();
    setDragState({ sourceColumnName: null, targetItemIndex: -1 });
  }, [onGroupDraftCancel, setDragState]);

  const handleDragEvent = React.useCallback(
    (eventHandler, { payload, ...restArgs }) => {
      const { columnName } = payload[0];

      if (isColumnGroupingEnabled(columnName)) {
        eventHandler({ payload, ...restArgs });
      }
    },
    [isColumnGroupingEnabled]
  );

  const onEnter = React.useCallback(({ payload }) => {
    flushSync(() =>
      setDragState(prev => ({
        ...prev,
        sourceColumnName: payload[0].columnName
      }))
    );
  }, []);

  const onOver = React.useCallback(
    ({ clientOffset }) => {
      const { sourceColumnName, targetItemIndex } = dragStateRef.current;
      // eslint-disable-next-line react/no-find-dom-node
      const itemGeometries = itemRefs.current.map(ref =>
        ref.getBoundingClientRect()
      );
      const sourceItemIndex = items.findIndex(
        ({ column }) => column.name === sourceColumnName
      );
      const nextTargetItemIndex = getGroupCellTargetIndex(
        itemGeometries,
        sourceItemIndex,
        clientOffset
      );

      if (targetItemIndex === nextTargetItemIndex) return;

      onGroupDraft({
        columnName: sourceColumnName,
        groupIndex: nextTargetItemIndex
      });
      setDragState(prev => ({ ...prev, targetItemIndex: nextTargetItemIndex }));
    },
    [items, onGroupDraft, setDragState]
  );

  const onLeave = React.useCallback(() => {
    const { sourceColumnName } = dragStateRef.current;
    if (!draggingColumnName.current) {
      resetState();
      return;
    }
    onGroupDraft({
      columnName: sourceColumnName,
      groupIndex: -1
    });
    setDragState(prev => ({ ...prev, targetItemIndex: -1 }));
  }, [onGroupDraft, resetState, setDragState]);

  const onDrop = React.useCallback(() => {
    const { sourceColumnName, targetItemIndex } = dragStateRef.current;
    resetState();
    onGroup({
      columnName: sourceColumnName,
      groupIndex: targetItemIndex
    });
  }, [onGroup, resetState]);

  const onDragStart = React.useCallback((columnName: string) => {
    draggingColumnName.current = columnName;
  }, []);

  const onDragEnd = React.useCallback(() => {
    const { sourceColumnName, targetItemIndex } = dragStateRef.current;
    draggingColumnName.current = null;
    if (sourceColumnName && targetItemIndex === -1) {
      onGroup({
        columnName: sourceColumnName
      });
    }
    resetState();
  }, [onGroup, resetState]);

  itemRefs.current = [];

  const groupPanel = items.length ? (
    <Container>
      {items.map(item => {
        const { name: columnName } = item.column;
        return (
          <ItemLayout
            key={columnName}
            item={item}
            itemComponent={Item}
            itemRef={element => element && itemRefs.current.push(element)}
            draggingEnabled={
              draggingEnabled && isColumnGroupingEnabled(columnName)
            }
            onDragStart={() => onDragStart(columnName)}
            onDragEnd={onDragEnd}
          />
        );
      })}
    </Container>
  ) : (
    <EmptyMessage />
  );

  return draggingEnabled ? (
    <DropTarget
      onEnter={args => handleDragEvent(onEnter, args)}
      onOver={args => handleDragEvent(onOver, args)}
      onLeave={args => handleDragEvent(onLeave, args)}
      onDrop={args => handleDragEvent(onDrop, args)}
    >
      {groupPanel}
    </DropTarget>
  ) : (
    groupPanel
  );
};
