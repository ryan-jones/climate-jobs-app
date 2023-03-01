import {
  Heading,
  Spinner,
  SimpleGrid,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import JobOpportunity from '../components/JobOpportunity';
import useGetJobs from '../hooks/useGetJobs';
import { JobFilters } from '../types/jobs';
import { formatTimestamp } from '../utils/dates';

const HomePage = () => {
  const { jobs, error, loading, fetchJobs } = useGetJobs();
  const [queryFilters, setQueryFilters] = useState<JobFilters>({});

  useEffect(() => {
    fetchJobs(queryFilters);
  }, [fetchJobs, queryFilters]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Heading>{error}</Heading>
      </Stack>
    );
  }

  if (!jobs.length) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Heading>There are currently no jobs available</Heading>
      </Stack>
    );
  }
  return (
    <Stack spacing={8}>
      <Flex justifyContent={'flex-end'} paddingRight={4}>
        <Text>Last updated: {formatTimestamp(jobs[0].lastUpdated)}</Text>
      </Flex>

      <Flex padding={8} justifyContent="center" alignItems="center">
        <Filter queryFilters={queryFilters} setQueryFilters={setQueryFilters} />
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={8}
          w={{ base: '100%', md: '60%' }}
        >
          {jobs.map((job) => (
            <JobOpportunity
              job={job}
              key={`${job.id}-${job.title}-${job.companyName}`}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
};

export default HomePage;
