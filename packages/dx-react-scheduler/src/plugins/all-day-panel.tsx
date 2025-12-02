import * as React from "react";
import { getMessagesFormatter, memoize } from "@vtrphan/dx-core";
import {
  Getter,
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents
} from "@vtrphan/dx-react-core";
import {
  allDayCells,
  calculateAllDayDateIntervals,
  VERTICAL_GROUP_ORIENTATION,
  VIEW_TYPES
} from "@vtrphan/dx-scheduler-core";
import moment from "moment";

import { AllDayPanelProps, AllDayPanelState } from "../types";

const isMonthView = currentView => currentView.type === VIEW_TYPES.MONTH;
const isVerticalGrouping = (currentView, groupOrientation) =>
  groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION;

const pluginDependencies = [
  { name: "DayView", optional: true },
  { name: "WeekView", optional: true }
];
const defaultMessages = {
  allDay: "All Day"
};
const AllDayAppointmentLayerPlaceholder = () => (
  <TemplatePlaceholder name="allDayAppointmentLayer" />
);
const AllDayPanelPlaceholder = params => (
  <TemplatePlaceholder name="allDayPanel" params={params} />
);
const CellPlaceholder = params => (
  <TemplatePlaceholder name="allDayPanelCell" params={params} />
);
const AllDayTitlePlaceholder = params => (
  <TemplatePlaceholder name="allDayTitle" params={params} />
);

const AllDayPanelBase: React.FC<AllDayPanelProps> & {
  components: PluginComponents;
} = ({
  appointmentLayerComponent: AppointmentLayer,
  layoutComponent: Layout,
  cellComponent: Cell,
  rowComponent,
  titleCellComponent: TitleCell,
  containerComponent: Container,
  messages = {}
}) => {
  const [elementsMeta, setElementsMeta] = React.useState<
    AllDayPanelState["elementsMeta"]
  >({});
  const [layoutKey, setLayoutKey] = React.useState<
    AllDayPanelState["layoutKey"]
  >(() => Math.random());
  const previousCellRef = React.useRef<AllDayPanelState["previousCell"]>(Cell);

  React.useEffect(() => {
    if (previousCellRef.current !== Cell) {
      previousCellRef.current = Cell;
      setLayoutKey(Math.random());
    }
  }, [Cell]);

  const allDayCellsDataComputed = React.useMemo(
    () => memoize(({ viewCellsData }) => allDayCells(viewCellsData)),
    []
  );
  const updateCellElementsMeta = React.useMemo(
    () =>
      memoize(cellElementsMeta => {
        setElementsMeta(cellElementsMeta);
      }),
    [setElementsMeta]
  );
  const allDayAppointmentsComputed = React.useMemo(
    () =>
      memoize(({ appointments, startViewDate, endViewDate, excludedDays }) => {
        const allDayLeftBound = moment(startViewDate)
          .hours(0)
          .minutes(0)
          .toDate();
        const allDayRightBound = moment(endViewDate)
          .hours(23)
          .minutes(59)
          .toDate();
        return calculateAllDayDateIntervals(
          appointments,
          allDayLeftBound,
          allDayRightBound,
          excludedDays
        );
      }),
    []
  );
  const allDayPanelExistsComputed = React.useMemo(
    () => memoize(({ currentView }) => !isMonthView(currentView)),
    []
  );
  const getMessageFormatter = React.useMemo(
    () =>
      memoize((messagesMap, allDayPanelDefaultMessages) =>
        getMessagesFormatter({ ...allDayPanelDefaultMessages, ...messagesMap })
      ),
    []
  );
  const getMessage = getMessageFormatter(messages, defaultMessages);

  return (
    <Plugin name="AllDayPanel" dependencies={pluginDependencies}>
      <Getter name="allDayElementsMeta" value={elementsMeta} />
      <Getter name="allDayCellsData" computed={allDayCellsDataComputed} />
      <Getter name="allDayPanelExists" computed={allDayPanelExistsComputed} />
      <Getter name="allDayAppointments" computed={allDayAppointmentsComputed} />

      <Template name="timeTable">
        {(params: any) => (
          <TemplateConnector>
            {({ currentView, groupOrientation, allDayCellsData }) => {
              if (
                isMonthView(currentView) ||
                !isVerticalGrouping(currentView, groupOrientation)
              ) {
                return <TemplatePlaceholder params={params} />;
              }
              return (
                <>
                  <TemplatePlaceholder
                    params={{
                      ...params,
                      allDayCellComponent: CellPlaceholder,
                      allDayRowComponent: rowComponent,
                      allDayCellsData
                    }}
                  />
                  <AppointmentLayer>
                    <AllDayAppointmentLayerPlaceholder />
                  </AppointmentLayer>
                </>
              );
            }}
          </TemplateConnector>
        )}
      </Template>

      <Template name="dayScaleEmptyCell">
        <TemplateConnector>
          {({ currentView, groupOrientation }) => {
            if (
              isMonthView(currentView) ||
              isVerticalGrouping(currentView, groupOrientation)
            ) {
              return <TemplatePlaceholder />;
            }

            return <AllDayTitlePlaceholder />;
          }}
        </TemplateConnector>
      </Template>

      <Template name="timeScale">
        {(params: any) => (
          <TemplateConnector>
            {({ currentView, groupOrientation }) => {
              if (
                isMonthView(currentView) ||
                !isVerticalGrouping(currentView, groupOrientation)
              ) {
                return <TemplatePlaceholder params={params} />;
              }

              return (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    allDayTitleComponent: AllDayTitlePlaceholder,
                    showAllDayTitle: true
                  }}
                />
              );
            }}
          </TemplateConnector>
        )}
      </Template>

      <Template name="dayScale">
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ currentView, groupOrientation }) => {
            if (
              isMonthView(currentView) ||
              isVerticalGrouping(currentView, groupOrientation)
            ) {
              return null;
            }

            return (
              <Container>
                <AllDayPanelPlaceholder />
              </Container>
            );
          }}
        </TemplateConnector>
      </Template>

      <Template name="allDayPanel">
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ currentView, formatDate, allDayCellsData }) => {
            if (currentView.type === VIEW_TYPES.MONTH) return null;

            return (
              <>
                <Layout
                  cellComponent={CellPlaceholder}
                  rowComponent={rowComponent}
                  cellsData={allDayCellsData[0]}
                  setCellElementsMeta={updateCellElementsMeta}
                  formatDate={formatDate}
                  key={layoutKey}
                />
                <AppointmentLayer>
                  <AllDayAppointmentLayerPlaceholder />
                </AppointmentLayer>
              </>
            );
          }}
        </TemplateConnector>
      </Template>

      <Template name="allDayTitle">
        {(params: any) => <TitleCell getMessage={getMessage} {...params} />}
      </Template>
      <Template name="allDayPanelCell">
        {(params: any) => <Cell {...params} />}
      </Template>
    </Plugin>
  );
};

AllDayPanelBase.components = {
  appointmentLayerComponent: "AppointmentLayer",
  layoutComponent: "Layout",
  layoutContainerComponent: "LayoutContainer",
  cellComponent: "Cell",
  rowComponent: "Row",
  titleCellComponent: "TitleCell",
  containerComponent: "Container"
};

/** A plugin that renders the All Day Panel. */
export const AllDayPanel: React.ComponentType<AllDayPanelProps> = AllDayPanelBase;
