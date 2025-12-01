import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@vtrphan/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@vtrphan/dx-testing';
import { changeSeriesState } from '@vtrphan/dx-chart-core';
import { SelectionState } from './selection-state';

jest.mock('@vtrphan/dx-chart-core', () => ({
  SELECTED: 'TEST-SELECTED',
  changeSeriesState: jest.fn().mockReturnValue('selected-series'),
}));

describe('SelectionState', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      series: 'test-series',
    },
  };

  it('should provide getters', () => {
    const mock = [{ series: '1', point: 1 }, { series: '2', point: 2 }];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SelectionState selection={mock} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      series: 'selected-series',
    });
    expect(changeSeriesState).toBeCalledWith('test-series', mock, 'TEST-SELECTED');
  });
});
