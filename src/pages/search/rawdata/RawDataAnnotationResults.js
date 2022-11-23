/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React from 'react';
import Select, { components } from 'react-select';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';
import { isEmpty } from '../../../helpers/arrayHelper';
import './rawDataAnnotations.scss';

const RawDataAnnotationResults = ({
  results = [],
  filters = {},
  resultCount = {},
  columnDescriptions = {},
  dataType = '',
}) => {
  const customHeader = (searchElement, pageSizeElement) => (
    <Bulma.Columns vCentered>
      <Bulma.C>
        <div>{pageSizeElement}</div>
      </Bulma.C>
    </Bulma.Columns>
  );

  const renderCells = ({ cell, key, keyRow }, defaultRender) => {
    switch ([cell[key].type]) {
      case 'INTERNAL_LINK':
        return (
          // <Link
          //   key={`${key}-${keyRow}`}
          //   className="internal-link"
          //   to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES.replace(
          //     ':geneId',
          //     cell.id
          //   ).replace(':speciesId', cell.onlySpecies ? '' : cell.speciesId)}
          // >
          //   {cell[key].content}
          // </Link>
          <div>
            [<p>{cell[key].text}</p>]
          </div>
        );
      default:
        return defaultRender([cell[key]]);
    }
  };

  const buildColumns = () =>
    Object.keys(columnDescriptions).map((columnDescriptionsKey, index) => {
      const column = columnDescriptions[columnDescriptionsKey];
      return {
        key: index,
        text: column.title,
        attributes: column.attributes,
        columnType: column.columnType,
      };
    });

  const buildResults = () => {
    const a = Object.keys(results).map((resultsKey) => {
      const result = results[resultsKey];
      return {
        0: {
          type: 'link_external',
          text: result?.experiment?.id,
          path: obolibraryLinkFromID(
            result?.annotation?.rawDataCondition?.anatEntity?.id
          ),
        },
        1: { type: 'STRING', content: result?.experiment?.name },
        2: { type: 'STRING', content: result?.id },
        3: {
          type: 'STRING',
          content: `${result?.annotation?.rawDataCondition?.cellType} - ${result?.annotation?.rawDataCondition?.anatEntity?.id} - ${result?.annotation?.rawDataCondition?.anatEntity?.name}`,
        },
        4: {
          type: 'STRING',
          content: `${result?.annotation?.rawDataCondition?.devStage?.id} -
            ${result?.annotation?.rawDataCondition?.devStage?.name}`,
        },
        5: {
          type: 'STRING',
          content: result?.annotation?.rawDataCondition?.sex,
        },
        6: {
          type: 'STRING',
          content: result?.annotation?.rawDataCondition?.strain,
        },
        7: {
          type: 'STRING',
          content: `${result?.annotation?.rawDataCondition?.species?.genus} -
            ${result?.annotation?.rawDataCondition?.species?.speciesName}`,
        },
      };
    });
    return a;
  };

  return (
    <>
      <div>
        <div className="categorie">
          {!isEmpty(filters) &&
            Object.keys(filters).map((filterKey) => {
              const filter = filters[filterKey];
              const options = filter?.values?.map((v) => ({
                label: v.name,
                value: v.id,
              }));
              return (
                <Select
                  classNamePrefix="react-select"
                  inputId="coucou"
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option: (props) => (
                      <div>
                        <components.Option {...props}>
                          <input
                            type="checkbox"
                            checked={props.isSelected}
                            onChange={() => null}
                          />{' '}
                          <label>{props.label}</label>
                        </components.Option>
                      </div>
                    ),
                  }}
                  allowSelectAll
                  isMulti
                  key={filterKey}
                  className="cat-child"
                  placeholder={filter.filterName}
                  options={options}
                />
              );
            })}
        </div>
      </div>
      {!isEmpty(columnDescriptions) && (
        <Table
          pagination
          sortable
          classNamesTable="is-striped"
          columns={buildColumns()}
          data={buildResults()}
          customHeader={customHeader}
          onRenderCell={renderCells}
        />
      )}
    </>
  );
};

export default RawDataAnnotationResults;
