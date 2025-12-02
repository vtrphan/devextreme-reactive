import * as React from "react";
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
  withComponents,
  Getters,
  PluginComponents
} from "@vtrphan/dx-react-core";
import {
  findSeriesByName,
  addSeries,
  extendDomains,
  getValueDomainName,
  ARGUMENT_DOMAIN
} from "@vtrphan/dx-chart-core";
import {
  ExtraSeriesParameters,
  SeriesProps,
  PathComponentProps,
  Scales
} from "../types";

/** @internal */
export const declareSeries = <T extends SeriesProps>(
  pluginName: string,
  {
    components,
    getPointTransformer,
    createHitTester,
    defaults
  }: ExtraSeriesParameters<T>
): React.ComponentType<T> => {
  const defaultComponentProps: Partial<T> = {
    name: "defaultSeriesName" as T["name"],
    ...(defaults || {})
  };

  const applyDefaultProps = (props: T): T => {
    if (!defaultComponentProps) {
      return props;
    }
    const result = { ...props } as T;
    (Object.keys(defaultComponentProps) as Array<keyof T>).forEach(key => {
      if (result[key] === undefined) {
        result[key] = defaultComponentProps[key] as T[keyof T];
      }
    });
    return result;
  };

  const Component: React.FC<T> & { components: PluginComponents } = props => {
    const computedProps = applyDefaultProps(props);
    const {
      name,
      argumentField,
      valueField,
      scaleName,
      seriesComponent,
      pointComponent,
      color,
      ...restProps
    } = computedProps;
    const symbolName = Symbol(name!);
    const seriesItem = {
      getPointTransformer,
      createHitTester,
      ...computedProps,
      symbolName
    };
    const getSeries = ({ series, data, palette }: Getters) =>
      addSeries(series, data, palette, seriesItem, restProps);
    const getDomains = ({ series, domains }: Getters) =>
      extendDomains(domains, findSeriesByName(symbolName, series));
    return (
      <Plugin name={pluginName}>
        <Getter name="series" computed={getSeries} />
        <Getter name="domains" computed={getDomains} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              series,
              scales,
              animation,
              rotated,
              layouts,
              clipPathId,
              readyToRenderSeries
            }) => {
              const { pane } = layouts;
              const currentSeries = findSeriesByName(symbolName, series);
              const currentScales: Scales = {
                argScale: scales[ARGUMENT_DOMAIN],
                valScale: scales[getValueDomainName(currentSeries!.scaleName)]
              };
              const Path: React.ComponentType<PathComponentProps> = currentSeries.seriesComponent as any;
              return (
                <Path
                  index={currentSeries.index}
                  pointComponent={currentSeries.pointComponent}
                  coordinates={currentSeries.points as any}
                  rotated={rotated}
                  state={currentSeries.state}
                  color={currentSeries.color}
                  scales={currentScales}
                  pane={pane}
                  clipPathId={clipPathId}
                  animation={animation}
                  readyToRenderSeries={readyToRenderSeries}
                />
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  };

  Component.components = {};
  if (components.Path) {
    Component.components.seriesComponent = "Path";
  }
  if (components.Point) {
    Component.components.pointComponent = "Point";
  }
  return withComponents(components)(Component);
};
