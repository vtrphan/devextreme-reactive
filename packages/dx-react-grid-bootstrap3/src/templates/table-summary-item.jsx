import * as React from 'react';
import PropTypes from 'prop-types';

export const TableSummaryItem = ({
  children = undefined,
  type,
  value = null,
  getMessage,
  style = null,
  ...restProps
}) => (
  <div
    style={{
      fontWeight: 'bold',
      ...style,
    }}
    {...restProps}
  >
    {
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </div>
);

TableSummaryItem.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};
