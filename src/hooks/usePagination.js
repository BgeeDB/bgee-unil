import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const PARAM_PAGE_KEY = 'page';
const PARAM_PAGE_SIZE_KEY = 'page_size';

const usePagination = (perPage = 10) => {
  const { search } = useLocation();
  const { push } = useHistory();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const page = +(searchParams.get(PARAM_PAGE_KEY) || 1);
  const pageSize = +(searchParams.get(PARAM_PAGE_SIZE_KEY) || perPage);

  const onPageChange = useCallback(
    (newPage) => {
      const sp = Object.fromEntries(searchParams.entries());
      push({
        search: new URLSearchParams({
          ...sp,
          [PARAM_PAGE_KEY]: newPage,
        }).toString(),
      });
    },
    [searchParams]
  );

  const onPageSizeChange = useCallback(
    (newPageSize) => {
      const sp = Object.fromEntries(searchParams.entries());
      push({
        search: new URLSearchParams({
          ...sp,
          [PARAM_PAGE_SIZE_KEY]: newPageSize,
        }).toString(),
      });
    },
    [searchParams]
  );

  return { page, pageSize, onPageChange, onPageSizeChange };
};

export default usePagination;
