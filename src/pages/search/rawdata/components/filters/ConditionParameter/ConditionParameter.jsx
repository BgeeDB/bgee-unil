import React, { useState } from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';

const ConditionParameter = () => {
  const CUSTOM_FIELDS = [
    {
      key: 'anat',
      text: 'Anatomy',
    },
    {
      key: 'devStage',
      text: 'Development and life stage stage',
    },
    {
      key: 'sex',
      text: 'Sex',
    },
    {
      key: 'strain',
      text: 'Strain',
    },
  ];

  const [cFields, setCFields] = useState({ anat: true });

  return (
    <div className="mt-4">
      <label>
        Conditions parameters
        <HelpIcon
          title="Conditions parameters"
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
        {CUSTOM_FIELDS.map((c) => (
          <label
            className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
            key={c.key}
          >
            <input
              type="checkbox"
              checked={cFields[c.key] || false}
              onChange={(e) => {
                setCFields((prev) => ({
                  ...prev,
                  [c.key]: e.target.checked || undefined,
                }));
              }}
            />
            <b className="mx-1">{c.text}</b>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ConditionParameter;
