/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo } from 'react';
import { EXPERIMENTS } from '../useLogic';

const ResultTabs = ({
  dataTypes,
  dataType,
  allCounts,
  setDataType,
  pageType,
}) => {
  const resultKey = useMemo(
    () => (pageType === EXPERIMENTS ? 'experimentCount' : 'assayCount'),
    [pageType]
  );

  return (
    <div className="is-flex ongletWrapper is-centered">
      {dataTypes.map((type) => {
        const isActive = type.id === dataType;
        return (
          <div
            key={type.id}
            onClick={() => setDataType(type.id)}
            className={`onglet column is-centered ${
              isActive && 'ongletActive'
            }`}
          >
            <span>{type.label}</span>
            <span>
              (
              {allCounts?.[type.id]?.[resultKey] !== undefined
                ? allCounts?.[type.id]?.[resultKey]
                : 'No data'}
              )
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ResultTabs;
