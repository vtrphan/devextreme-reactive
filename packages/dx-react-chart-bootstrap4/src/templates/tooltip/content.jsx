import * as React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
export const Content = ({ text, targetItem = undefined, ...restProps }) => (
  <span {...restProps}>{text}</span>
);

Content.propTypes = {
  text: PropTypes.string.isRequired,
  targetItem: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }),
};
