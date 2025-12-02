/* globals document:true window:true */
import * as React from "react";
import PropTypes from "prop-types";
import classNames from "clsx";

export const BodyColorContext = React.createContext();

const getBodyColor = () => {
  const body = document.getElementsByTagName("body")[0];
  const { backgroundColor } = window.getComputedStyle(body);

  return backgroundColor;
};

export const Root = ({ children, className, rootRef, ...restProps }) => {
  const [backgroundColor, setBackgroundColor] = React.useState();

  React.useEffect(() => {
    setBackgroundColor(getBodyColor());
  }, []);

  return (
    <div
      className={classNames("d-flex flex-column", className)}
      ref={rootRef}
      {...restProps}
    >
      <BodyColorContext.Provider value={backgroundColor}>
        {children}
      </BodyColorContext.Provider>
    </div>
  );
};

Root.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  rootRef: PropTypes.object
};
