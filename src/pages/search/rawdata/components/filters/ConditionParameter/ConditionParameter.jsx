import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import { COND_PARAM2 } from '../../../useLogic';

const ConditionParameter = ({ conditionalParam2, setConditionalParam2 }) => {
  const toggle = (id) => {
    const indexOfValue = conditionalParam2.indexOf(id);
    if (indexOfValue === -1) {
      setConditionalParam2([...conditionalParam2, id]);
    } else {
      const nextCondtional = [...conditionalParam2];
      nextCondtional.splice(indexOfValue, 1);
      setConditionalParam2(nextCondtional);
    }
  };

  return (
    <div className="mt-4">
      <label>
        Condition parameters
        <HelpIcon
          style={{
            position: 'absolute',
          }}
          content={<>TODO: Help condition parameters</>}
        />
      </label>
      <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper mt-2">
        {COND_PARAM2.map((c) => {
          const isSelected = conditionalParam2.includes(c.id);
          return (
            <label
              className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
              key={c.id}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(c.id)}
              />
              <b className="mx-1">{c.label}</b>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ConditionParameter;
