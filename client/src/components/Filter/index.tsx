import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { SelectedFilterOptions } from '../../types/jobs';
import { JobSource } from '../../types/jobSource';
import { queryFormatter } from '../../utils/queries';
import FilterSelect from './FilterSelect';
import SectorSelect from './SectorSelect';

interface FilterProps {
  onClearFilters: () => void;
  queryFilters: SelectedFilterOptions;
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const Filters = ({
  onClearFilters,
  setQueryFilters,
  queryFilters,
}: FilterProps) => {
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
            value={queryFilters?.filters.title?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) =>
                queryFormatter(prev, {
                  title: {
                    value: event.target.value,
                    queryString: `title ILIKE '%${event.target.value}%'`,
                  },
                })
              );
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Search by Company</FormLabel>
          <Input
            placeholder="E.g. 'Climatica'"
            value={queryFilters?.filters.companyName?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) =>
                queryFormatter(prev, {
                  companyName: {
                    value: event.target.value,
                    queryString: `company_name ILIKE '%${event.target.value}%'`,
                  },
                })
              );
            }}
          />
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel>Search by Location</FormLabel>
          <Input
            placeholder="E.g. 'Remote'"
            value={queryFilters?.filters.location?.value || ''}
            onChange={(event) => {
              setQueryFilters((prev) =>
                queryFormatter(prev, {
                  location: {
                    value: event.target.value,
                    queryString: `location ILIKE '%${event.target.value}%'`,
                  },
                })
              );
            }}
          />
        </FormControl>

        <Divider />

        <FilterSelect
          name="source"
          label="Jobsite"
          placeholder="E.g. 'Climatebase'"
          value={queryFilters?.filters.source?.value || []}
          options={[
            { label: 'Climatebase', value: JobSource.ClimateBase },
            { label: 'Climate People', value: JobSource.ClimatePeople },
          ]}
          setQueryFilters={setQueryFilters}
        />

        <SectorSelect
          queryFilters={queryFilters}
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
