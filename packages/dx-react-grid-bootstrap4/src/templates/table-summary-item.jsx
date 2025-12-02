import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSummaryItem = ({
  children = undefined,
  type,
  value = null,
  getMessage,
  className = undefined,
  tagName: Tag = 'div',
  ...restProps
}) => (
  <Tag
    className={classNames('dx-g-bs4-table-summary-item', className)}
    {...restProps}
  >
    {
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </Tag>
);

TableSummaryItem.propTypes = {
  tagName: PropTypes.string,
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
