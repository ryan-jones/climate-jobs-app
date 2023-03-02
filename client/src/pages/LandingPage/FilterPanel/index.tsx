import { Stack } from '@chakra-ui/react';
import { JobFilterQueryValues } from '../../../types/jobs';
import Filters from '../../../components/Filter';

interface FilterPanelProps {
  onSubmitQueryWithFilters: (queryParams: JobFilterQueryValues) => void;
}
const FilterPanel = ({ onSubmitQueryWithFilters }: FilterPanelProps) => {
  return (
    <Stack
      minWidth="250px"
      backgroundColor="white"
      position="relative"
      zIndex={5}
      boxShadow="1px 0 8px 1px rgba(0,0,0,0.4)"
    >
      <Filters onSubmitQueryWithFilters={onSubmitQueryWithFilters} />
    </Stack>
  );
};

export default FilterPanel;
