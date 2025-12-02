import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const ToggleButton = ({
  buttonRef,
  onToggle,
  disabled = false,
  children = undefined,
  className = undefined,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-outline-secondary', className)}
    disabled={disabled}
    onClick={onToggle}
    ref={buttonRef}
    {...restProps}
  >
    {children}
  </button>
);

ToggleButton.propTypes = {
  buttonRef: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
