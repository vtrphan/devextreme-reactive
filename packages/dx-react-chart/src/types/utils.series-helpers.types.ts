import { GetPointTransformerFn, CreateHitTesterFn, SeriesProps } from "./index";

/** @internal */
export type Components = {
  readonly Path: React.ComponentType<any>;
  readonly Point?: React.ComponentType<any>;
};
/** @internal */
export type ExtraSeriesParameters<T extends SeriesProps = SeriesProps> = {
  components: Components;
  getPointTransformer: GetPointTransformerFn;
  createHitTester: CreateHitTesterFn;
  defaults?: Partial<T>;
};
