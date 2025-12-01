import * as React from "react";
import PropTypes from "prop-types";
import { getDayScaleCells } from "@vtrphan/dx-scheduler-core";
import { Table } from "../table";

const DefaultGroupingPanel = () => null;

export const Layout = React.memo(
  ({
    cellComponent: Cell,
    rowComponent: Row,
    groupingPanelComponent: GroupingPanel = DefaultGroupingPanel,
    cellsData,
    formatDate,
    groupedByDate = false,
    ...restProps
  }) => (
    <Table cellsNumber={cellsData[0].length} {...restProps}>
      {!groupedByDate && <GroupingPanel />}
      <Row>
        {getDayScaleCells(cellsData, groupedByDate).map(
          ({
            startDate,
            endDate,
            today,
            key,
            endOfGroup,
            groupingInfo,
            colSpan
          }) => (
            <Cell
              key={key}
              startDate={startDate}
              endDate={endDate}
              today={today}
              formatDate={formatDate}
              endOfGroup={endOfGroup}
              hasRightBorder={endOfGroup}
              groupingInfo={groupingInfo}
              colSpan={colSpan}
            />
          )
        )}
      </Row>
      {groupedByDate && <GroupingPanel />}
    </Table>
  )
);

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  groupingPanelComponent: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  groupedByDate: PropTypes.bool
};
