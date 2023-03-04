import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

const useDebouncedValue = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isEqual(value, debouncedValue)) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);
  return debouncedValue;
};

export default useDebouncedValue;
