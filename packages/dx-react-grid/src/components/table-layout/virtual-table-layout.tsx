import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { MemoizedFunction, memoize } from "@vtrphan/dx-core";
import {
  TableColumn,
  GetColumnWidthFn,
  getCollapsedGrids,
  getColumnWidthGetter,
  TABLE_STUB_TYPE,
  getViewport,
  GridViewport,
  getScrollLeft,
  isColumnsWidthDifferent
} from "@vtrphan/dx-grid-core";
import { VirtualTableLayoutProps } from "../../types";
import { VirtualTableLayoutBlock } from "./virtual-table-layout-block";
import { Sizer } from "@vtrphan/dx-react-core";
import { ColumnGroup } from "./column-group";

const AUTO_HEIGHT = "auto";
const MAX_WINDOW_HEIGHT = 10000000;
const FACTOR = 3;

const NoopComponent: React.ComponentType<any> = () => null;
const ForwardRefNoop = React.forwardRef<any>((_props, _ref) => null);

type LayoutState = {
  viewportTop: number;
  viewportLeft: number;
  skipItems: [number, number];
  containerHeight: number;
  containerWidth: number;
};

/** @internal */
export const VirtualTableLayout: React.ComponentType<VirtualTableLayoutProps> = ({
  headerRows = [],
  footerRows = [],
  headComponent = NoopComponent,
  footerComponent = NoopComponent,
  tableComponent = NoopComponent,
  containerComponent = ForwardRefNoop,
  bodyComponent,
  bodyRows,
  minWidth,
  minColumnWidth,
  cellComponent,
  rowComponent,
  tableRef,
  height,
  viewport,
  scrollTop,
  columns,
  nextColumnId,
  loadedRowsStart,
  totalRowCount,
  getCellColSpan,
  estimatedRowHeight,
  isDataRemote,
  setViewport
}) => {
  const [layoutState, setLayoutState] = React.useState<LayoutState>({
    viewportTop: 0,
    viewportLeft: 0,
    skipItems: [0, 0],
    containerHeight: 600,
    containerWidth: 800
  });
  const [rowHeights, setRowHeights] = React.useState<Map<any, number>>(
    new Map()
  );
  const rowRefs = React.useRef(new Map<any, HTMLElement>());
  const rowHeightsRef = React.useRef(rowHeights);
  rowHeightsRef.current = rowHeights;
  const layoutStateRef = React.useRef(layoutState);
  layoutStateRef.current = layoutState;

  const getColumnWidthGetterRef = React.useRef<
    MemoizedFunction<[TableColumn[], number, number], GetColumnWidthFn>
  >();
  if (!getColumnWidthGetterRef.current) {
    getColumnWidthGetterRef.current = memoize(
      (tableColumns, tableWidth, minColumnWidthValue) =>
        getColumnWidthGetter(tableColumns, tableWidth, minColumnWidthValue)
    );
  }

  const registerRowRef = React.useCallback((row, ref) => {
    if (row.type === TABLE_STUB_TYPE) {
      return;
    }
    if (!ref) {
      rowRefs.current.delete(row);
      return;
    }
    rowRefs.current.set(row, ref as HTMLElement);
  }, []);

  const getRowHeight = React.useCallback(
    row => {
      if (row) {
        const storedHeight = rowHeightsRef.current.get(row.key);
        if (storedHeight !== undefined) return storedHeight;
        if (row.height) return row.height;
      }
      return estimatedRowHeight;
    },
    [estimatedRowHeight]
  );

  const storeRowHeights = React.useCallback(() => {
    const rowsWithChangedHeights = Array.from(rowRefs.current.entries())
      .filter(([, node]) => !!node)
      .map(([row, node]) => [row, node.getBoundingClientRect().height])
      .filter(
        ([row, height]) =>
          row.type !== TABLE_STUB_TYPE && height !== getRowHeight(row)
      );

    if (rowsWithChangedHeights.length) {
      setRowHeights(prev => {
        const next = new Map(prev);
        rowsWithChangedHeights.forEach(([row, height]) =>
          next.set(row.key, height)
        );
        return next;
      });
    }
  }, [getRowHeight]);

  React.useEffect(() => {
    const timeout = setTimeout(storeRowHeights);
    return () => clearTimeout(timeout);
  });

  React.useLayoutEffect(() => {
    storeRowHeights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setRowHeights(prev => {
      const next = new Map();
      [...headerRows, ...bodyRows, ...footerRows].forEach(row => {
        const storedHeight = prev.get(row.key);
        if (storedHeight !== undefined) {
          next.set(row.key, storedHeight);
        }
      });
      if (prev.size === next.size) {
        let hasChanges = false;
        next.forEach((value, key) => {
          if (!hasChanges && prev.get(key) !== value) {
            hasChanges = true;
          }
        });
        if (!hasChanges) {
          return prev;
        }
      }
      return next;
    });
  }, [headerRows, bodyRows, footerRows]);

  const getCountSkipRows = React.useCallback(() => {
    const containerHeightValue = totalRowCount * estimatedRowHeight;
    if (containerHeightValue > MAX_WINDOW_HEIGHT) {
      return Math.round(totalRowCount - MAX_WINDOW_HEIGHT / estimatedRowHeight);
    }
    return 0;
  }, [totalRowCount, estimatedRowHeight]);

  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const node = e.target as HTMLDivElement;
      if (node !== e.currentTarget) {
        return;
      }

      const correction = 1;
      const nodeHorizontalOffset =
        parseInt((node.scrollLeft + node.clientWidth).toString(), 10) -
        correction;
      const nodeVerticalOffset =
        parseInt((node.scrollTop + node.clientHeight).toString(), 10) -
        correction;
      if (
        node.scrollTop < 0 ||
        node.scrollLeft < 0 ||
        nodeHorizontalOffset > Math.max(node.scrollWidth, node.clientWidth) ||
        nodeVerticalOffset > Math.max(node.scrollHeight, node.clientHeight)
      ) {
        return;
      }

      const viewportTop = node.scrollTop;
      const viewportLeft = node.scrollLeft;
      const {
        containerHeight,
        skipItems,
        viewportTop: prevViewPort
      } = layoutStateRef.current;
      const countSkipRows = getCountSkipRows();
      const dif = viewportTop - prevViewPort;
      const pxInPercent = viewportTop / MAX_WINDOW_HEIGHT;
      const isDif = Math.abs(dif) < FACTOR * containerHeight;
      const top = Math.min(
        Math.round(pxInPercent * countSkipRows),
        countSkipRows
      );
      unstable_batchedUpdates(() => {
        setLayoutState(prev => ({
          ...prev,
          viewportTop,
          viewportLeft,
          skipItems: isDif ? skipItems : [top, countSkipRows - top]
        }));
      });
    },
    [getCountSkipRows]
  );

  const handleContainerSizeChange = React.useCallback(({ width, height }) => {
    unstable_batchedUpdates(() => {
      setLayoutState(prev => ({
        ...prev,
        containerHeight: height,
        containerWidth: width
      }));
    });
  }, []);

  const calculateViewport = React.useCallback(() => {
    const {
      viewportTop,
      skipItems,
      viewportLeft,
      containerHeight,
      containerWidth
    } = layoutState;
    const getColumnWidth = getColumnWidthGetterRef.current!(
      columns,
      containerWidth,
      minColumnWidth || 0
    );

    return getViewport(
      { viewportTop, skipItems, viewportLeft, containerHeight, containerWidth },
      {
        loadedRowsStart,
        columns,
        bodyRows,
        headerRows,
        footerRows,
        isDataRemote,
        viewport
      },
      getRowHeight,
      getColumnWidth
    );
  }, [
    columns,
    minColumnWidth,
    loadedRowsStart,
    bodyRows,
    headerRows,
    footerRows,
    isDataRemote,
    viewport,
    getRowHeight,
    layoutState
  ]);

  const updateViewport = React.useCallback(() => {
    const newViewport = calculateViewport();
    if (viewport !== newViewport) {
      setViewport(newViewport);
    }
  }, [calculateViewport, viewport, setViewport]);

  const {
    viewportTop,
    viewportLeft,
    containerWidth,
    containerHeight,
    skipItems
  } = layoutState;
  const prevMetricsRef = React.useRef({
    bodyRows,
    columns,
    totalRowCount,
    viewportTop,
    viewportLeft,
    containerWidth,
    containerHeight
  });

  React.useLayoutEffect(() => {
    const prev = prevMetricsRef.current;
    const bodyRowsChanged = prev.bodyRows !== bodyRows;
    const columnCountChanged = prev.columns.length !== columns.length;
    const widthsChanged =
      prev.columns[0]?.width !== undefined &&
      columns[0]?.width !== undefined &&
      isColumnsWidthDifferent(prev.columns, columns);
    const viewportTopChanged = prev.viewportTop !== viewportTop;
    const viewportLeftChanged = prev.viewportLeft !== viewportLeft;
    const containerWidthChanged = prev.containerWidth !== containerWidth;
    const containerHeightChanged = prev.containerHeight !== containerHeight;

    if (
      bodyRowsChanged ||
      columnCountChanged ||
      widthsChanged ||
      viewportTopChanged ||
      viewportLeftChanged ||
      containerWidthChanged ||
      containerHeightChanged
    ) {
      updateViewport();
    }

    if (prev.totalRowCount !== totalRowCount) {
      const countSkipRows = getCountSkipRows();
      if (countSkipRows !== 0 && skipItems[0] === 0 && skipItems[1] === 0) {
        setLayoutState(prevState => ({
          ...prevState,
          skipItems: [0, countSkipRows]
        }));
      }
    }

    prevMetricsRef.current = {
      bodyRows,
      columns,
      totalRowCount,
      viewportTop,
      viewportLeft,
      containerWidth,
      containerHeight
    };
  }, [
    bodyRows,
    columns,
    totalRowCount,
    viewportTop,
    viewportLeft,
    containerWidth,
    containerHeight,
    skipItems,
    updateViewport,
    getCountSkipRows
  ]);
  const getCollapsedGridsComputed = React.useCallback(
    (currentViewport: GridViewport) => {
      const getColumnWidth = getColumnWidthGetterRef.current!(
        columns,
        containerWidth,
        minColumnWidth || 0
      );

      return getCollapsedGrids({
        headerRows,
        bodyRows,
        footerRows,
        columns,
        loadedRowsStart,
        totalRowCount,
        getCellColSpan,
        viewportLeft,
        containerWidth,
        viewport: currentViewport,
        skipItems,
        getRowHeight,
        getColumnWidth
      });
    },
    [
      headerRows,
      bodyRows,
      footerRows,
      columns,
      loadedRowsStart,
      totalRowCount,
      getCellColSpan,
      minColumnWidth,
      viewportLeft,
      containerWidth,
      skipItems,
      getRowHeight
    ]
  );

  const collapsedGrids = React.useMemo(
    () => getCollapsedGridsComputed(viewport),
    [getCollapsedGridsComputed, viewport]
  );
  const scrollLeft = getScrollLeft(
    columns.length,
    minColumnWidth || 0,
    nextColumnId
  );
  const commonProps = React.useMemo(
    () => ({
      cellComponent,
      rowComponent,
      minColumnWidth,
      minWidth,
      rowRefsHandler: registerRowRef
    }),
    [cellComponent, rowComponent, minColumnWidth, minWidth, registerRowRef]
  );
  const sizerHeight = height === AUTO_HEIGHT ? null : height;

  const Container = containerComponent;
  const Table = tableComponent as React.ComponentType<any>;
  const Head = headComponent;
  const Body = bodyComponent;
  const Footer = footerComponent;

  return (
    <Sizer
      onSizeChange={handleContainerSizeChange}
      containerComponent={Container}
      style={{ height: sizerHeight }}
      onScroll={onScroll}
      scrollTop={scrollTop}
      scrollLeft={scrollLeft}
    >
      <Table forwardedRef={tableRef} style={{ minWidth: `${minWidth}px` }}>
        <ColumnGroup
          columns={collapsedGrids.bodyGrid.columns as TableColumn[]}
        />
        {!!headerRows.length && (
          <VirtualTableLayoutBlock
            {...commonProps}
            name="header"
            isFixed={true}
            collapsedGrid={collapsedGrids.headerGrid}
            bodyComponent={Head}
          />
        )}
        <VirtualTableLayoutBlock
          {...commonProps}
          name="body"
          collapsedGrid={collapsedGrids.bodyGrid}
          bodyComponent={Body}
        />
        {!!footerRows.length && (
          <VirtualTableLayoutBlock
            {...commonProps}
            name="footer"
            isFixed={true}
            collapsedGrid={collapsedGrids.footerGrid}
            bodyComponent={Footer}
          />
        )}
      </Table>
    </Sizer>
  );
};
