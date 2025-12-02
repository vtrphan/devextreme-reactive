import * as React from "react";
import {
  Plugin,
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  createStateHelper,
  Getters,
  ActionFn
} from "@vtrphan/dx-react-core";
import { bBoxes, getRanges } from "@vtrphan/dx-chart-core";
import { LayoutManagerProps, LayoutManagerState, BBoxesChange } from "../types";

const doGetRanges = ({ layouts, rotated }: Getters) =>
  getRanges(layouts.pane, rotated);

export class LayoutManager extends React.PureComponent<
  LayoutManagerProps,
  LayoutManagerState
> {
  changeBBox: ActionFn<BBoxesChange>;

  constructor(props: LayoutManagerProps) {
    super(props);

    this.state = { bBoxes: { pane: { width: 0, height: 0 } } };

    const stateHelper = createStateHelper(this);
    this.changeBBox = stateHelper.applyFieldReducer.bind(
      stateHelper,
      "bBoxes",
      bBoxes
    );
  }

  render() {
    const { width = 0, height, rootComponent: Root, ...restProps } = this.props;
    const { bBoxes: stateBBoxes } = this.state;

    return (
      <Plugin>
        <Getter name="layouts" value={stateBBoxes} />
        <Getter name="ranges" computed={doGetRanges} />
        <Action name="changeBBox" action={this.changeBBox} />

        <Template name="root">
          <Root width={width!} height={height} {...restProps}>
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
