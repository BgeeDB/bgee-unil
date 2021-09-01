import React from 'react';
import Table from '../Table';
import Pagination from '../Pagination';
import i18n from '../../i18n';
import Select from '../Select';
import Input from '../Input';

const ComplexTable = ({
  columns,
  data,
  onRenderCell,
  sortable,
  classNamesTable = '',
  pagination = false,
  customHeader,
}) => {
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState(undefined);
  const internalData = React.useMemo(() => {
    const clone = JSON.parse(JSON.stringify(data));
    const filtered =
      search === ''
        ? clone
        : clone.filter(
            (obj) =>
              Boolean(new RegExp(search).test(obj.anatEntityId)) ||
              Boolean(new RegExp(search).test(obj.anatEntityName))
          );
    if (sort) {
      filtered.sort(({ [sort.key]: a }, { [sort.key]: b }) => {
        if (a === b) return 0;
        if (sort.sort === 'ascending') return a > b ? 1 : -1;
        if (sort.sort === 'descending') return a < b ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, search, sort]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(pagination ? 10 : data.length);
  const totalPage = React.useMemo(
    () => Math.round(data.length / pageSize),
    [data, pageSize]
  );

  const pageSizeSelector = React.useMemo(
    () =>
      pagination ? (
        <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
          <p className="mr-2">{i18n.t('analysis.top-anat.show-entries')}</p>
          <Select
            defaultValue={pageSize}
            options={[10, 20, 50, { value: 100, text: 100 }]}
            onChange={setPageSize}
          />
        </div>
      ) : null,
    [pageSize, currentPage, data, pagination]
  );
  const showEntriesText = React.useMemo(
    () => (
      <p className="has-text-right mt-2">
        {i18n
          .t('analysis.top-anat.showing-entries-on-total')
          .replace('{START}', ((currentPage - 1) * pageSize + 1).toString(10))
          .replace(
            '{END}',
            (pageSize * currentPage > data.length
              ? data.length
              : pageSize * currentPage
            ).toString(10)
          )
          .replace('{TOTAL}', data.length)}
      </p>
    ),
    [data, currentPage, pageSize]
  );
  const searchInput = React.useMemo(
    () => (
      <div className="control is-flex-grow-1 is-flex-shrink-1">
        <Input placeholder={i18n.t('global.search')} onChange={setSearch} />
      </div>
    ),
    []
  );

  return (
    <>
      {customHeader
        ? customHeader(searchInput, pageSizeSelector, showEntriesText)
        : null}
      <Table
        classNames={classNamesTable}
        columns={columns}
        data={(function () {
          let pointer = (currentPage - 1) * pageSize;
          if (pointer > 0) pointer -= 1;

          const clone = JSON.parse(JSON.stringify(data)).slice(
            pointer,
            pointer + pageSize
          );
          return clone.map(
            ({
              anatEntityId,
              anatEntityName,
              annotated,
              significant,
              expected,
              foldEnrichment,
              pValue,
              FDR,
            }) => [
              anatEntityId,
              anatEntityName,
              annotated,
              significant,
              expected,
              foldEnrichment,
              pValue,
              FDR,
            ]
          );
        })()}
        onRenderCell={onRenderCell}
        sortable={sortable}
        onSort={setSort}
      />
      {pagination && (
        <Pagination
          current={currentPage}
          total={totalPage}
          setPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default ComplexTable;
