import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const CommandButton = ({
  onExecute,
  text,
  className = undefined,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn', 'btn-link', className)}
    style={{
      outline: 'none',
    }}
    onClick={(e) => {
      e.stopPropagation();
      onExecute();
    }}
    {...restProps}
  >
    {text}
  </button>
);

CommandButton.propTypes = {
  text: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const EditCommandHeadingCell = ({
  children = undefined,
  style = null,
  tableColumn = undefined, tableRow = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <th
    ref={forwardedRef}
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </th>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.func,
};

export const EditCommandCell = ({
  tableColumn = undefined, tableRow = undefined, row = undefined,
  children = undefined, style = null,
  forwardedRef = undefined,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </td>
);

EditCommandCell.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};
