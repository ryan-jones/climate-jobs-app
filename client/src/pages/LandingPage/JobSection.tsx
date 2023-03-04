import { Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import JobOpportunity from '../../components/JobOpportunity';
import Loading from '../../components/Loading';
import useGetTotalJobCount from '../../hooks/useGetTotalJobCount';
import { SelectedFilterOptions, JobPost } from '../../types/jobs';

interface JobSectionProps {
  jobs: JobPost[];
  loading: boolean;
  error: string | string[] | null;
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const JobSection = ({
  loading,
  error,
  jobs,
  setQueryFilters,
}: JobSectionProps) => {
  const { totalCount } = useGetTotalJobCount();

  const lastJob = useRef<IntersectionObserver>();

  const lastJobRef = useCallback(
    (node: HTMLDivElement) => {
      if (lastJob.current) lastJob.current.disconnect();
      lastJob.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && jobs.length < totalCount) {
          setQueryFilters((prev) => ({
            ...prev,
            offset: prev.offset + 10,
          }));
        }
      });
      if (node) lastJob.current.observe(node);
    },
    [jobs, totalCount, setQueryFilters]
  );

  if (error) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Heading>{error}</Heading>
      </Stack>
    );
  }

  if (!jobs.length) {
    return loading ? (
      <Loading message="Retrieving latest jobs from all platforms" />
    ) : (
      <Stack justifyContent="center" alignItems="center">
        <Heading>There are currently no jobs available</Heading>
      </Stack>
    );
  }
  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {jobs.map((job, index: number) =>
          index === jobs.length - 4 ? (
            <JobOpportunity
              ref={lastJobRef}
              job={job}
              key={`${job.id}-${job.title}-${job.companyName}-${index}`}
            />
          ) : (
            <JobOpportunity
              job={job}
              key={`${job.id}-${job.title}-${job.companyName}-${index}`}
            />
          )
        )}
      </SimpleGrid>
      {loading && <Loading message="Retrieving more jobs" />}
      {jobs.length - 1 === totalCount && (
        <Stack justifyContent="center" alignItems="center">
          <Heading>All jobs have been loaded!</Heading>
        </Stack>
      )}
    </>
  );
};

export default JobSection;
