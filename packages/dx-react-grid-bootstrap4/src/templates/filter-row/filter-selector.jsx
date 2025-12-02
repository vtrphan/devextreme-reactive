import * as React from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { Popover } from "../../../../dx-react-bootstrap4/components";

export const FilterSelector = ({
  value,
  availableValues = [],
  onChange = () => {},
  disabled = false,
  getMessage,
  iconComponent: Icon,
  toggleButtonComponent: ToggleButton,
  className,
  ...restProps
}) => {
  const [opened, setOpened] = React.useState(false);
  const targetElement = React.useRef(null);

  const handleButtonClick = React.useCallback(() => {
    setOpened(prevState => !prevState);
  }, []);

  const handleOverlayToggle = React.useCallback(() => {
    setOpened(prevState => {
      if (!prevState) {
        return prevState;
      }
      return false;
    });
  }, []);

  const handleMenuItemClick = React.useCallback(
    nextValue => {
      setOpened(false);
      onChange(nextValue);
    },
    [onChange]
  );

  if (!availableValues.length) {
    return null;
  }

  return (
    <div
      className={classNames("input-group-prepend", className)}
      {...restProps}
    >
      <ToggleButton
        disabled={disabled || availableValues.length === 1}
        onToggle={handleButtonClick}
        buttonRef={ref => {
          targetElement.current = ref;
        }}
      >
        <Icon type={value} />
      </ToggleButton>
      {targetElement.current ? (
        <Popover
          placement="bottom"
          isOpen={opened}
          target={targetElement.current}
          toggle={handleOverlayToggle}
        >
          <div className="py-2">
            {availableValues.map(valueItem => (
              <button
                type="button"
                key={valueItem}
                className={classNames({
                  "dropdown-item d-flex align-items-center": true,
                  "dx-g-bs4-cursor-pointer dx-g-bs4-filter-selector-item": true,
                  active: valueItem === value
                })}
                onClick={() => handleMenuItemClick(valueItem)}
              >
                <Icon type={valueItem} />
                <span className="dx-g-bs4-filter-selector-item-text">
                  {getMessage(valueItem)}
                </span>
              </button>
            ))}
          </div>
        </Popover>
      ) : null}
    </div>
  );
};

FilterSelector.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  // oneOfType is a workaround because React.memo returns react object
  iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string
};
