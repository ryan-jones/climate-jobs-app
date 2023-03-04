import { Flex, Stack, Text, Hide, Show } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FilterPanel from '../../components/FilterPanel';
import { SelectedFilterOptions, JobFilters } from '../../types/jobs';
import { formatTimestamp } from '../../utils/dates';
import JobSection from './JobSection';
import FilterDrawer from '../../components/FilterDrawer';
import useDebouncedValue from '../../hooks/useDebounce';
import useGetJobs from '../../hooks/useGetJobs';

const DEFAULT_QUERY_FILTERS = { filters: {}, offset: 0 };
const buildQueryResult = (
  queryFilters: SelectedFilterOptions
): Partial<Record<keyof JobFilters, any>> => {
  return Object.entries(queryFilters.filters).reduce(
    (queryObj: Partial<Record<keyof JobFilters, any>>, [key, value]) => {
      queryObj[key as keyof JobFilters] = value.queryString;
      return queryObj;
    },
    { offset: queryFilters.offset }
  );
};

const LandingPage = () => {
  const { jobs, loading, error, fetchJobs } = useGetJobs();
  const [queryFilters, setQueryFilters] = useState<SelectedFilterOptions>(
    DEFAULT_QUERY_FILTERS
  );
  const debouncedQueryFilters = useDebouncedValue(queryFilters, 1000);

  useEffect(() => {
    const queryResult = buildQueryResult(debouncedQueryFilters);
    fetchJobs(queryResult, debouncedQueryFilters.offset === 0);
  }, [fetchJobs, debouncedQueryFilters]);

  const onClearFilters = () => {
    setQueryFilters(DEFAULT_QUERY_FILTERS);
  };

  return (
    <Flex direction="row" height="calc(100% - 83px)">
      <Hide below="md">
        <FilterPanel
          onClearFilters={onClearFilters}
          queryFilters={queryFilters}
          setQueryFilters={setQueryFilters}
        />
      </Hide>

      <Stack
        spacing={8}
        padding={4}
        width="100%"
        overflowY="scroll"
        backgroundColor={'#FAF7F0'}
      >
        <Flex justifyContent={'flex-end'} paddingRight={4}>
          {jobs[0] && (
            <Text>Last updated: {formatTimestamp(jobs[0].lastUpdated)}</Text>
          )}
        </Flex>

        <Stack
          padding={{ base: 4, md: 8 }}
          spacing={8}
          alignSelf="center"
          width="100%"
        >
          <Show below="md">
            <FilterDrawer
              onClearFilters={onClearFilters}
              queryFilters={queryFilters}
              setQueryFilters={setQueryFilters}
            />
          </Show>
          <JobSection
            jobs={jobs}
            loading={loading}
            error={error}
            setQueryFilters={setQueryFilters}
          />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LandingPage;
