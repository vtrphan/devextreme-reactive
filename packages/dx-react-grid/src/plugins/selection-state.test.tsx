import { toggleSelection } from '@vtrphan/dx-grid-core';
import { testStatePluginField, setupConsole } from '@vtrphan/dx-testing';
import { SelectionState } from './selection-state';

jest.mock('@vtrphan/dx-grid-core', () => ({
  toggleSelection: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('SelectionState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    Plugin: SelectionState,
    propertyName: 'selection',
    values: [
      [1],
      [2],
      [3],
    ],
    actions: [{
      actionName: 'toggleSelection',
      reducer: toggleSelection,
    }],
  });
});
