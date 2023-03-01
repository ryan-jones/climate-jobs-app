import { Stack } from '@chakra-ui/react';
import { JobFilters } from '../../types/jobs';

interface FilterProps {
  queryFilters: JobFilters;
  setQueryFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
}
const Filter = ({ queryFilters, setQueryFilters }: FilterProps) => {
  return <Stack></Stack>;
};

export default Filter;
