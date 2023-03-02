import { Flex, Stack, Text, Hide, Show } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import FilterPanel from './FilterPanel';
import useGetJobs from '../../hooks/useGetJobs';
import { JobFilterQueryValues } from '../../types/jobs';
import { formatTimestamp } from '../../utils/dates';
import JobSection from './JobSection';
import FilterDrawer from './FilterDrawer';

const HomePage = () => {
  const { jobs, error, loading, fetchJobs } = useGetJobs();
  const hasMadeInitialFetch = useRef(false);

  useEffect(() => {
    if (!hasMadeInitialFetch.current) {
      hasMadeInitialFetch.current = true;
      fetchJobs();
    }
  }, [fetchJobs]);

  const onSubmitQueryWithFilters = useCallback(
    (queryParams: JobFilterQueryValues) => {
      fetchJobs(queryParams);
    },
    [fetchJobs]
  );

  return (
    <Flex direction="row" height="calc(100% - 83px)">
      <Hide below="md">
        <FilterPanel onSubmitQueryWithFilters={onSubmitQueryWithFilters} />
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
            <FilterDrawer onSubmitQueryWithFilters={onSubmitQueryWithFilters} />
          </Show>
          <JobSection jobs={jobs} loading={loading} error={error} />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default HomePage;
