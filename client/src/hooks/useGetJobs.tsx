import { useCallback, useState } from 'react';
import { JobPost } from '../types/jobs';

const useGetJobs = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async (queryParams: Record<string, any>) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/jobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryParams),
        }
      );
      const data = await response.json();
      const formattedData = data.map((row: Record<string, any>) => ({
        id: row.id,
        source: row.source,
        href: row.href,
        companyName: row.company_name,
        title: row.title,
        location: row.location,
        salary: row.salary,
        posted: row.posted,
        sectors: row.sectors,
        lastUpdated: row.last_updated,
      }));
      setJobs(formattedData);
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
