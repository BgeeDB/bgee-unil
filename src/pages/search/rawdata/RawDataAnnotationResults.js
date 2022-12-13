/* eslint-disable prefer-destructuring */
/* eslint-disable import/order */
/* eslint-disable no-empty */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React, { useMemo } from 'react';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';
import { isEmpty } from '../../../helpers/arrayHelper';
import './rawDataAnnotations.scss';
import LinkExternal from '../../../components/LinkExternal';
import { customRawListSorter } from '../../../helpers/sortTable';
import { Link } from 'react-router-dom';
import { EXPERIMENTS } from './useLogic';

// Permet d'aller checher des valeurs enfant de l'objet envoyé
const getChildValueFromAttribute = (obj = {}, attributes = '') => {
  // ex: ['result', 'experiment', 'name']
  const attributeTab = attributes.split('.');
  let current = obj;
  if (attributeTab[0] === 'result') {
    attributeTab.splice(0, 1);
  }
  for (let i = 0; i < attributeTab.length; i++) {
    current = current?.[attributeTab[i]];
  }
  return current;
};

const replaceNAOrUndefined = (txt) => {
  if (!txt || txt?.toLowerCase() === 'na') {
    return '';
  }
  return txt;
};

const customHeader = (searchElement, pageSizeElement) => (
  <Bulma.Columns vCentered>
    <Bulma.C>
      <div>{pageSizeElement}</div>
    </Bulma.C>
  </Bulma.Columns>
);

const RawDataAnnotationResults = ({
  results = [],
  columnDescriptions = {},
  limit,
  count,
  pageType,
  dataType,
}) => {
  const countResultKey = useMemo(
    () => (pageType === EXPERIMENTS ? 'experimentCount' : 'assayCount'),
    [pageType]
  );

  const renderCells = ({ cell, key }, defaultRender) => {
    switch (cell[key].type) {
      case 'STRING':
      case 'NUMERIC':
        return <div>{cell[key].content}</div>;

      case 'INTERNAL_LINK':
        return (
          <Link className="external-link" to={cell[key].to}>
            {cell[key].content}
          </Link>
        );

      case 'DEV_STAGE':
        return (
          <>
            <LinkExternal to={cell[key].to} text={cell[key].clickableContent} />
            {cell[key].content}
          </>
        );
      case 'ANAT_ENTITY': {
        const cellTypeId = cell[key].cellId;
        const cellTypeName = cell[key].cellName;
        const anatId = cell[key].anatId;
        const anatName = cell[key].anatName;

        const renderCellId = cellTypeId ? (
          <LinkExternal to={cell[key]?.toCellTypes} text={cellTypeId} />
        ) : (
          ''
        );

        const renderAnatId = anatId ? (
          <LinkExternal to={cell[key]?.toAnat} text={anatId} />
        ) : (
          ''
        );

        return (
          <>
            {renderCellId}
            {!!cellTypeName && !!renderCellId ? ' - ' : ''}
            {cellTypeName}
            {!!renderCellId || !!cellTypeName ? (
              <p>
                <em>in</em>
              </p>
            ) : null}
            {renderAnatId}
            {!!renderAnatId && !!anatName ? ' - ' : ''}
            {anatName}
          </>
        );
      }
      default:
        return defaultRender([cell[key]]);
    }
  };

  const columns = useMemo(
    () =>
      Object.keys(columnDescriptions).map((columnDescriptionsKey, index) => {
        const column = columnDescriptions[columnDescriptionsKey];

        return {
          key: index,
          text: column.title,
          attributes: column.attributes,
          columnType: column.columnType,
          infoBubble: column.infoBubble,
        };
      }),
    [columnDescriptions]
  );

  const mappedResults = useMemo(
    () =>
      results.map((result) => {
        const row = columns.map((col) => {
          const attribute0 = col.attributes[0];
          switch (col.columnType) {
            case 'STRING': {
              return {
                type: col.columnType,
                content: col.attributes
                  .map((att) => getChildValueFromAttribute(result, att))
                  .join(' '),
              };
            }
            case 'INTERNAL_LINK': {
              const path = `/experiment/${getChildValueFromAttribute(
                result,
                attribute0
              )}`;
              return {
                type: col.columnType,
                content: getChildValueFromAttribute(result, attribute0),
                to: path,
              };
            }
            case 'DEV_STAGE': {
              const devStageId = getChildValueFromAttribute(
                result,
                col.attributes[0]
              );
              const path = obolibraryLinkFromID(devStageId);
              const devStageName = getChildValueFromAttribute(
                result,
                col.attributes[1]
              );
              return {
                type: col.columnType,
                clickableContent: devStageId,
                content: ` ${devStageName}`,
                to: path,
              };
            }
            case 'ANAT_ENTITY': {
              const cellId = replaceNAOrUndefined(
                getChildValueFromAttribute(result, col.attributes[0])
              );
              const pathCellTypes = obolibraryLinkFromID(cellId || '');
              const cellName = replaceNAOrUndefined(
                getChildValueFromAttribute(result, col.attributes[1])
              );
              const anatId = replaceNAOrUndefined(
                getChildValueFromAttribute(result, col.attributes[2])
              );
              const pathAnat = obolibraryLinkFromID(anatId || '');
              const anatName = replaceNAOrUndefined(
                getChildValueFromAttribute(result, col.attributes[3])
              );
              return {
                type: col.columnType,
                toCellTypes: pathCellTypes,
                toAnat: pathAnat,
                cellId,
                cellName,
                anatId,
                anatName,
                content: `${cellId}${cellId ? ` ${cellName}` : cellName} ${
                  cellId || cellName ? ` ${anatId}` : anatId
                } ${anatId ? ` ${anatName}` : anatName}`,
              };
            }
            case 'NUMERIC': {
              return {
                type: col.columnType,
                content: getChildValueFromAttribute(result, attribute0),
              };
            }
            default:
              return {};
          }
        });
        return row;
      }),
    [results, columns]
  );

  const buildTSVhref = useMemo(() => {
    const base = `data:text/tab-separated-values;charset=utf-8,`;
    const colHeaders = [];
    Object.keys(columnDescriptions).forEach((colIndex) => {
      const column = columnDescriptions[colIndex];
      colHeaders.push(column.title);
    });
    let tsv = colHeaders.join('%09');
    tsv += '%0D%0A';

    mappedResults.forEach((row) => {
      const rowTxt = row.map((r) => r.content).join('%09');
      tsv += `${rowTxt}%0D%0A`;
    });

    return `${base}${tsv}`;
  }, [mappedResults]);

  if (isEmpty(columnDescriptions)) {
    return null;
  }

  return (
    <>
      {results?.length > 0 && (
        <Bulma.Button
          className="ml-2 py-0"
          href={buildTSVhref}
          renderAs="a"
          download={`${pageType}_${dataType}.tsv`}
          target="_blank"
          rel="noreferrer"
        >
          TSV
          <span className="icon is-small ml-1">
            <ion-icon name="download-outline" />
          </span>
        </Bulma.Button>
      )}
      <Table
        pagination
        sortable
        classNamesTable="is-striped"
        onSortCustom={customRawListSorter}
        columns={columns}
        data={mappedResults}
        customHeader={customHeader}
        onRenderCell={renderCells}
        paginationParamPageKey="pageNumber"
        paginationResultCountKey="limit"
        isRequestPerPage
        manualMaxPage={Math.ceil((count?.[countResultKey] || 0) / limit)}
        fullwidth={false}
        minThWidth="7rem"
      />
    </>
  );
};

export default RawDataAnnotationResults;
