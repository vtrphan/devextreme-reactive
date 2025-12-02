import * as React from "react";
import { Plugin, Getter, Getters } from "@vtrphan/dx-react-core";
import { getStackedSeries, getStackedDomains } from "@vtrphan/dx-chart-core";
import { StackProps, StacksOptions, OffsetFn, OrderFn } from "../types";
import { stackOrderNone, stackOffsetDiverging } from "d3-shape";

const getDomains = ({ domains, series }: Getters) =>
  getStackedDomains(domains, series);

const StackBase: React.FC<StackProps> = ({
  stacks = [],
  offset = stackOffsetDiverging as OffsetFn,
  order = stackOrderNone as OrderFn
}) => {
  const params = React.useMemo<StacksOptions>(
    () => ({
      stacks,
      offset,
      order
    }),
    [stacks, offset, order]
  );
  const getSeries = React.useCallback(
    ({ series, data }: Getters) => getStackedSeries(series, data, params),
    [params]
  );

  return (
    <Plugin name="Stack">
      <Getter name="series" computed={getSeries} />
      <Getter name="domains" computed={getDomains} />
    </Plugin>
  );
};

export const Stack: React.ComponentType<StackProps> = StackBase;
