import { FormControl, FormLabel } from '@chakra-ui/react';
import { ActionMeta, Select } from 'chakra-react-select';
import { SelectedFilterOptions, JobFilters } from '../../types/jobs';
import { queryFormatter } from '../../utils/queries';

const convertToQueryClause = (name: string, selected: readonly Option[]) => {
  const stringifiedArray = selected.reduce(
    (text: string, item: Option, index: number) => {
      return `${text} '${item.value}'${index < selected.length - 1 ? ',' : ''}`;
    },
    ''
  );
  return `${name} IN (${stringifiedArray})`;
};

export type Option = { value: string | number; label: string };

interface FilterSelectProps {
  label: string;
  name: keyof JobFilters;
  value: Option[];
  placeholder: string;
  options: Option[];
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const FilterSelect = ({
  name,
  label,
  value,
  options,
  placeholder,
  setQueryFilters,
}: FilterSelectProps) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Select
      useBasicStyles
      isMulti
      placeholder={placeholder}
      value={value}
      options={options as any}
      onChange={(
        selected: readonly Option[],
        actionMeta: ActionMeta<Option>
      ) => {
        setQueryFilters((prev) =>
          queryFormatter(prev, {
            [name]: {
              value: selected,
              queryString: convertToQueryClause(name, selected),
            },
          })
        );
      }}
    />
  </FormControl>
);

export default FilterSelect;
