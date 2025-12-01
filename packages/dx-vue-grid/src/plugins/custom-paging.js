import { DxGetter, DxPlugin } from '@vtrphan/dx-vue-core';

const pluginDependencies = [
  { name: 'DxPagingState' },
];

export const DxCustomPaging = {
  name: 'DxCustomPaging',
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
  },

  render() {
    const { totalCount } = this;

    return (
      <DxPlugin
        name="DxCustomPaging"
        dependencies={pluginDependencies}
      >
        <DxGetter name="totalCount" value={totalCount} />
      </DxPlugin>
    );
  },
};
