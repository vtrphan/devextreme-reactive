import * as React from "react";
import PropTypes from "prop-types";
import classNames from "clsx";

export const FocusRow = ({
  component: RowPlaceholder,
  className,
  focused = false,
  ...restProps
}) => (
  <RowPlaceholder
    className={classNames(
      {
        "bg-light": !!focused
      },
      className
    )}
    {...restProps}
  />
);

FocusRow.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool
};
