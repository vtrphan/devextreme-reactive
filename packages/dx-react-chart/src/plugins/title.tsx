import * as React from "react";

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents
} from "@vtrphan/dx-react-core";
import { TitleProps } from "../types";

const TitleBase: React.FC<TitleProps> & { components: PluginComponents } = ({
  textComponent: Text,
  text,
  position = "top"
}) => (
  <Plugin name="Title">
    <Template name={position}>
      <TemplatePlaceholder />
      <Text text={text} />
    </Template>
  </Plugin>
);

TitleBase.components = {
  textComponent: "Text"
};

export const Title: React.ComponentType<TitleProps> = TitleBase;
