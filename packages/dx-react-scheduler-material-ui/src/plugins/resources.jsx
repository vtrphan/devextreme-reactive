import * as React from 'react';
import PropTypes from 'prop-types';
import { Resources as ResourcesBase } from '@vtrphan/dx-react-scheduler';
import { DEFAULT_PALETTE } from '../templates/constants';

export const Resources = ({ data = [], mainResourceName = undefined, palette = DEFAULT_PALETTE }) => (
  <ResourcesBase
    data={data}
    mainResourceName={mainResourceName}
    palette={palette}
  />
);

Resources.propTypes = {
  data: PropTypes.array,
  mainResourceName: PropTypes.string,
  palette: PropTypes.array,
};
