import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import useDebouncedValue from '../../hooks/useDebounce';
import {
  FilterOptions,
  JobFilterQueryValues,
  JobFilters,
} from '../../types/jobs';
import { JobSource } from '../../types/jobSource';
import FilterSelect from './FilterSelect';
import SectorSelect from './SectorSelect';

interface FilterProps {
  onSubmitQueryWithFilters: (queryParams: JobFilterQueryValues) => void;
}
const Filters = ({ onSubmitQueryWithFilters }: FilterProps) => {
  const [queryFilters, setQueryFilters] = useState<FilterOptions>({});
  const debouncedQueryFilters = useDebouncedValue(queryFilters, 1000);

  useEffect(() => {
    const queryResult = Object.entries(debouncedQueryFilters).reduce(
      (queryObj: Partial<Record<keyof JobFilters, any>>, [key, value]) => {
        queryObj[key as keyof JobFilters] = value.queryString;
        return queryObj;
      },
      {}
    );

    onSubmitQueryWithFilters(queryResult);
  }, [debouncedQueryFilters, onSubmitQueryWithFilters]);

  const onClearFilters = () => {
    setQueryFilters({});
  };

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      height="100%"
      padding={4}
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Search by Job Title</FormLabel>
          <Input
            placeholder="E.g. 'Fullstack Developer'"
            value={queryFilters?.title?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) => ({
                ...prev,
                title: {
                  value: event.target.value,
                  queryString: `title ILIKE '%${event.target.value}%'`,
                },
              }));
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Search by Company</FormLabel>
          <Input
            placeholder="E.g. 'Climatica'"
            value={queryFilters?.companyName?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) => ({
                ...prev,
                companyName: {
                  value: event.target.value,
                  queryString: `company_name ILIKE '%${event.target.value}%'`,
                },
              }));
            }}
          />
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel>Search by Location</FormLabel>
          <Input
            placeholder="E.g. 'Remote'"
            value={queryFilters?.location?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) => ({
                ...prev,
                location: {
                  value: event.target.value,
                  queryString: `location ILIKE '%${event.target.value}%'`,
                },
              }));
            }}
          />
        </FormControl>

        <Divider />

        <FilterSelect
          name="source"
          label="Jobsite"
          placeholder="E.g. 'Climatebase'"
          value={queryFilters?.source?.value || []}
          options={[
            { label: 'Climatebase', value: JobSource.ClimateBase },
            { label: 'Climate People', value: JobSource.ClimatePeople },
          ]}
          setQueryFilters={setQueryFilters}
        />

        <SectorSelect
          filters={queryFilters}
          setQueryFilters={setQueryFilters}
        />
      </Stack>
      <Button colorScheme="red" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </Flex>
  );
};

export default Filters;
