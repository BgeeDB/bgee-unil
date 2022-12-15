import React from 'react';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { getGeneLabel } from '../../../../../../helpers/gene';

const Gene = ({ selectedGene, setSelectedGene, autoCompleteByType }) => {
  const getOptionsFunctionGenes = autoCompleteByType('gene', (result) => ({
    label: getGeneLabel(result?.gene),
    value: result?.gene?.geneId,
    result,
  }));

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Gene</span>
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Search Gene"
        getOptionsFunction={getOptionsFunctionGenes}
        selectedOptions={selectedGene}
        setSelectedOptions={setSelectedGene}
      />
    </>
  );
};

export default Gene;
