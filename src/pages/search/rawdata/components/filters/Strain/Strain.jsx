import React from 'react';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';

const Strain = ({ selectedStrain, setSelectedStrain, autoCompleteByType }) => {
  const getStrainOptions = autoCompleteByType('strain', (result) => ({
    label: result?.object,
    value: result?.object,
    result,
  }));

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Strain and ethnicity</span>
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Examples: 'C57BL/6' (for mouse), 'White' (for human)"
        getOptionsFunction={getStrainOptions}
        selectedOptions={selectedStrain}
        setSelectedOptions={setSelectedStrain}
        minCharToSearch={2}
      />
    </>
  );
};

export default Strain;
