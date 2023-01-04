/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';
import { isEmpty } from '../../../helpers/arrayHelper';
import './rawDataAnnotations.scss';
import LinkExternal from '../../../components/LinkExternal';
import TagSource from '../../../components/TagSource/TagSource';

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
  maxPage,
  pageType,
  dataType,
  pageNumber,
}) => {
  const renderCells = ({ cell, key }, defaultRender) => {
    switch (cell[key].type) {
      case 'STRING':
      case 'NUMERIC':
        return <div>{cell[key].content}</div>;
      case 'INTERNAL_LINK':
        return (
          <Link className="internal-link" to={cell[key].to}>
            {cell[key].content}
          </Link>
        );
      case 'DEV_STAGE':
      case 'ANAT_ENTITY': {
        const content = cell[key].content;
        const path = cell[key].path;
        const renderAnatLink = content ? (
          <LinkExternal to={path} text={content} />
        ) : (
          ''
        );

        return <>{renderAnatLink}</>;
      }
      case 'DATA_TYPE_SOURCE': {
        const sourceObject = cell[key].sourceObject;
        return <TagSource source={sourceObject} />;
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
            case 'ANAT_ENTITY':
            case 'DEV_STAGE': {
              const id = replaceNAOrUndefined(
                getChildValueFromAttribute(result, col.attributes[0])
              );
              const path = obolibraryLinkFromID(id || '');
              return {
                type: col.columnType,
                content: id,
                path,
              };
            }
            case 'NUMERIC': {
              return {
                type: col.columnType,
                content: getChildValueFromAttribute(result, attribute0),
              };
            }
            case 'DATA_TYPE_SOURCE': {
              const sourceObject = getChildValueFromAttribute(
                result,
                attribute0
              );
              let source = '';
              Object.entries(sourceObject).forEach(([key, value]) => {
                if (value) {
                  source += `${key}, `;
                }
              });
              return {
                type: col.columnType,
                content: source.slice(0, -2),
                sourceObject,
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
        <div className="my-2 is-flex is-justify-content-flex-end">
          <Bulma.Button
            className="download-btn is-small"
            href={buildTSVhref}
            renderAs="a"
            download={`${pageType}_${dataType}_${pageNumber}.tsv`}
            target="_blank"
            rel="noreferrer"
          >
            Export current page in TSV
            <span className="icon is-small ml-1">
              <ion-icon name="download-outline" />
            </span>
          </Bulma.Button>
        </div>
      )}
      <Table
        pagination
        classNamesTable="is-striped"
        // onSortCustom={customRawListSorter}
        columns={columns}
        data={mappedResults}
        customHeader={customHeader}
        onRenderCell={renderCells}
        paginationParamPageKey="pageNumber"
        paginationResultCountKey="limit"
        isRequestPerPage
        manualMaxPage={maxPage}
        fullwidth={false}
        minThWidth="10rem"
        hasPaginationTop
        hasScrollTop
      />
    </>
  );
};

export default RawDataAnnotationResults;
