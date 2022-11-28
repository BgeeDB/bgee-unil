import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
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
        <HelpIcon
          title="Experiment or assay ID"
          className="helpIcon"
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
        placeholder="Search Experiment or Assay ID"
        getOptionsFunction={getExpOrAssayOptions}
        selectedOptions={selectedExpOrAssay}
        setSelectedOptions={setSelectedExpOrAssay}
      />
    </>
  );
};

export default ExperimentOrAssay;
