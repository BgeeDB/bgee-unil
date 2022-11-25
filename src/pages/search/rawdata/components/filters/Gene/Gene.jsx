import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
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
        <HelpIcon
          className="helpIcon"
          title="Gene"
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
        placeholder="Search Gene"
        getOptionsFunction={getOptionsFunctionGenes}
        selectedOptions={selectedGene}
        setSelectedOptions={setSelectedGene}
      />
    </>
  );
};

export default Gene;
