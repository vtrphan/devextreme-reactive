import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@vtrphan/dx-react-grid';

export const ToolbarBase = ({
  children,
  className = undefined,
  style = null,
  forwardedRef = undefined,
  ...restProps
}) => (
  <div
    className={classNames('card-header py-2 d-flex position-relative dx-g-bs4-toolbar', className)}
    ref={forwardedRef}
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

ToolbarBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(ToolbarBase);
