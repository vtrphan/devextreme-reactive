import * as React from 'react';
import PropTypes from 'prop-types';
import { Cell } from './cell';

export const CaptionCell = ({
  row = {}, column = {},
  expanded = false, onToggle = () => {},
  children = undefined, tableRow = undefined, tableColumn = undefined,
  iconComponent: Icon, contentComponent: Content,
  inlineSummaryComponent: InlineSummary,
  inlineSummaryItemComponent: InlineSummaryItem,
  inlineSummaries = [], getMessage,
  containerComponent: Container,
  side = 'left', position = '',
  colSpan = 1,
  ...restProps
}) => (
  <Cell
    onToggle={onToggle}
    colSpan={colSpan}
    {...restProps}
  >
    <Container side={side} position={position}>
      <Icon
        expanded={expanded}
        onToggle={onToggle}
        style={{
          marginRight: '8px',
        }}
      />
      <Content
        column={column}
        row={row}
      >
        {children}
      </Content>
      {
        inlineSummaries.length ? (
          <InlineSummary
            inlineSummaries={inlineSummaries}
            getMessage={getMessage}
            inlineSummaryItemComponent={InlineSummaryItem}
          />
        ) : null
      }
    </Container>
  </Cell>
);

CaptionCell.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
  inlineSummaryComponent: PropTypes.func.isRequired,
  inlineSummaryItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  inlineSummaries: PropTypes.array,
  side: PropTypes.string,
  position: PropTypes.string,
};
