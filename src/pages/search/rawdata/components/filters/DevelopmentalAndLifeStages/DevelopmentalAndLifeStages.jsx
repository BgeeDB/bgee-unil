/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';
import useLogic from './useLogic';
import HelpIcon from '../../../../../../components/HelpIcon';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import obolibraryLinkFromID from '../../../../../../helpers/obolibraryLinkFromID';

const DevelopmentalAndLifeStages = ({
  devStages,
  hasDevStageSubStructure,
  setDevStageSubStructure,
  selectedOptions,
  setSelectedOptions,
}) => {
  const { getOptionsFunction } = useLogic({ devStages });

  const optionActions = useCallback(
    (option) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={obolibraryLinkFromID(option.value)}
        className="external-link"
      />
    ),
    []
  );

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
        minCharToSearch={0}
        placeholder="Search Development and life stage"
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        getOptionsFunction={getOptionsFunction}
        optionActions={optionActions}
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
