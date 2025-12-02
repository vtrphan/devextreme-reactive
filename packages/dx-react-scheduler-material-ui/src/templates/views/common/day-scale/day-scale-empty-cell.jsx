import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'DayScaleEmptyCell';

export const classes = {
  emptyCell: `${PREFIX}-emptyCell`,
};

const StyledDiv = styled('div')({
  [`&.${classes.emptyCell}`]: {
    height: '100%',
    width: '100%',
  },
});

export const DayScaleEmptyCell = ({
  className = undefined,
  children = undefined,
  ...restProps
}) => (
  <StyledDiv {...restProps} className={classNames(classes.emptyCell, className)}>
    {children}
  </StyledDiv>
);

DayScaleEmptyCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
