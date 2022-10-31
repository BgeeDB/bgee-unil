import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const PARAM_PAGE_KEY = 'page';
export const RESULTS_COUNT_KEY = 'results';

export const usePaginationLink = () => {
  const { pathname, search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const generatePaginationLink = useCallback((page, count) => {
    if (page < 1 || count < 0) {
      return '#';
    }

    const sp = Object.fromEntries(searchParams.entries());

    const newSp = new URLSearchParams({
      ...sp,
    });

    if (page) {
      newSp.set(PARAM_PAGE_KEY, page);
    }
    if (count) {
      newSp.set(RESULTS_COUNT_KEY, count);
    }

    return `${pathname}?${newSp.toString()}`;
  }, []);

  return { generatePaginationLink };
};

const usePagination = (perPage = 10) => {
  const { search } = useLocation();
  const { push } = useHistory();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const page = +(searchParams.get(PARAM_PAGE_KEY) || 1);
  const pageSize = +(searchParams.get(RESULTS_COUNT_KEY) || perPage);

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
          [RESULTS_COUNT_KEY]: newPageSize,
        }).toString(),
      });
    },
    [searchParams]
  );

  return { page, pageSize, onPageChange, onPageSizeChange };
};

export default usePagination;
