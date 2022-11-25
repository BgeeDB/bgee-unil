import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { getIdAndNameLabel } from '../../../../../../helpers/selects';

const Tissues = ({
  selectedTissue,
  setSelectedTissue,
  autoCompleteByType,
  hasTissueSubStructure,
  setHasTissueSubStructure,
}) => {
  const getTissueOptions = autoCompleteByType('anat_entity', (result) => ({
    label: getIdAndNameLabel(result?.object),
    value: result?.object?.id,
    result,
  }));

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Tissue</span>
        <HelpIcon
          className="helpIcon"
          title="Tissue"
          content={
            <>
              By default, all developmental and life stage are considered for
              the enrichment analysis. It is possible to provide a custom
              selection of developmental and life stage, selecting one or
              several developmental and life stage.
            </>
          }
        />
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Search Tissue"
        getOptionsFunction={getTissueOptions}
        selectedOptions={selectedTissue}
        setSelectedOptions={setSelectedTissue}
      />
      <div className="checkboxWrapper">
        <input
          id="hasTissueSubStructure"
          type="checkbox"
          checked={hasTissueSubStructure ? 'checked' : ''}
          onChange={() => setHasTissueSubStructure((current) => !current)}
        />
        <label htmlFor="hasTissueSubStructure">Including substrcutures</label>
      </div>
    </>
  );
};

export default Tissues;
