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
        return <Link to={cell[key].to}>{cell[key].content}</Link>;

      case 'DEV_STAGE':
        return (
          <>
            <LinkExternal to={cell[key].to} text={cell[key].clickableContent} />
            {cell[key].content}
          </>
        );
      case 'ANAT_ENTITY':
        return (
          <>
            {cell[key].contentCellType === 'NA - NA ' && (
              <div>{cell[key].contentAnat}</div>
            )}
            {cell[key].contentCellType !== 'NA - NA ' && (
              <div>
                {cell[key].contentCellType}
                <p>
                  <em>in</em>
                </p>
                {cell[key].contentAnat}
              </div>
            )}
          </>
        );
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
            const path = `/experiment/${result?.experiment?.id}`;
            return {
              type: col.columnType,
              content: getChildValueFromAttribute(result, attribute0),
              to: path,
            };
          }
          case 'DEV_STAGE': {
            const path = obolibraryLinkFromID(
              result.annotation.rawDataCondition.devStage.id
            );
            const devStageId = getChildValueFromAttribute(
              result,
              col.attributes[0]
            );
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
            const cellName = getChildValueFromAttribute(
              result,
              col.attributes[1]
            );
            const anatId = getChildValueFromAttribute(
              result,
              col.attributes[2]
            );
            const anatName = getChildValueFromAttribute(
              result,
              col.attributes[3]
            );
            return {
              type: col.columnType,
              contentCellType: `${cellId || 'NA'} - ${cellName || 'NA'} `,
              contentAnat: ` ${anatId} - ${anatName}`,
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
      paginationParamPageKey="nbPage"
      paginationResultCountKey="limit"
    />
  );
};

export default RawDataAnnotationResults;
