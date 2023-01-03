import React from 'react';
import HelpIcon from '../../../../../../components/HelpIcon';
import SelectMultipleWithAutoComplete from '../../../../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import { getIdAndNameLabel } from '../../../../../../helpers/selects';

const CellTypes = ({
  selectedCellTypes,
  setSelectedCellTypes,
  autoCompleteByType,
  hasCellTypeSubStructure,
  setHasCellTypeSubStructure,
}) => {
  const getCellTypeOptions = autoCompleteByType('cell_type', (result) => ({
    label: getIdAndNameLabel(result?.object),
    value: result?.object?.id,
    result,
  }));

  return (
    <>
      <label className="labelWithHelpIcon">
        <span>Cell type</span>
      </label>
      <SelectMultipleWithAutoComplete
        placeholder="Examples: 'neuron', 'CL:0000187'"
        getOptionsFunction={getCellTypeOptions}
        selectedOptions={selectedCellTypes}
        setSelectedOptions={setSelectedCellTypes}
      />
      <div className="checkboxWrapper">
        <input
          id="hasCellTypeSubStructure"
          type="checkbox"
          checked={hasCellTypeSubStructure ? 'checked' : ''}
          onChange={() => setHasCellTypeSubStructure((current) => !current)}
        />
        <label htmlFor="hasCellTypeSubStructure">Including substructures</label>
        <HelpIcon
          style={{
            height: '21px',
          }}
          content={
            <>
              Retrieve data in the substructures of the selected terms, for
              instance to retrieve data in all sub-cell-types of neuron cell.
            </>
          }
        />
      </div>
    </>
  );
};

export default CellTypes;
