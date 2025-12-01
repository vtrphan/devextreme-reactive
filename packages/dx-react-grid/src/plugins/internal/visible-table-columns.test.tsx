
import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@vtrphan/dx-testing';
import { PluginHost } from '@vtrphan/dx-react-core';
import {
  visibleTableColumns,
} from '@vtrphan/dx-grid-core';
import { VisibleTableColumns } from './visible-table-columns';

jest.mock('@vtrphan/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
  },
};

const defaultProps = {
  hiddenColumnNames: ['a', 'b'],
};

describe('VisibleTableColumns', () => {
  beforeEach(() => {
    visibleTableColumns.mockImplementation(() => 'visibleTableColumns');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extend tableColumns', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <VisibleTableColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toBe('visibleTableColumns');
    expect(visibleTableColumns)
      .toBeCalledWith(
        defaultDeps.getter.tableColumns,
        defaultProps.hiddenColumnNames,
      );
  });
});
