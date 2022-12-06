/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/named */
import React, { useState } from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import Bulma from '../../../../../../components/Bulma';
import { DATA_TYPES } from '../../../../rawdata/useLogic';

const DataType = () => {
  const [data, setData] = useState(DATA_TYPES.map((d) => d.id));
  return (
    <>
      <label>
        Data type
        <HelpIcon
          title="Data type"
          style={{
            position: 'absolute',
          }}
          content={
            <>
              By default, all developmental and life stages are considered for
              the enrichment analysis. It is possible to provide a custom
              selection of developmental and life stages, selecting one or
              several developmental and life stages.
            </>
          }
        />
      </label>
      <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper mt-2">
        {DATA_TYPES.map((c) => (
          <label
            className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
            id={c.id}
          >
            <input
              type="checkbox"
              checked={data.find((d) => d === c.id) || false}
              onChange={(e) => {
                setData((prev) => {
                  const curr = [...prev];
                  if (e.target.checked) {
                    curr.push(c.id);
                  } else {
                    const pos = curr.findIndex((d) => d === c.id);
                    if (pos >= 0) curr.splice(pos, 1);
                  }
                  return curr;
                });
              }}
            />
            <b className="mx-1">{c.label}</b>
          </label>
        ))}
        <Bulma.Button
          className="search-form"
          disabled={
            JSON.stringify(data.sort()) ===
            JSON.stringify(DATA_TYPES.map((d) => d.id).sort())
          }
          onClick={() => setData(DATA_TYPES.map((d) => d.id))}
        >
          Select All
        </Bulma.Button>
        <Bulma.Button
          className="search-form"
          disabled={data.length === 0}
          onClick={() => setData([])}
        >
          Unselect All
        </Bulma.Button>
      </div>
    </>
  );
};

export default DataType;
