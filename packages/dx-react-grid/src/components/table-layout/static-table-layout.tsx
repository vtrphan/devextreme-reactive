import * as React from "react";
import { ColumnGroup } from "./column-group";
import { RowsBlockLayout } from "./rows-block-layout";
import { TableLayoutProps } from "../../types";

/** @internal */
export const StaticTableLayout: React.FC<TableLayoutProps> = ({
  headerRows = [],
  footerRows = [],
  headComponent = () => null,
  footerComponent = () => null,
  bodyRows,
  columns,
  minWidth,
  containerComponent: Container,
  tableComponent: Table,
  bodyComponent,
  rowComponent,
  cellComponent,
  getCellColSpan,
  tableRef
}) => {
  const commonProps = {
    columns,
    rowComponent,
    cellComponent,
    getCellColSpan
  };

  return (
    <Container>
      <Table forwardedRef={tableRef} style={{ minWidth: `calc(${minWidth})` }}>
        <ColumnGroup columns={columns} />
        {!!headerRows.length && (
          <RowsBlockLayout
            rows={headerRows}
            blockComponent={headComponent}
            {...commonProps}
          />
        )}
        <RowsBlockLayout
          rows={bodyRows}
          blockComponent={bodyComponent}
          {...commonProps}
        />
        {!!footerRows.length && (
          <RowsBlockLayout
            rows={footerRows}
            blockComponent={footerComponent}
            {...commonProps}
          />
        )}
      </Table>
    </Container>
  );
};
