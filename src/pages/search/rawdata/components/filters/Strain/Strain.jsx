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
        placeholder="Search Strain"
        getOptionsFunction={getStrainOptions}
        selectedOptions={selectedStrain}
        setSelectedOptions={setSelectedStrain}
      />
    </>
  );
};

export default Strain;
