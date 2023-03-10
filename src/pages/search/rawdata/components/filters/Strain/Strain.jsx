import React from 'react';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { COND_PARAM2_STRAIN_KEY } from '../../../useLogic';

const Strain = ({
  selectedStrain,
  setSelectedStrain,
  autoCompleteByType,
  addConditionalParam,
}) => {
  const getStrainOptions = autoCompleteByType('strain', (result) => ({
    label: result?.object,
    value: result?.object,
    result,
  }));

  const onSelect = (nextValue) => {
    setSelectedStrain(nextValue);
    addConditionalParam(COND_PARAM2_STRAIN_KEY);
  };

  return (
    <>
      <SelectMultipleWithAutoComplete
        label="Strain and ethnicity"
        placeholder="Examples: 'C57BL/6' (for mouse), 'White' (for human)"
        getOptionsFunction={getStrainOptions}
        selectedOptions={selectedStrain}
        setSelectedOptions={onSelect}
        minCharToSearch={2}
      />
    </>
  );
};

export default Strain;