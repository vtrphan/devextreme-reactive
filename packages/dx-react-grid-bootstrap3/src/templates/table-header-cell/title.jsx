import * as React from 'react';
import PropTypes from 'prop-types';

export const Title = ({
  children = undefined, style = null, ...restProps
}) => (
  <span
    style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </span>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};
