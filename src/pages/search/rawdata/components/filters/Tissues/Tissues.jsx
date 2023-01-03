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
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Examples: 'brain', 'UBERON:0000948'"
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
        <HelpIcon
          style={{
            height: '21px',
          }}
          content={
            <>
              Retrieve data in the substructures of the selected terms, for
              instance to retrieve data in all subparts of the brain.
            </>
          }
        />
      </div>
    </>
  );
};

export default Tissues;
