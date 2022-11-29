import React, { useState } from 'react';
import SelectMultipleWithAutoComplete from '../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { isEmpty } from '../../../helpers/arrayHelper';
import { getIdAndNameLabel } from '../../../helpers/selects';

import './rawDataAnnotations.scss';
import useLogic from './useLogic';

const RawDataAnnotationsFilters = ({ dataFilters = {} }) => {
  const { resetForm } = useLogic();
  const [filters, setFilters] = useState({});

  return (
    <div className="filters">
      {!isEmpty(dataFilters) &&
        Object.keys(dataFilters).map((filterKey) => {
          const filter = dataFilters[filterKey];
          const firstElement = filter?.values[0];
          const isOnlyId =
            !!firstElement && firstElement?.id === firstElement?.name;
          const options = filter?.values?.map((v) => ({
            label: isOnlyId ? v.id : getIdAndNameLabel(v),
            value: v.id,
          }));
          const specificStyle = isOnlyId ? { flex: 0.6 } : {};
          return (
            <SelectMultipleWithAutoComplete
              key={filterKey}
              style={specificStyle}
              label={filter.filterName}
              minCharToSearch={0}
              placeholder={filter.filterName}
              getOptionsFunction={() => options}
              selectedOptions={filters[filterKey] || []}
              setSelectedOptions={(newSelected) =>
                setFilters((old) => ({ ...old, [filterKey]: newSelected }))
              }
              className="filterSelect"
            />
          );
        })}
      {!isEmpty(dataFilters) && (
        <button className="button is-small is-info is-light" type="button">
          Apply filters
        </button>
      )}
    </div>
  );
};

export default RawDataAnnotationsFilters;
