import { useCallback, useState } from 'react';
import API from '../api';
import { JobFilters, JobPost } from '../types/jobs';

const useGetJobs = () => {
  const [error, setError] = useState<string | string[] | null>(null);
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(
    async (
      queryParams: Partial<Record<keyof JobFilters | 'offset', any>> = {},
      reset = false
    ) => {
      try {
        setLoading(true);
        const data = await API.getJobs(queryParams);
        if (reset) {
          setJobs(data);
        } else {
          setJobs((prev) => [...prev, ...data]);
        }
      } catch (error) {
        setError('An error occured while retrieving the latest jobs!');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { jobs, fetchJobs, loading, error };
};

export default useGetJobs;
