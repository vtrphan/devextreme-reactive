import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const PaginationItem = ({
  active = false,
  disabled = false,
  ...restProps
}) => (
  <li
    className={classNames('page-item', { active, disabled })}
    {...restProps}
  />
);

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};
