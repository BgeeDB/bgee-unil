import React from 'react';
import Button from '../../../../../components/Bulma/Button/Button';
import CellTypes from '../../../rawdata/components/filters/CellTypes';
import DevelopmentalAndLifeStages from '../../../rawdata/components/filters/DevelopmentalAndLifeStages';
import ExperimentOrAssay from '../../../rawdata/components/filters/ExperimentOrAssay';
import Gene from '../../../rawdata/components/filters/Gene';
import Sex from '../../../rawdata/components/filters/Sex';
import Species from '../../../rawdata/components/filters/Species';
import Strain from '../../../rawdata/components/filters/Strain';
import Tissues from '../../../rawdata/components/filters/Tissues';

const SearchForm = ({
  show,
  devStages,
  hasDevStageSubStructure,
  selectedDevStages,
  selectedSpecies,
  selectedCellTypes,
  hasTissueSubStructure,
  hasCellTypeSubStructure,
  selectedStrain,
  selectedGene,
  selectedExpOrAssay,
  selectedTissue,
  speciesSexes,
  selectedSexes,
  onChangeSpecies,
  getSpeciesLabel,
  setSelectedCellTypes,
  setSelectedTissue,
  toggleSex,
  setSelectedStrain,
  setSelectedGene,
  setSelectedExpOrAssay,
  setHasTissueSubStructure,
  setSelectedDevStages,
  setDevStageSubStructure,
  setHasCellTypeSubStructure,
  setShow,
  autoCompleteByType,
  onSubmit,
  resetForm,
}) => (
  <>
    {show && (
      <>
        <label className="title-raw">Search for experiments</label>
        <div className="columns is-8">
          <div className="column mr-6">
            <div className="mb-2">
              <Species
                selectedSpecies={selectedSpecies}
                onChangeSpecies={onChangeSpecies}
                getSpeciesLabel={getSpeciesLabel}
              />
            </div>
            {selectedSpecies.value && (
              <div>
                <div className="my-2">
                  <Tissues
                    selectedTissue={selectedTissue}
                    setSelectedTissue={setSelectedTissue}
                    autoCompleteByType={autoCompleteByType}
                    hasTissueSubStructure={hasTissueSubStructure}
                    setHasTissueSubStructure={setHasTissueSubStructure}
                  />
                </div>
                <div className="my-2">
                  <CellTypes
                    selectedCellTypes={selectedCellTypes}
                    setSelectedCellTypes={setSelectedCellTypes}
                    autoCompleteByType={autoCompleteByType}
                    hasCellTypeSubStructure={hasCellTypeSubStructure}
                    setHasCellTypeSubStructure={setHasCellTypeSubStructure}
                  />
                </div>
                <div className="my-2">
                  <DevelopmentalAndLifeStages
                    devStages={devStages}
                    hasDevStageSubStructure={hasDevStageSubStructure}
                    setDevStageSubStructure={setDevStageSubStructure}
                    selectedOptions={selectedDevStages}
                    setSelectedOptions={setSelectedDevStages}
                  />
                </div>
                <div className="my-2">
                  <Sex
                    speciesSexes={speciesSexes}
                    selectedSexes={selectedSexes}
                    toggleSex={toggleSex}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="column">
            <div>
              {selectedSpecies.value && (
                <>
                  <div className="mb-2">
                    <Strain
                      selectedStrain={selectedStrain}
                      setSelectedStrain={setSelectedStrain}
                      autoCompleteByType={autoCompleteByType}
                    />
                  </div>
                  <div className="mb-2">
                    <Gene
                      selectedGene={selectedGene}
                      setSelectedGene={setSelectedGene}
                      autoCompleteByType={autoCompleteByType}
                    />
                  </div>
                </>
              )}
              <div className="mb-2">
                <ExperimentOrAssay
                  selectedExpOrAssay={selectedExpOrAssay}
                  setSelectedExpOrAssay={setSelectedExpOrAssay}
                  autoCompleteByType={autoCompleteByType}
                />
              </div>
              <div className="submit-reinit">
                <Button
                  className="button is-success is-light is-outlined"
                  type="submit"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
                <Button
                  className="reinit is-warning is-light is-outlined"
                  onClick={() => resetForm(false)}
                >
                  Reinitialize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    <div className="control is-flex is-align-items-center">
      <button
        className="button mr-2 mb-5"
        type="button"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide Filter' : 'Show Filter'}
      </button>
    </div>
  </>
);

export default SearchForm;
