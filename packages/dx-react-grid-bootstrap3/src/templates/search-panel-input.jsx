import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const SearchPanelInput = ({
  onValueChange,
  value = null,
  getMessage,
  style = null,
  className = undefined,
  inputRef = undefined,
  ...restProps
}) => (
  <input
    type="text"
    ref={inputRef}
    className={classNames('form-control', className)}
    onChange={e => onValueChange(e.target.value)}
    value={value}
    style={{ maxWidth: '25%', ...style }}
    placeholder={getMessage('searchPlaceholder')}
    {...restProps}
  />
);

SearchPanelInput.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputRef: PropTypes.object,
};
