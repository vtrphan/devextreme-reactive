import * as React from 'react';
import {
  Getter,
  Plugin,
  Getters,
} from '@vtrphan/dx-react-core';
import {
  orderedColumns,
} from '@vtrphan/dx-grid-core';
import { OrderedTableColumnsProps } from '../../types';

/** @internal */
export const OrderedTableColumns: React.FunctionComponent<
  OrderedTableColumnsProps
> = ({
  order = [],
}) => {
  const columnsComputed = (
    { tableColumns }: Getters,
  ) => orderedColumns(tableColumns, order!);

  return (
    <Plugin>
      <Getter name="tableColumns" computed={columnsComputed} />
    </Plugin>
  );
};
