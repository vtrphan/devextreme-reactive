import * as React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelEmptyMessage = ({
  getMessage,
  style = null,
  forwardedRef = undefined,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
    style={{
      padding: '7px 0',
      ...style,
    }}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  style: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
