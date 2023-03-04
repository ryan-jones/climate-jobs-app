import { useEffect, useState } from 'react';
import API from '../api';

const useGetTotalJobCount = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | string[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const count = await API.getTotalCount();
        setTotalCount(count);
      } catch (error) {
        setError('An error occured while retrieving the latest jobs!');
        return 0;
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { totalCount, loading, error };
};

export default useGetTotalJobCount;
