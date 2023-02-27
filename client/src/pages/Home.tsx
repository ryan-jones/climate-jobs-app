import { Heading, Spinner, SimpleGrid, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import JobOpportunity from '../components/JobOpportunity';
import useGetJobs from '../hooks/useGetJobs';

const HomePage = () => {
  const { jobs, error, loading, fetchJobs } = useGetJobs();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (error) {
    return <Heading>{error}</Heading>;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Flex padding={8} justifyContent="center" alignItems="center">
      <SimpleGrid columns={2} spacing={8} w="50%">
        {jobs.map((job) => (
          <JobOpportunity job={job} key={`${job.id}-${job.title}`} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default HomePage;
