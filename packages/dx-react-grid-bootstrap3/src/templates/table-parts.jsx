import * as React from 'react';
import PropTypes from 'prop-types';

import { StyleContext } from './layout';
import { getStickyStyles } from '../utils/css-fallback-properties';

export const TableHead = ({ isFixed = undefined, style = undefined, ...restProps }) => (
  <thead
    {...restProps}
    style={{
      ...style,
      ...(isFixed && {
        ...getStickyStyles(React.useContext(StyleContext)),
        top: 0,
      }),
    }}
  />
);

TableHead.propTypes = {
  style: PropTypes.object,
  isFixed: PropTypes.bool,
};

export const TableBody = ({ isFixed = undefined, ...restProps }) => <tbody {...restProps} />;
TableBody.propTypes = {
  isFixed: PropTypes.bool,
};

export const TableFooter = ({ isFixed = undefined, ...restProps }) => (
  <tfoot
    {...restProps}
    style={{
      ...(isFixed && {
        ...getStickyStyles(React.useContext(StyleContext)),
        bottom: 0,
      }),
    }}
  />
);

TableFooter.propTypes = {
  isFixed: PropTypes.bool,
};
