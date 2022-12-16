import React from 'react';
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
        placeholder="Search Cell Type"
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
      </div>
    </>
  );
};

export default CellTypes;
