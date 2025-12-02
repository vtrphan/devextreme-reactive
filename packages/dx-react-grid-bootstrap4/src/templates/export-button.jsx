import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const ExportButton = ({
  onClick,
  getMessage,
  className = undefined,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-link', className)}
    onClick={onClick}
    {...restProps}
  >
    {getMessage('export')}
  </button>
);

ExportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};
