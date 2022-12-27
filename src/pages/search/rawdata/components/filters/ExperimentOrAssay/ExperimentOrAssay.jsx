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
        <span className="boldTitle">Experiment or assay ID</span>
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Examples: 'GTEx', 'GSE30611'"
        getOptionsFunction={getExpOrAssayOptions}
        selectedOptions={selectedExpOrAssay}
        setSelectedOptions={setSelectedExpOrAssay}
      />
    </>
  );
};

export default ExperimentOrAssay;
