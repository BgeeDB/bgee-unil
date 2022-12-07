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

// Permet d'aller checher des valeurs enfant de l'objet envoyé
const getChildValueFromAttribute = (obj, attributes) => {
  const attributeTab = attributes.split('.'); // ex: ['result', 'experiment', 'name']
  let current = obj;
  if (attributeTab[0] === 'result') {
    attributeTab.splice(0, 1);
  }
  for (let i = 0; i < attributeTab.length; i++) {
    current = current?.[attributeTab[i]];
  }
  return current;
};

const RawDataAnnotationResults = ({
  results = [],
  columnDescriptions = {},
  limit,
  count,
}) => {
  const customHeader = (searchElement, pageSizeElement) => (
    <Bulma.Columns vCentered>
      <Bulma.C>
        <div>{pageSizeElement}</div>
      </Bulma.C>
    </Bulma.Columns>
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

        const renderCellId =
          cellTypeId && cellTypeId.toLowerCase() !== 'na' ? (
            <LinkExternal to={cell[key]?.toCellTypes} text={cellTypeId} />
          ) : (
            ''
          );
        const renderCellTypeName =
          cellTypeName && cellTypeName.toLowerCase() !== 'na'
            ? cellTypeName
            : '';

        const renderAnatId =
          anatId && anatId.toLowerCase() !== 'na' ? (
            <LinkExternal to={cell[key]?.toAnat} text={anatId} />
          ) : (
            ''
          );
        const renderAnatName =
          anatName && anatName.toLowerCase() !== 'na' ? anatName : '';

        return (
          <>
            {renderCellId}
            {renderCellTypeName && renderCellId ? ' - ' : ''}
            {renderCellTypeName}
            {!!renderCellId && !!renderCellTypeName ? (
              <p>
                <em>in</em>
              </p>
            ) : null}
            {renderAnatId}
            {renderAnatId && renderAnatName ? ' - ' : ''}
            {renderAnatName}
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

  const buildResults = () =>
    results.map((result) => {
      const row = columns.map((col) => {
        const attribute0 = col.attributes[0];
        switch (col.columnType) {
          case 'STRING': {
            if (col.attributes.length === 1) {
              return {
                type: col.columnType,
                content: getChildValueFromAttribute(result, attribute0),
              };
            }
            const genus = getChildValueFromAttribute(result, col.attributes[0]);
            const name = getChildValueFromAttribute(result, col.attributes[1]);
            return {
              type: col.columnType,
              content: `${genus} ${name}`,
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
            const cellId = getChildValueFromAttribute(
              result,
              col.attributes[0]
            );
            const pathCellTypes = obolibraryLinkFromID(cellId || '');
            const cellName = getChildValueFromAttribute(
              result,
              col.attributes[1]
            );
            const anatId = getChildValueFromAttribute(
              result,
              col.attributes[2]
            );
            const pathAnat = obolibraryLinkFromID(anatId || '');
            const anatName = getChildValueFromAttribute(
              result,
              col.attributes[3]
            );
            return {
              type: col.columnType,
              toCellTypes: pathCellTypes,
              toAnat: pathAnat,
              cellId,
              cellName,
              anatId,
              anatName,
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
    });

  if (isEmpty(columnDescriptions)) {
    return null;
  }

  return (
    <Table
      pagination
      sortable
      classNamesTable="is-striped"
      onSortCustom={customRawListSorter}
      columns={columns}
      data={buildResults()}
      customHeader={customHeader}
      onRenderCell={renderCells}
      paginationParamPageKey="pageNumber"
      paginationResultCountKey="limit"
      isRequestPerPage
      manualMaxPage={Math.ceil((count?.assayCount || 0) / limit)}
    />
  );
};

export default RawDataAnnotationResults;
