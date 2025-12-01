import { DxGetter, DxAction, DxPlugin } from '@vtrphan/dx-vue-core';
import { toggleDetailRowExpanded } from '@vtrphan/dx-grid-core';

export const DxRowDetailState = {
  name: 'DxRowDetailState',
  props: {
    expandedRowIds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleDetailRowExpanded(payload) {
      this.$emit(
        'update:expandedRowIds',
        toggleDetailRowExpanded(this.expandedRowIds, payload),
      );
    },
  },
  render() {
    return (
      <DxPlugin
        name="DxRowDetailState"
      >
        <DxGetter name="expandedDetailRowIds" value={this.expandedRowIds} />
        <DxAction name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </DxPlugin>
    );
  },
};
