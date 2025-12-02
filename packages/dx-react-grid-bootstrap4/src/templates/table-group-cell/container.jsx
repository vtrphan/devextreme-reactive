import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Container = ({
  children = undefined,
  className = undefined,
  style = null,
  side = 'left',
  position = '',
  ...restProps
}) => (
  <div
    className={classNames('position-sticky dx-g-bs4-fixed-group-cell', className)}
    style={{
      ...style,
      [side]: position,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.string,
};
