import React from 'react';
import { isEmpty } from '../../../helpers/arrayHelper';
import SelectMultipleWithAutoComplete from '../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import './rawDataAnnotations.scss';

const RawDataAnnotationsFilters = ({
  filters,
  setFilters,
  triggerSearch,
  dataFilters = {},
  dataType,
}) => {
  const eraseFilters = () => {
    setFilters((old) => ({ ...old, [dataType]: {} }));
  };

  const onApplyFilter = () => {
    triggerSearch();
  };

  return (
    <div className="filters">
      {!isEmpty(dataFilters) &&
        Object.keys(dataFilters).map((filterKey) => {
          const dataFilter = dataFilters[filterKey];
          const keyAPI = dataFilter?.urlParameterName;
          const shouldPrintId = dataFilter?.informativeId;
          const shouldPrintName = dataFilter?.informativeName;
          const shouldPrintBoth = shouldPrintId && shouldPrintName;
          const filterByDataType = filters[dataType];
          const options = dataFilter?.values?.map((v) => ({
            label: `${shouldPrintId ? v.id : ''}${
              shouldPrintBoth ? ' - ' : ''
            }${shouldPrintName && v.name}`,
            value: v.id,
          }));
          const specificStyle = !shouldPrintBoth ? { flex: 0.6 } : {};
          return (
            <SelectMultipleWithAutoComplete
              key={filterKey}
              style={specificStyle}
              label={dataFilter.filterName}
              minCharToSearch={0}
              placeholder={dataFilter.filterName}
              getOptionsFunction={() => options}
              selectedOptions={filterByDataType?.[keyAPI] || []}
              setSelectedOptions={(newSelected) =>
                setFilters((old) => ({
                  ...old,
                  [dataType]: { ...old[dataType], [keyAPI]: newSelected },
                }))
              }
              className="filterSelect my-2"
            />
          );
        })}
      {!isEmpty(dataFilters) && (
        <>
          <button
            className="marginAutoBtn button is-small is-info is-light mt-2"
            type="button"
            onClick={onApplyFilter}
          >
            Apply filters
          </button>
          <button
            className="button is-small is-danger is-light mt-2 ml-2"
            type="button"
            onClick={eraseFilters}
          >
            <ion-icon name="trash" tooltop />
          </button>
        </>
      )}
    </div>
  );
};

export default RawDataAnnotationsFilters;
