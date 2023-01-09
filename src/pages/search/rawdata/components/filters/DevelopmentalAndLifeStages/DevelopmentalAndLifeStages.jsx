/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import useLogic from './useLogic';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import HelpIcon from '../../../../../../components/HelpIcon';
import { COND_PARAM2_DEVSTAGE_KEY } from '../../../useLogic';

const DevelopmentalAndLifeStages = ({
  devStages,
  hasDevStageSubStructure,
  setDevStageSubStructure,
  selectedOptions,
  setSelectedOptions,
  addConditionalParam,
}) => {
  const { getOptionsFunction } = useLogic({ devStages });

  const onSelect = (nextValue) => {
    setSelectedOptions(nextValue);
    addConditionalParam(COND_PARAM2_DEVSTAGE_KEY);
  };

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Developmental and life stage</span>
      </label>
      <SelectMultipleWithAutoComplete
        minCharToSearch={0}
        placeholder="Select a term in the simplified tree view"
        selectedOptions={selectedOptions}
        setSelectedOptions={onSelect}
        getOptionsFunction={getOptionsFunction}
      />
      <div className="checkboxWrapper">
        <input
          id="hasDevStageSubStructure"
          type="checkbox"
          checked={hasDevStageSubStructure ? 'checked' : ''}
          onChange={() => setDevStageSubStructure((value) => !value)}
        />
        <label htmlFor="hasDevStageSubStructure">Including child terms</label>
        <HelpIcon
          style={{
            height: '21px',
          }}
          content={
            <>
              Retrieve data in the child terms of the selected terms, for
              instance to retrieve data for all specific ages in adult.
            </>
          }
        />
      </div>
    </>
  );
};

export default DevelopmentalAndLifeStages;
