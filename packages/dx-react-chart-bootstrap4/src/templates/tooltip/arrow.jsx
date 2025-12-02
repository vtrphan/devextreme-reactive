import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Arrow = React.forwardRef(({
  className = undefined, placement, ...restProps
}, ref) => (
  <div className={classNames('arrow', className)} ref={ref} {...restProps} />
));

Arrow.propTypes = {
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
};
