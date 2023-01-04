import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import { ALL_DATA_QUALITIES } from '../../../useLogic';

const DataQualityParameter = ({ setDataQuality, dataQuality }) => {
  const onChange = (key) => {
    setDataQuality(key);
  };

  return (
    <div className="mt-4">
      <label>
        Data quality
        <HelpIcon
          style={{
            position: 'absolute',
          }}
          content={<>TODO : Help data quality</>}
        />
      </label>
      <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper mt-2">
        {ALL_DATA_QUALITIES.map((dq) => {
          const isSelected = dataQuality === dq.id;
          return (
            <label
              className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
              key={dq.id}
            >
              <input
                type="radio"
                checked={isSelected}
                onChange={() => onChange(dq.id)}
              />
              <b className="mx-1">{dq.label}</b>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default DataQualityParameter;
