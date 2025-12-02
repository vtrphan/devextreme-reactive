import * as React from "react";
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  PluginComponents,
  onSizeChangeFn,
  Getter
} from "@vtrphan/dx-react-core";
import {
  ARGUMENT_DOMAIN,
  getValueDomainName,
  getRotatedPosition,
  isValidPosition,
  LEFT,
  BOTTOM,
  getTickCoordinates,
  gridCoordinatesGetter,
  tickCoordinatesGetter,
  Tick,
  Grid
} from "@vtrphan/dx-chart-core";
import { RawAxisProps } from "../types";
import { Root } from "../templates/axis/root";
import { Label } from "../templates/axis/label";
import { Line } from "../templates/axis/line";

import { withPatchedProps } from "../utils";

const SVG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  overflow: "visible"
};

const RawAxis: React.FC<RawAxisProps> & { components: PluginComponents } = ({
  scaleName,
  tickSize = 5,
  tickFormat,
  indentFromAxis = 10,
  showTicks,
  showLine,
  showLabels,
  showGrid,
  position,
  rootComponent: RootComponent,
  tickComponent: TickComponent,
  labelComponent: LabelComponent,
  lineComponent: LineComponent,
  gridComponent: GridComponent
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const adjustedWidthRef = React.useRef(0);
  const adjustedHeightRef = React.useRef(0);

  const renderAxis = (currentPosition: string) => {
    const placeholder = `${currentPosition}-axis`;
    const layoutName = `${placeholder}-${scaleName}`;
    return (
      <Template name={placeholder}>
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ scales, layouts, rotated }, { changeBBox }) => {
            if (!isValidPosition(currentPosition!, scaleName!, rotated)) {
              return null;
            }
            const scale = scales[scaleName!];
            if (!scale) {
              return null;
            }
            const { width, height } = layouts[layoutName] || {
              width: 0,
              height: 0
            };
            const paneSize = layouts.pane;

            const {
              sides: [dx, dy],
              ticks
            } = getTickCoordinates({
              callback: tickCoordinatesGetter,
              scaleName: scaleName!,
              position: currentPosition!,
              tickSize: tickSize!,
              tickFormat,
              indentFromAxis: indentFromAxis!,
              scale,
              paneSize: [paneSize.width, paneSize.height],
              rotated
            });

            const handleSizeChange: onSizeChangeFn = size => {
              const rect = rootRef.current!.getBoundingClientRect();
              const rectSize = [
                dx ? rect.width : size.width,
                dy ? rect.height : size.height
              ];

              if (
                rectSize[0] === adjustedWidthRef.current &&
                rectSize[1] === adjustedHeightRef.current
              ) {
                return;
              }
              adjustedWidthRef.current = rectSize[0];
              adjustedHeightRef.current = rectSize[1];
              changeBBox({ placeholder: layoutName, bBox: size });
            };

            return (
              <div
                style={{
                  position: "relative",
                  width: dy * width || undefined,
                  height: dx * height || undefined,
                  flexGrow: dx || undefined
                }}
                ref={rootRef}
              >
                <svg
                  width={adjustedWidthRef.current}
                  height={adjustedHeightRef.current}
                  style={SVG_STYLE}
                >
                  <RootComponent
                    dx={dx}
                    dy={dy}
                    onSizeChange={handleSizeChange}
                  >
                    {showTicks &&
                      (ticks as Tick[]).map(({ x1, x2, y1, y2, key }) => (
                        <TickComponent
                          key={key}
                          x1={x1}
                          x2={x2}
                          y1={y1}
                          y2={y2}
                        />
                      ))}
                    {showLine && (
                      <LineComponent
                        x1={0}
                        x2={dx * paneSize.width}
                        y1={0}
                        y2={dy * paneSize.height}
                      />
                    )}
                    {showLabels &&
                      (ticks as Tick[]).map(
                        ({
                          text,
                          xText,
                          yText,
                          dy: delta,
                          textAnchor,
                          key
                        }) => (
                          <LabelComponent
                            key={key}
                            text={text}
                            x={xText}
                            y={yText}
                            dy={delta}
                            textAnchor={textAnchor}
                          />
                        )
                      )}
                  </RootComponent>
                </svg>
              </div>
            );
          }}
        </TemplateConnector>
      </Template>
    );
  };

  const renderGrid = () => (
    <Template name="series">
      <TemplatePlaceholder />
      <TemplateConnector>
        {({ scales, layouts, rotated }) => {
          const scale = scales[scaleName!];
          if (!scale || !showGrid) {
            return null;
          }
          const { width, height } = layouts.pane;
          const {
            ticks,
            sides: [dx, dy]
          } = getTickCoordinates({
            callback: gridCoordinatesGetter,
            scaleName: scaleName!,
            scale,
            paneSize: [width, height],
            rotated
          });
          return (
            <React.Fragment>
              {(ticks as Grid[]).map(({ key, x1, y1 }) => (
                <GridComponent
                  key={key}
                  x1={x1}
                  x2={x1 + dy * width}
                  y1={y1}
                  y2={y1 + dx * height}
                />
              ))}
            </React.Fragment>
          );
        }}
      </TemplateConnector>
    </Template>
  );

  const rotatedPosition = getRotatedPosition(position!);
  return (
    <Plugin name="Axis">
      <Getter name="axesExist" value />
      {renderAxis(position!)}
      {renderAxis(rotatedPosition)}
      {renderGrid()}
    </Plugin>
  );
};

RawAxis.components = {
  rootComponent: "Root",
  tickComponent: "Tick",
  labelComponent: "Label",
  lineComponent: "Line",
  gridComponent: "Grid"
};
/** @internal */
export const Axis: React.ComponentType<RawAxisProps> = withComponents({
  Label,
  Line,
  Root,
  Tick: Line,
  Grid: Line
})(RawAxis);

// TODO: It is not axis who defines that argument is HORIZONTAL and value is VERTICAL.

// TODO: *position* should not be *orientation* dependent -
// if HORIZONTAL then TOP or BOTTOM, otherwise LEFT of RIGHT.
// It should be domain dependent - something like AT_DOMAIN_START or AT_DOMAIN_END.

export const ArgumentAxis: React.ComponentType<RawAxisProps> = withPatchedProps(
  props => ({
    position: BOTTOM,
    showGrid: false,
    showTicks: true,
    showLine: true,
    showLabels: true,
    ...props,
    scaleName: ARGUMENT_DOMAIN
  })
)(Axis);

export const ValueAxis: React.ComponentType<RawAxisProps> = withPatchedProps(
  props => ({
    position: LEFT,
    showGrid: true,
    showTicks: false,
    showLine: false,
    showLabels: true,
    ...props,
    scaleName: getValueDomainName((props as RawAxisProps).scaleName)
  })
)(Axis);
