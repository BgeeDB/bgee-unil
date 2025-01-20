import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import { COND_PARAM2 } from '../../../useLogic';

const ConditionParameter = ({ conditionalParam2, setConditionalParam2, selectedSpecies }) => {
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

  const label = selectedSpecies === 9606 ? 'ethnicities' : 'strains';
  const Label = selectedSpecies === 9606 ? 'Ethnicity'   : 'Strain';

  // Override c.label from pages/search/rawdata/useLogic.js by Label because when COND_PARAM2.label is defined, the species taxid is not yet known!
  return (
    <div className="mt-4">
      <label>
        Condition parameters
        <HelpIcon
          style={{
            position: 'absolute',
          }}
          content={
            <>
              {`Select the condition parameters to consider, that were used to
              produce the expression calls. For instance, if you only select
              "Anatomical localization", each expression call will have been
              produced for a specific organ or cell type, integrating data at
              all stages, sexes, and ${label} available for this organ. If you
              select "Anatomical localization" and "Development and life stage",
              expression calls will have been produced for this organ at this
              stage, integrating data from all sexes and ${label} available.
              Therefore the calls have different FDR, call type, etc, depending
              on this selection of condition parameters.`}
            </>
          }
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
              <b className="mx-1">{Label}</b>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ConditionParameter;
