import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { TableRow as RowBase } from '../table-row';

export const Row = ({
  children = null,
  className = undefined,
  ...restProps
}) => (
  <RowBase
    {...restProps}
    className={classNames('dx-g-bs4-cursor-pointer', className)}
  >
    {children}
  </RowBase>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
