import { useState, useEffect } from 'react';
import API from '../api';

const useGetSectors = () => {
  const [sectors, setSectors] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await API.getSectors();
        setSectors(data);
      } catch (error) {
        setError('An error occured while retrieving sectors');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { sectors, error, loading };
};

export default useGetSectors;
