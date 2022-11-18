/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React from 'react';
import Select, { components } from 'react-select';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
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

  const buildColumns = () =>
    Object.keys(columnDescriptions).map((columnDescriptionsKey) => {
      const column = columnDescriptions[columnDescriptionsKey];
      return {
        key: 'test',
        text: column.title,
      };
    });

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
          data={['test']}
          customHeader={customHeader}
        />
      )}
    </>
  );
};

export default RawDataAnnotationResults;
