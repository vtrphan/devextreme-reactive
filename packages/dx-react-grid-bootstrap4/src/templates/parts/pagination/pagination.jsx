import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Pagination = ({
  className = undefined,
  listClassName = undefined,
  ...restProps
}) => (
  <nav className={className}>
    <ul
      className={classNames('pagination', listClassName)}
      {...restProps}
    />
  </nav>
);

Pagination.propTypes = {
  className: PropTypes.string,
  listClassName: PropTypes.string,
};
