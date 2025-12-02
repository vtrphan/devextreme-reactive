import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Editor = ({
  value = '', disabled = false, getMessage, onChange = () => {}, className = undefined,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control', className)}
    value={value}
    onChange={event => onChange(event.target.value)}
    readOnly={disabled}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

Editor.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};
