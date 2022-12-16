import React from 'react';
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
        <label htmlFor="hasTissueSubStructure">Including substructures</label>
      </div>
    </>
  );
};

export default Tissues;
