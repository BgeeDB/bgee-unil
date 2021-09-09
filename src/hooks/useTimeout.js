import { useEffect } from 'react';

/**
 * useTimeout hook
 */
const useTimeout = (fn, delay) => {
  useEffect(() => {
    const id = setTimeout(fn, delay);
    return () => clearTimeout(id);
  });
};

export default useTimeout;
