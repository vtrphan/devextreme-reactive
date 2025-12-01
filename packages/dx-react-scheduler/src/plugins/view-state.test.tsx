import * as React from 'react';
import {
  testStatePluginField, pluginDepsToComponents, getComputedState, setupConsole,
} from '@vtrphan/dx-testing';
import { changeCurrentDate, setCurrentViewName } from '@vtrphan/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost } from '@vtrphan/dx-react-core';
import { ViewState } from './view-state';

jest.mock('@vtrphan/dx-scheduler-core', () => ({
  changeCurrentDate: jest.fn(),
  setCurrentViewName: jest.fn(),
}));

const defaultDeps = {};

describe('ViewState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    Plugin: ViewState,
    propertyName: 'currentDate',
    defaultDeps,
    values: [
      '2018-07-13',
      '2018-07-14',
      '2018-07-15',
    ],
    actions: [{
      actionName: 'changeCurrentDate',
      reducer: changeCurrentDate,
    }],
  });

  testStatePluginField({
    Plugin: ViewState,
    propertyName: 'currentViewName',
    getGetterValue: tree => getComputedState(tree).currentView.name,
    defaultDeps,
    values: [
      'MonthView',
      'DayView',
      'AgendaView',
    ],
    actions: [{
      actionName: 'setCurrentViewName',
      reducer: setCurrentViewName,
    }],
  });

  it('should provide the "currentDate" getter', () => {
    const tree = mount((
      <PluginHost>
        <ViewState
          currentDate="2018-07-13"
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).currentDate)
      .toBe('2018-07-13');
  });

  it('should provide the "currentView" getter', () => {
    const tree = mount((
      <PluginHost>
        <ViewState
          currentViewName="MonthView"
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).currentView)
      .toEqual({ name: 'MonthView' });
  });
});
