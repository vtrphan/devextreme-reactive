import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@vtrphan/dx-react-core';
import { appointments, formatDateTimeGetter } from '@vtrphan/dx-scheduler-core';
import { SchedulerProps } from '../types';
import { memoize } from '@vtrphan/dx-core';

class SchedulerCoreBase extends React.PureComponent<SchedulerProps> {
  formatDateTimeGetter = memoize(locale => formatDateTimeGetter(locale));

  render() {
    const {
      data,
      rootComponent: Root,
      locale,
      height,
      firstDayOfWeek,
    } = this.props;

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="appointments" value={appointments(data)} />
        <Getter name="formatDate" value={this.formatDateTimeGetter(locale)} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="locale" value={locale} />
        <Template name="root">
          <Root height={height}>
            <TemplatePlaceholder name="schedulerRoot" />
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler's functionality
 * (data visualization and processing) is implemented in several plugins
 * specified as child components.
 * */
export const SchedulerCore: React.ComponentType<SchedulerProps> = SchedulerCoreBase;
