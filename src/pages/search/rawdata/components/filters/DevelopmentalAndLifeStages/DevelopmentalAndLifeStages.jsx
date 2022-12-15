/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import useLogic from './useLogic';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';

const DevelopmentalAndLifeStages = ({
  devStages,
  hasDevStageSubStructure,
  setDevStageSubStructure,
  selectedOptions,
  setSelectedOptions,
}) => {
  const { getOptionsFunction } = useLogic({ devStages });

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Developmental and life stage</span>
      </label>
      <SelectMultipleWithAutoComplete
        minCharToSearch={0}
        placeholder="Search Developmental and life stage"
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
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
      </div>
    </>
  );
};

export default DevelopmentalAndLifeStages;
