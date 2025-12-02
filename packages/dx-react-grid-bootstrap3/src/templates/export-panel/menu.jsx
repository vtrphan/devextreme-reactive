import * as React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { Overlay } from '../parts/overlay';

export const Menu = ({
  visible = false, target = null, onHide, children, ...restProps
}) => (
  <Overlay
    visible={visible}
    target={target}
    onHide={onHide}
    container={undefined}
    {...restProps}
  >
    <ListGroup
      style={{ marginBottom: 0 }}
    >
      {children}
    </ListGroup>
  </Overlay>
);

Menu.propTypes = {
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};
