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
    className={classNames('btn btn-link dx-g-bs4-table-edit-command-cell', className)}
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
  className = undefined,
  tableColumn = undefined,
  tableRow = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <th
    className={classNames({
      'text-center p-0 text-nowrap': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </th>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

export const EditCommandCell = ({
  tableColumn = undefined,
  tableRow = undefined,
  row = undefined,
  children = undefined,
  className = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <td
    className={classNames({
      'text-center p-0 text-nowrap': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </td>
);

EditCommandCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};
