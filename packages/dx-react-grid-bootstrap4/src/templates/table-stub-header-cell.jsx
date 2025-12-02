import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubHeaderCell = ({
  className = undefined,
  tableRow = undefined,
  tableColumn = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <th
    className={classNames({
      'p-0': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  />
);

TableStubHeaderCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.func,
};
