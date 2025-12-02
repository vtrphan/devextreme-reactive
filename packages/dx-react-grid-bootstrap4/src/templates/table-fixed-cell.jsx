import * as React from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { BodyColorContext } from "./layout";

export const FixedCell = ({
  className,
  component: CellPlaceholder,
  position,
  selected = false,
  showLeftDivider = false,
  showRightDivider = false,
  side,
  style = null,
  ...restProps
}) => {
  const contextBackground = React.useContext(BodyColorContext);
  const backgroundColor = selected ? "inherit" : contextBackground;

  return (
    <CellPlaceholder
      className={classNames(
        {
          "border-left": showLeftDivider,
          "border-right": showRightDivider,
          "dx-g-bs4-fixed-cell": true,
          "position-sticky": true
        },
        className
      )}
      style={{
        backgroundColor,
        [side]: position,
        ...style
      }}
      {...restProps}
    />
  );
};

FixedCell.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  position: PropTypes.number,
  selected: PropTypes.bool,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
  side: PropTypes.string.isRequired,
  style: PropTypes.object
};
