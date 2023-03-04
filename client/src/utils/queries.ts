import { SelectedFilterOptions } from '../types/jobs';

export const queryFormatter = (
  prev: SelectedFilterOptions,
  filter: SelectedFilterOptions['filters']
): SelectedFilterOptions => ({
  ...prev,
  filters: {
    ...prev.filters,
    ...filter,
  },
  offset: 0,
});
