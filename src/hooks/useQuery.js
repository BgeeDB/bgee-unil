import { useLocation } from 'react-router-dom';

const useQuery = (key) => {
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);

  return key ? query.get(key) : query;
};

export default useQuery;
