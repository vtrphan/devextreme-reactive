import { PureComputed } from '@vtrphan/dx-core';
import { AppointmentId, AppointmentChanges, Changes } from '../../types';

export const changedAppointmentById: PureComputed<
  [Changes, AppointmentId], AppointmentChanges
> = (changes, appointmentId) => (
  { [appointmentId]: changes }
);
