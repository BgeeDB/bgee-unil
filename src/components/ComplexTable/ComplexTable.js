import React from 'react';
import Table from '../Table';
import Pagination from '../Pagination';
import i18n from '../../i18n';
import Select from '../Select';
import Input from '../Form/Input';

const defaultSort = (sortKey, sortDirection) => (a, b) => {
  if (a === b) return 0;
  if (sortDirection === 'ascending') return a > b ? 1 : -1;
  if (sortDirection === 'descending') return a < b ? 1 : -1;
  return 0;
};

const ComplexTable = ({
  columns,
  data,
  onSort,
  onFilter,
  onRenderCell,
  onRenderRow,
  classNamesTable = '',
  pagination = false,
  defaultPaginationSize,
  customHeader,
  mappingObj = (arr) => arr,
  ...props
}) => {
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState(undefined);
  const internalData = React.useMemo(() => {
    const clone = JSON.parse(JSON.stringify(data));
    const filtered =
      search === '' || !onFilter ? clone : clone.filter(onFilter(search));
    if (sort) {
      filtered.sort((onSort || defaultSort)(sort.key, sort.sort));
    }
    return filtered;
  }, [data, search, sort]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    pagination ? defaultPaginationSize || 10 : internalData.length
  );
  const totalPage = React.useMemo(
    () => Math.round(internalData.length / pageSize) || 1,
    [internalData, pageSize]
  );

  const pageSizeSelector = React.useMemo(
    () =>
      pagination && internalData?.length > 10 ? (
        <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
          <p className="mr-2">Show</p>
          <Select
            defaultValue={pageSize}
            options={[10, 20, 50, { value: 100, text: 100 }]}
            onChange={(p) => {
              setCurrentPage(1);
              setPageSize(parseInt(p, 10));
            }}
          />
          <p className="ml-2">entries</p>
        </div>
      ) : null,
    [pageSize, currentPage, internalData, pagination]
  );
  const showEntriesText = React.useMemo(
    () => (
      <p className="has-text-right">
        {i18n
          .t('analysis.top-anat.showing-entries-on-total')
          .replace(
            '{START}',
            internalData.length
              ? ((currentPage - 1) * pageSize + 1).toString(10)
              : '0'
          )
          .replace(
            '{END}',
            (pageSize * currentPage > internalData.length
              ? internalData.length
              : pageSize * currentPage
            ).toString(10)
          )
          .replace('{TOTAL}', internalData.length)}
      </p>
    ),
    [internalData, currentPage, pageSize]
  );

  const searchInput = React.useMemo(
    () => (
      <div className="control table-search is-flex is-flex-direction-row is-align-items-center">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <p className="mr-1">Filter:</p>
        <Input
          value={search}
          onChange={(e) => {
            if (currentPage !== 1) setCurrentPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>
    ),
    [search, currentPage]
  );

  return (
    <>
      {customHeader ? customHeader(searchInput, pageSizeSelector) : null}
      <Table
        classNames={classNamesTable}
        columns={columns}
        data={internalData
          .slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
          .map(mappingObj)}
        onRenderCell={onRenderCell}
        onRenderRow={onRenderRow}
        onSort={onSort ? setSort : undefined}
        striped
        {...props}
      />
      <div className="is-flex is-justify-content-space-between">
        <div>{showEntriesText}</div>
        {pagination && (
          <Pagination
            current={currentPage}
            total={totalPage}
            setPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default ComplexTable;
