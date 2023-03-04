import { Stack } from '@chakra-ui/react';
import { SelectedFilterOptions } from '../../types/jobs';
import Filters from '../Filter';

interface FilterPanelProps {
  onClearFilters: () => void;
  queryFilters: SelectedFilterOptions;
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const FilterPanel = ({
  queryFilters,
  setQueryFilters,
  onClearFilters,
}: FilterPanelProps) => {
  return (
    <Stack
      minWidth="250px"
      backgroundColor="white"
      position="relative"
      zIndex={5}
      boxShadow="1px 0 8px 1px rgba(0,0,0,0.4)"
    >
      <Filters
        onClearFilters={onClearFilters}
        queryFilters={queryFilters}
        setQueryFilters={setQueryFilters}
      />
    </Stack>
  );
};

export default FilterPanel;
