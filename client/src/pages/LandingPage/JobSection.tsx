import { Heading, SimpleGrid, Spinner, Stack } from '@chakra-ui/react';
import JobOpportunity from '../../components/JobOpportunity';
import { JobPost } from '../../types/jobs';

interface JobSectionProps {
  jobs: JobPost[];
  loading: boolean;
  error: string | string[] | null;
}
const JobSection = ({ loading, error, jobs }: JobSectionProps) => {
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
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
      {jobs.map((job) => (
        <JobOpportunity
          job={job}
          key={`${job.id}-${job.title}-${job.companyName}`}
        />
      ))}
    </SimpleGrid>
  );
};

export default JobSection;
