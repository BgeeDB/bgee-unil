import { useLocation } from 'react-router-dom';

const useQuery = (key) => {
  const query = new URLSearchParams(useLocation().search);

  return key ? query.get(key) : query;
};

export default useQuery;
