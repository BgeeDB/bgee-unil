/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React from 'react';
import Select, { components } from 'react-select';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import { isEmpty } from '../../../helpers/arrayHelper';
import { MEDIA_QUERIES } from '../../../helpers/constants/mediaQueries';
import './rawDataAnnotations.scss';

const AFFYMETRIX = 'AFFYMETRIX';
const EST = 'EST';
const IN_SITU = 'IN_SITU';
const RNA_SEQ = 'RNA_SEQ';
const FULL_LENGTH = 'FULL_LENGTH';
const DATA_TYPES = [AFFYMETRIX, EST, IN_SITU, RNA_SEQ, FULL_LENGTH];

const RawDataAnnotationResults = ({
  results = [],
  filters = {},
  resultCount = {},
  dataType = '',
}) => {
  // console.log('results = ', results);

  const customHeader = (searchElement, pageSizeElement) => (
    <Bulma.Columns vCentered>
      <Bulma.C>
        <div>{pageSizeElement}</div>
      </Bulma.C>
    </Bulma.Columns>
  );

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
      <Table
        pagination
        sortable
        classNamesTable="is-striped"
        columns={[
          { text: 'Exp ID', key: 'exp', hide: MEDIA_QUERIES.MOBILE_P },
          { text: 'Library ID', key: 'library' },
          { text: 'Sample ID', key: 'sample' },
          { text: 'Cell Type', key: 'cell_type' },
          { text: 'Tissue', key: 'tissue' },
          { text: 'Development and life stage', key: 'development' },
          { text: 'Sex', key: 'sex' },
          { text: 'Stain', key: 'strain' },
          { text: 'Log 2 RPK threshold', key: 'log2_rpk_threshold' },
          { text: 'Log 2 RPK score', key: 'log2_rpk_score' },
          { text: 'Anatomical structure ID', key: 'anat_struct_id' },
          { text: 'Gene ID', key: 'gene_id' },
          { text: 'Direction Flag', key: 'direction_flag' },
          { text: 'Quality', key: 'quality' },
        ]}
        data={['test']}
        customHeader={customHeader}
      />
    </>
  );
};

export default RawDataAnnotationResults;
