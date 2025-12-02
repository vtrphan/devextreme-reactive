import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@vtrphan/dx-react-grid';

const ToolbarBase = ({
  children,
  className = undefined,
  style = null,
  forwardedRef = undefined,
  ...restProps
}) => (
  <div
    className={classNames('panel-heading', className)}
    ref={forwardedRef}
    style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '55px',
      padding: '0px 15px',
      flex: 'none',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

ToolbarBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(ToolbarBase);
