import React from 'react';
import PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@vtrphan/dx-react-grid';

const FocusCellBase = ({
  component: CellPlaceholder,
  focused = undefined,
  style = undefined,
  ...restProps
}) => {
  const borderStyle = '1px solid #337ab7';
  const border = {
    borderTop: borderStyle,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    borderBottom: borderStyle,
  };
  return (
    <CellPlaceholder
      {...restProps}
      style={{
        outline: 'none',
        ...(focused ? border : null),
        ...style,
      }}
    />
  );
};

FocusCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  style: PropTypes.object,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
