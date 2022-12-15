import React from 'react';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { getIdAndNameLabel } from '../../../../../../helpers/selects';

const ExperimentOrAssay = ({
  selectedExpOrAssay,
  setSelectedExpOrAssay,
  autoCompleteByType,
}) => {
  const getExpOrAssayOptions = autoCompleteByType(
    'experiment_assay',
    (result) => ({
      label: getIdAndNameLabel(result?.object),
      value: result?.object?.id,
      result,
    })
  );

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Experiment or assay ID</span>
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Search Experiment or Assay ID"
        getOptionsFunction={getExpOrAssayOptions}
        selectedOptions={selectedExpOrAssay}
        setSelectedOptions={setSelectedExpOrAssay}
      />
    </>
  );
};

export default ExperimentOrAssay;
