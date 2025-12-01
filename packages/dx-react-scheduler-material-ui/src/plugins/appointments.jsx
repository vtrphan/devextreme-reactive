import Repeat from '@mui/icons-material/Repeat';
import { withComponents } from '@vtrphan/dx-react-core';
import { Appointments as AppointmentsBase } from '@vtrphan/dx-react-scheduler';
import { AppointmentContent } from '../templates/appointment/appointment-content';
import { Appointment } from '../templates/appointment/appointment';
import { SplitIndicator } from '../templates/appointment/split-indicator';
import { AppointmentContainer as Container } from '../templates/appointment/appointment-container';

export const Appointments = withComponents({
  Appointment,
  AppointmentContent,
  Container,
  SplitIndicator,
  RecurringIcon: Repeat,
})(AppointmentsBase);
