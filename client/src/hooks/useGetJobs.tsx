import { useCallback, useState } from 'react';
import { JobPost } from '../types/jobs';

const useGetJobs = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async (offset = 0) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/jobs?offset=${offset}`
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.log(error);
      setError('An error occured while retrieving the latest jobs!');
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, error, loading, fetchJobs };
};

export default useGetJobs;
