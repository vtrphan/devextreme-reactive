import * as React from "react";
import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  Getters,
  PluginComponents
} from "@vtrphan/dx-react-core";
import { getLegendItems } from "@vtrphan/dx-chart-core";
import { Marker } from "../templates/legend/marker";
import { LegendProps } from "../types";

const defaultGetItems = ({ series }: Getters) => getLegendItems(series);

const RawLegend: React.FC<LegendProps> & { components: PluginComponents } = ({
  markerComponent: MarkerComponent,
  labelComponent: Label,
  rootComponent: Root,
  itemComponent: Item,
  position = "right",
  getItems = defaultGetItems
}) => {
  const placeholder = position;
  return (
    <Plugin name="Legend">
      <Template name={placeholder}>
        <TemplatePlaceholder />
        <TemplateConnector>
          {getters => (
            <Root name={`legend-${placeholder}`}>
              {getItems(getters).map(({ text, color }) => (
                <Item key={text}>
                  <MarkerComponent name={text} color={color} />
                  <Label text={text} />
                </Item>
              ))}
            </Root>
          )}
        </TemplateConnector>
      </Template>
    </Plugin>
  );
};

RawLegend.components = {
  rootComponent: "Root",
  itemComponent: "Item",
  markerComponent: "Marker",
  labelComponent: "Label"
};

export const Legend: React.ComponentType<LegendProps> = withComponents({
  Marker
})(RawLegend);
