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
      <SelectMultipleWithAutoComplete
        label="Experiment or assay ID"
        hasBoldLabel
        placeholder="Examples: 'GTEx', 'GSE30611'"
        getOptionsFunction={getExpOrAssayOptions}
        selectedOptions={selectedExpOrAssay}
        setSelectedOptions={setSelectedExpOrAssay}
      />
    </>
  );
};

export default ExperimentOrAssay;
