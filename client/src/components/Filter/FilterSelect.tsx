import { FormControl, FormLabel } from '@chakra-ui/react';
import { ActionMeta, Select } from 'chakra-react-select';
import { FilterOptions, JobFilters } from '../../types/jobs';

const convertToQueryClause = (name: string, selected: readonly Option[]) => {
  const stringifiedArray = selected.reduce(
    (text: string, item: Option, index: number) => {
      return `${text} '${item.value}'${index < selected.length - 1 ? ',' : ''}`;
    },
    ''
  );
  return `${name} IN (${stringifiedArray})`;
};

type Option = { value: string; label: string };

interface FilterSelectProps {
  label: string;
  name: keyof JobFilters;
  value: Option[];
  placeholder: string;
  options: Option[];
  setQueryFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
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
        setQueryFilters((prev) => ({
          ...prev,
          [name]: {
            value: selected,
            queryString: convertToQueryClause(name, selected),
          },
        }));
      }}
    />
  </FormControl>
);

export default FilterSelect;
