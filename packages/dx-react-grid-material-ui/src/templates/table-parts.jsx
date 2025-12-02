import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import {
  TableHead, TableBody, TableFooter, styled,
} from '@mui/material';
import { getStickyStyles } from './utils';

const PREFIX = 'TableParts';
export const classes = {
  fixedHeader: `${PREFIX}-fixedHeader`,
  fixedFooter: `${PREFIX}-fixedFooter`,
};

const StyledHead = styled(TableHead)(({ theme }) => ({
  [`&.${classes.fixedHeader}`]: {
    ...getStickyStyles(theme, 500),
    top: 0,
  },
}));

const StyledFooter = styled(TableFooter)(({ theme }) => ({
  [`&.${classes.fixedFooter}`]: {
    ...getStickyStyles(theme),
    bottom: 0,
  },
}));

export const Head = ({
  isFixed = undefined, className = undefined, ...restProps
}) => (
  <StyledHead
    className={classNames({ [classes.fixedHeader]: isFixed }, className)}
    {...restProps}
  />
);

Head.propTypes = {
  className: PropTypes.string,
  isFixed: PropTypes.bool,
};

export const Body = ({ isFixed = undefined, ...props }) => <TableBody {...props} />;
Body.propTypes = {
  isFixed: PropTypes.bool,
};

export const Footer = ({ isFixed = undefined, ...props }) => (
  <StyledFooter className={classNames({ [classes.fixedFooter]: isFixed })} {...props} />
);

Footer.propTypes = {
  isFixed: PropTypes.bool,
};
