import React from 'react';
import ComplexTable from '../ComplexTable';
import Bulma from '../Bulma';
import { TOP_ANAT_STATUS } from '../../helpers/constants/topAnat';

const COLUMNS = [
  {
    key: 'anatEntityId',
    text: 'Anat Entity ID',
  },
  {
    key: 'anatEntityName',
    text: 'Anat Entity Name',
  },
  {
    key: 'annotated',
    text: 'Annotated',
  },
  {
    key: 'significant',
    text: 'Significant',
  },
  {
    key: 'expected',
    text: 'Expected',
  },
  {
    key: 'foldEnrichment',
    text: 'Fold Enrichment',
  },
  {
    key: 'pValue',
    text: 'P value',
  },
  {
    key: 'FDR',
    text: 'Fdr',
  },
];

const TopAnatResult = ({ results, searchId, fg, status }) => {
  const onRenderCell = React.useCallback(({ cell, key }, defaultRender) => {
    if (key === 0)
      return (
        <a
          className="external-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`http://purl.obolibrary.org/obo/${cell.replace(':', '_')}`}
        >
          {cell}
        </a>
      );
    return defaultRender(cell, key);
  }, []);
  const onFilter = React.useCallback(
    (search) => (element) =>
      Boolean(new RegExp(search).test(element.anatEntityId)) ||
      Boolean(new RegExp(search).test(element.anatEntityName)),
    []
  );
  const onSort = React.useCallback(
    (sortKey, sortDirection) =>
      ({ [sortKey]: a }, { [sortKey]: b }) => {
        const AFormatted = typeof a === 'string' ? a.toLowerCase() : a;
        const bFormatted = typeof b === 'string' ? b.toLowerCase() : b;
        if (AFormatted === bFormatted) return 0;
        if (sortDirection === 'ascending')
          return AFormatted > bFormatted ? 1 : -1;
        if (sortDirection === 'descending')
          return AFormatted < bFormatted ? 1 : -1;
        return 0;
      },
    []
  );
  const dataCsvHref = React.useMemo(() => {
    let csvContent =
      'data:text/csv;charset=utf-8,Anat Entity ID;Anat Entity ID;Annotated;Significant;Expected;Fold Enrichment;P value;Fdr\n';
    if (results?.data)
      results?.data.forEach((row) => {
        csvContent += `${row.anatEntityId};${row.anatEntityName};${row.annotated};${row.significant};${row.expected};${row.foldEnrichment};${row.pValue};${row.FDR}\n`;
      });

    return csvContent;
  }, [results]);
  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <Bulma.Columns vCentered>
        <Bulma.C size={4}>
          <div className="is-flex is-flex-direction-column">
            <p>Archive(s)</p>
            <a
              href={`https://bgee.org/?page=top_anat&action=download&data=${searchId}`}
              className="external-link"
              style={{ width: 'fit-content' }}
              rel="noreferrer"
            >
              All stages, expression type &quot;Present&quot;
            </a>
            {results.analysis.length > 1 &&
              results.analysis.map((r) => (
                <a
                  key={r.zipFile}
                  href={r.zipFile}
                  className="external-link"
                  style={{ width: 'fit-content' }}
                >
                  {`${
                    fg.list.stages.find((s) => s.id === r.devStageId)?.name
                  }, expression type "Present" (${r.analysis.length})`}
                </a>
              ))}
            @
          </div>
        </Bulma.C>
        <Bulma.C size={5}>
          <div className="field has-addons">
            {searchElement}
            {/* todo dl as csv */}
            <div className="control">
              <a
                className="button"
                href={dataCsvHref}
                download="data.csv"
                target="_blank"
                rel="noreferrer"
              >
                <span>CSV</span>
                <span className="icon is-small">
                  <ion-icon name="download-outline" />
                </span>
              </a>
            </div>
          </div>
        </Bulma.C>
        <Bulma.C size={3}>
          <div>
            {pageSizeElement}
            <div>{showEntriesText}</div>
          </div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    [fg, results, dataCsvHref]
  );
  const mappingObj = React.useCallback(
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
    ],
    []
  );

  if (
    status === TOP_ANAT_STATUS.RESULTS &&
    results &&
    Array.isArray(results.data)
  )
    return (
      <ComplexTable
        columns={COLUMNS}
        key={searchId}
        data={results.data}
        onRenderCell={onRenderCell}
        sortable
        pagination
        onFilter={onFilter}
        onSort={onSort}
        classNamesTable="is-striped"
        customHeader={customHeader}
        mappingObj={mappingObj}
      />
    );
  return null;
};

export default TopAnatResult;
