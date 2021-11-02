/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ComplexTable from '../ComplexTable';
import Bulma from '../Bulma';
import classnames from '../../helpers/classnames';
import { TOP_ANAT_FLOW } from '../../hooks/useTopAnat';
import GaEvent from '../GaEvent/GaEvent';
import { API_DOMAIN } from '../../api/prod/constant';

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
const MERGE_KEY = 'merge';

const TopAnatResult = ({ results, searchId, fg, status }) => {
  const [selectedStage, setSelectedStage] = React.useState(MERGE_KEY);
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
    (searchElement, pageSizeElement, showEntriesText) =>
      results?.analysis ? (
        <>
          <Bulma.Columns vCentered>
            <Bulma.C size={4}>
              <div className="is-flex is-flex-direction-column">
                <p>Download R scripts and data</p>
                <GaEvent
                  category="Top Anat"
                  action="Download R scripts and data"
                  label={`All - ${API_DOMAIN}/?page=top_anat&action=download&data=${searchId}`}
                >
                  <Bulma.Button
                    href={`${API_DOMAIN}/?page=top_anat&action=download&data=${searchId}`}
                    color="danger"
                    light
                    style={{ width: 'fit-content' }}
                    rel="noreferrer"
                    renderAs="a"
                    size="small"
                  >
                    All stages, expression type &quot;Present&quot;
                    <span className="icon ml-1">
                      <ion-icon name="download-outline" size="large" />
                    </span>
                  </Bulma.Button>
                </GaEvent>
                {results.analysis.length > 1 &&
                  results.analysis.map((r) => (
                    <GaEvent
                      key={r.zipFile}
                      category="Top Anat"
                      action="Download R scripts and data"
                      label={`${
                        fg.list.stages.find((s) => s.id === r.devStageId)?.name
                      } - ${r.zipFile}`}
                    >
                      <Bulma.Button
                        href={r.zipFile}
                        color="danger"
                        light
                        style={{ width: 'fit-content' }}
                        rel="noreferrer"
                        renderAs="a"
                        size="small"
                        className="mt-1"
                      >
                        {`${
                          fg.list.stages.find((s) => s.id === r.devStageId)
                            ?.name
                        }, expression type "Present" (${r.results.length})`}
                        <span className="icon is-small">
                          <ion-icon name="download-outline" size="large" />
                        </span>
                      </Bulma.Button>
                    </GaEvent>
                  ))}
              </div>
            </Bulma.C>
            <Bulma.C size={5}>
              <div className="field has-addons">
                {searchElement}
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
          {results.analysis.length > 1 && (
            <div className="tabs">
              <ul>
                <li
                  className={classnames({
                    'is-active': selectedStage === MERGE_KEY,
                  })}
                  onClick={() => {
                    if (selectedStage !== MERGE_KEY)
                      setSelectedStage(MERGE_KEY);
                  }}
                >
                  <a>All stages</a>
                </li>
                {results.analysis.map((analysis) => (
                  <li
                    key={analysis.devStageId}
                    className={classnames({
                      'is-active': selectedStage === analysis.devStageId,
                    })}
                    onClick={() => {
                      if (selectedStage !== analysis.devStageId)
                        setSelectedStage(analysis.devStageId);
                    }}
                  >
                    <a>
                      {
                        fg.list.stages.find((s) => s.id === analysis.devStageId)
                          ?.name
                      }
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : null,
    [fg, results, dataCsvHref, selectedStage]
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

  const dataDisplay = React.useMemo(() => {
    if (status !== TOP_ANAT_FLOW.GOT_RESULTS) return null;
    if (!results || !results.analysis) return null;
    if (selectedStage === MERGE_KEY) return results.data;

    return (
      results.analysis.find((a) => a.devStageId === selectedStage)?.results ||
      null
    );
  }, [status, results, selectedStage]);

  if (
    status === TOP_ANAT_FLOW.GOT_RESULTS &&
    dataDisplay &&
    dataDisplay.length > 0
  )
    return (
      <ComplexTable
        columns={COLUMNS}
        key={searchId + selectedStage}
        data={dataDisplay}
        onRenderCell={onRenderCell}
        sortable
        pagination
        defaultPaginationSize={20}
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
