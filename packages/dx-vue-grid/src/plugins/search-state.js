import { DxGetter, DxAction, DxPlugin } from '@vtrphan/dx-vue-core';
import { changeSearchValue, searchFilterExpression } from '@vtrphan/dx-grid-core';

export const DxSearchState = {
  name: 'DxSearchState',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeValue(payload) {
      this.$emit(
        'update:value',
        changeSearchValue(this.value, payload),
      );
    },
  },
  render() {
    const { value, changeValue } = this;
    const filterExpressionComputed = (
      { filterExpression, columns },
    ) => searchFilterExpression(value, columns, filterExpression);

    return (
      <DxPlugin
        name="DxSearchState"
      >
        <DxGetter name="filterExpression" computed={filterExpressionComputed} />
        <DxGetter name="searchValue" value={value} />
        <DxAction name="changeSearchValue" action={changeValue} />
      </DxPlugin>
    );
  },
};
