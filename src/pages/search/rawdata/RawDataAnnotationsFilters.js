import React, { useState } from 'react';
import { isEmpty } from '../../../helpers/arrayHelper';
import { getIdAndNameLabel } from '../../../helpers/selects';
import SelectMultipleWithAutoComplete from '../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import './rawDataAnnotations.scss';

const RawDataAnnotationsFilters = ({ dataFilters = {}, dataType }) => {
  const [filters, setFilters] = useState({});
  const eraseFilters = () => {
    setFilters((old) => ({ ...old, [dataType]: {} }));
  };

  return (
    <div className="filters">
      {!isEmpty(dataFilters) &&
        Object.keys(dataFilters).map((filterKey) => {
          const dataFilter = dataFilters[filterKey];
          const firstElement = dataFilter?.values[0];
          const isOnlyId =
            !!firstElement && firstElement?.id === firstElement?.name;
          const filterByDataType = filters[dataType];
          const options = dataFilter?.values?.map((v) => ({
            label: isOnlyId ? v.id : getIdAndNameLabel(v),
            value: v.id,
          }));
          const specificStyle = isOnlyId ? { flex: 0.6 } : {};
          return (
            <SelectMultipleWithAutoComplete
              key={filterKey}
              style={specificStyle}
              label={dataFilter.filterName}
              minCharToSearch={0}
              placeholder={dataFilter.filterName}
              getOptionsFunction={() => options}
              selectedOptions={filterByDataType?.[filterKey] || []}
              setSelectedOptions={(newSelected) =>
                setFilters((old) => ({
                  ...old,
                  [dataType]: { ...old[dataType], [filterKey]: newSelected },
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
