import { useCallback, useState } from 'react';
import API from '../api';
import { JobFilters, JobPost } from '../types/jobs';

const useGetJobs = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(
    async (queryParams: Partial<Record<keyof JobFilters, any>> = {}) => {
      try {
        setLoading(true);
        const data = await API.getJobs(queryParams);

        setJobs(data);
      } catch (error) {
        console.log(error);
        setError('An error occured while retrieving the latest jobs!');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { jobs, error, loading, fetchJobs };
};

export default useGetJobs;
