import React from 'react';
import useLogic from './useLogic';
import HelpIcon from '../../../../../../components/HelpIcon';
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
        <HelpIcon
          className="helpIcon"
          title="Developmental and life stage"
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
      <SelectMultipleWithAutoComplete
        placeholder="Search Development and life stage"
        getOptionsFunction={getOptionsFunction}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        minCharToSearch={0}
      />
      <div className="checkboxWrapper">
        <input
          id="hasDevStageSubStructure"
          type="checkbox"
          checked={hasDevStageSubStructure ? 'checked' : ''}
          onChange={() => setDevStageSubStructure((value) => !value)}
        />
        <label htmlFor="hasDevStageSubStructure">Including substrcutures</label>
      </div>
    </>
  );
};

export default DevelopmentalAndLifeStages;
