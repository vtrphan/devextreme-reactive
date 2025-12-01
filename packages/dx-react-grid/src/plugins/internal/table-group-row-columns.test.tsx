
import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@vtrphan/dx-testing';
import { PluginHost } from '@vtrphan/dx-react-core';
import {
  tableColumnsWithGrouping,
} from '@vtrphan/dx-grid-core';
import { TableColumnsWithGrouping } from './table-group-row-columns';

jest.mock('@vtrphan/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    grouping: [{ columnName: 'a' }],
    draftGrouping: [{ columnName: 'a' }, { columnName: 'b' }],
  },
  plugins: ['GroupingState', 'Table'],
};

const defaultProps = {
  indentColumnWidth: 100,
};

describe('TableColumnsWithGrouping', () => {
  beforeEach(() => {
    tableColumnsWithGrouping.mockImplementation(() => 'tableColumnsWithGrouping');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extend tableColumns', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnsWithGrouping
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toBe('tableColumnsWithGrouping');
    expect(tableColumnsWithGrouping)
      .toBeCalledWith(
        defaultDeps.getter.columns,
        defaultDeps.getter.tableColumns,
        defaultDeps.getter.grouping,
        defaultDeps.getter.draftGrouping,
        defaultProps.indentColumnWidth,
        expect.any(Function),
      );
  });
});
