import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
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
        <span>Strain</span>
        <HelpIcon
          title="Strain"
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
        placeholder="Search Strain"
        getOptionsFunction={getStrainOptions}
        selectedOptions={selectedStrain}
        setSelectedOptions={setSelectedStrain}
      />
    </>
  );
};

export default Strain;
