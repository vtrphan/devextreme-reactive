import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Button, TableCell, styled } from '@mui/material';

const PREFIX = 'TableEditCommandCell';
export const classes = {
  button: `${PREFIX}-button`,
  headingCell: `${PREFIX}-headingCell`,
  cell: `${PREFIX}-cell`,
  alignWithRowSpan: `${PREFIX}-alignWithRowSpan`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    padding: theme.spacing(1),
    minWidth: 40,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.headingCell}`]: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: theme.spacing(0, 2, 0, 3),
  },
  [`&.${classes.cell}`]: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: theme.spacing(0, 2, 0, 3),
  },
  [`&.${classes.alignWithRowSpan}`]: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(1.25),
  },
}));

export const CommandButton = ({
  onExecute,
  text,
  className = undefined,
  ...restProps
}) => (
  <StyledButton
    color="primary"
    className={classNames(classes.button, className)}
    onClick={(e) => {
      e.stopPropagation();
      onExecute();
    }}
    {...restProps}
  >
    {text}
  </StyledButton>
);
CommandButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const EditCommandHeadingCell = ({
  children = undefined,
  className = undefined,
  tableRow = undefined, tableColumn = undefined,
  rowSpan = undefined,
  forwardedRef = undefined,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.headingCell]: true,
      [classes.alignWithRowSpan]: rowSpan > 1,
    }, className)}
    rowSpan={rowSpan}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
  forwardedRef: PropTypes.func,
};

export const EditCommandCell = ({
  tableRow = undefined, tableColumn = undefined, row = undefined, children = undefined,
  className = undefined, forwardedRef = undefined,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames(classes.cell, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);

EditCommandCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};
