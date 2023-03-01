import {
  Heading,
  Spinner,
  SimpleGrid,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import JobOpportunity from '../components/JobOpportunity';
import useGetJobs from '../hooks/useGetJobs';
import { formatTimestamp } from '../utils/dates';

const HomePage = () => {
  const { jobs, error, loading, fetchJobs } = useGetJobs();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (error) {
    return <Heading>{error}</Heading>;
  }
  if (loading) {
    return <Spinner />;
  }
  if (!jobs.length) {
    return (
      <Stack>
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
        <SimpleGrid columns={2} spacing={8} w="60%">
          {jobs.map((job) => (
            <JobOpportunity job={job} key={`${job.id}-${job.title}`} />
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
};

export default HomePage;
