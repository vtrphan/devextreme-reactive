import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@vtrphan/dx-react-core';
import { getMessagesFormatter } from '@vtrphan/dx-core';
import { pluginDepsToComponents } from '@vtrphan/dx-testing';
import { TodayButton } from './today-button';

jest.mock('@vtrphan/dx-core', () => ({
  ...jest.requireActual('@vtrphan/dx-core'),
  getMessagesFormatter: jest.fn(),
}));

describe('TodayButton', () => {
  const defaultProps = {
    buttonComponent: () => null,
    messages: { testData: 'testData' },
  };
  const defaultDeps = {
    action: {
      changeCurrentDate: jest.fn(),
    },
    template: {
      toolbarContent: {},
    },
    plugins: ['Toolbar', 'ViewState'],
  };

  beforeEach(() => {
    getMessagesFormatter.mockImplementation(() => 'getMessagesFormatter');
  });

  it('should render a button component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TodayButton
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(tree.find(defaultProps.buttonComponent).exists())
      .toBeTruthy();
  });

  it('should call getMessagesFormatter with correct data', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TodayButton
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getMessagesFormatter).toBeCalledWith({
      today: 'Today',
      testData: 'testData',
    });
    expect(tree.find(defaultProps.buttonComponent).prop('getMessage')).toBe('getMessagesFormatter');
  });

  it('should call changeCurrentDate with correct parameters', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TodayButton
          {...defaultProps}
        />
      </PluginHost>
    ));

    const button = tree.find(defaultProps.buttonComponent);
    const setCurrentDate = button.prop('setCurrentDate');
    const testData = 'testData';
    setCurrentDate(testData);
    expect(defaultDeps.action.changeCurrentDate)
      .toBeCalledWith({ nextDate: testData }, expect.any(Object), expect.any(Object));
  });
});
