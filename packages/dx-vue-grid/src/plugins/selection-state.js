import { DxGetter, DxAction, DxPlugin } from '@vtrphan/dx-vue-core';
import { toggleSelection } from '@vtrphan/dx-grid-core';

export const DxSelectionState = {
  name: 'DxSelectionState',
  props: {
    selection: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleSelection(payload) {
      this.$emit(
        'update:selection',
        toggleSelection(this.selection, payload),
      );
    },
  },
  render() {
    return (
      <DxPlugin
        name="DxSelectionState"
      >
        <DxGetter name="selection" value={this.selection} />
        <DxAction name="toggleSelection" action={this.toggleSelection} />
      </DxPlugin>
    );
  },
};
