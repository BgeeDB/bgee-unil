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
  isCountLoading,
}) => {
  // expressionCallCount
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
            {isCountLoading ? (
              <progress
                className="progress is-small is-primary"
                style={{
                  animationDuration: '2s',
                  width: '25px',
                  marginLeft: '8px',
                  height: '5px',
                }}
              />
            ) : (
              <span className="has-text-danger">
                &nbsp;(
                {allCounts?.[type.id]?.[resultKey] !== undefined
                  ? allCounts?.[type.id]?.[resultKey]
                  : 'No data'}
                )
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultTabs;
