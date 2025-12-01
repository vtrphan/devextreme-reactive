import * as React from "react";
import PropTypes from "prop-types";

export const SortingIndicator = React.memo(
  ({ direction = null, style = null }) => (
    <i
      className={`glyphicon glyphicon-arrow-${
        direction === "desc" ? "down" : "up"
      }`}
      style={{
        top: "0",
        fontSize: "9px",
        ...style
      }}
    />
  )
);

SortingIndicator.propTypes = {
  direction: PropTypes.oneOf(["asc", "desc"]),
  style: PropTypes.object
};
