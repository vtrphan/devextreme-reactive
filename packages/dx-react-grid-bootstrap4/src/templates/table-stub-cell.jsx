import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubCell = ({
  className = undefined,
  tableRow = undefined,
  tableColumn = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
    className={classNames('p-0', className)}
    {...restProps}
  />
);

TableStubCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
