import React, { useContext } from 'react';
import {
  MEDIA_QUERIES,
  MEDIA_QUERIES_SIZE,
} from '../../helpers/constants/mediaQueries';
import Pagination from '../Pagination';
import { TableContext } from '../../contexts/TableContext';

const TablePagination = () => {
  const {
    table,
    data,
    usedWidth,
    pagination,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useContext(TableContext);

  const showEntriesText = React.useMemo(
    () => (
      <p className="has-text-right">
        {`Showing ${
          data.length ? ((currentPage - 1) * pageSize + 1).toString(10) : '0'
        } to ${(pageSize * currentPage > data.length
          ? data.length
          : pageSize * currentPage
        ).toString(10)} of ${data.length} entries`}
      </p>
    ),
    [data, currentPage, pageSize]
  );
  const totalPage = React.useMemo(
    () => Math.ceil(data.length / pageSize) || 1,
    [data, pageSize]
  );

  if (data.length === 0) return null;
  return (
    <div
      ref={table}
      className={`complex-table-footer is-flex is-justify-content-space-between${
        usedWidth <= MEDIA_QUERIES_SIZE[MEDIA_QUERIES.TABLET] ? ' tablet' : ''
      }`}
    >
      <div>{showEntriesText}</div>
      {pagination && (
        <Pagination
          current={currentPage}
          total={totalPage}
          setPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TablePagination;
