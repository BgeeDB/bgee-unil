/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Button from '../../../components/Bulma/Button/Button';
import './rawDataAnnotations.scss';
import RawDataAnnotationResults from './RawDataAnnotationResults';
import DevelopmentalAndLifeStages from './components/filters/DevelopmentalAndLifeStages/DevelopmentalAndLifeStages';
import Species from './components/filters/Species/Species';
import useLogic, { DATA_TYPES } from './useLogic';
import CellTypes from './components/filters/CellTypes';
import Tissues from './components/filters/Tissues/Tissues';
import Sex from './components/filters/Sex/Sex';
import Strain from './components/filters/Strain/Strain';
import Gene from './components/filters/Gene/Gene';
import ExperimentOrAssay from './components/filters/ExperimentOrAssay/ExperimentOrAssay';
import RawDataAnnotationsFilters from './RawDataAnnotationsFilters';

const RawDataAnnotations = () => {
  const {
    searchResult,
    counts,
    dataType,
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
    isLoading,
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
    setDataType,
    setShow,
    autoCompleteByType,
    onSubmit,
    resetForm,
  } = useLogic();

  return (
    <>
      <div className="container rawDataAnnotation">
        {show && (
          <>
            <label className="title-raw">Search for Raw data annotations</label>
            <div className="row">
              <div className="selector col-sm-6">
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
                      <CellTypes
                        selectedCellTypes={selectedCellTypes}
                        setSelectedCellTypes={setSelectedCellTypes}
                        autoCompleteByType={autoCompleteByType}
                        hasCellTypeSubStructure={hasCellTypeSubStructure}
                        setHasCellTypeSubStructure={setHasCellTypeSubStructure}
                      />
                    </div>
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
              <div className="col-md-6 my-2">
                <div className="input-form">
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
        <label className="title-raw">Raw data annotations results</label>
        <div className="is-flex ongletWrapper is-centered">
          {DATA_TYPES.map((type) => {
            const isActive = type.id === dataType;
            return (
              <div
                key={type.id}
                onClick={() => setDataType(type.id)}
                className={`onglet column is-centered ${
                  isActive && 'ongletActive'
                }`}
              >
                <span>{type.label}</span>
                <span>
                  (
                  {counts[type.id]?.assayCount !== undefined
                    ? counts[type.id]?.assayCount
                    : 'No data'}
                  )
                </span>
              </div>
            );
          })}
        </div>
        <div className="resultPart">
          {!!searchResult && dataType && (
            <RawDataAnnotationsFilters
              dataFilters={searchResult?.filters?.[dataType]}
              dataType={dataType}
            />
          )}
          {!isLoading ? (
            <RawDataAnnotationResults
              results={searchResult?.results?.[dataType]}
              resultCount={counts[dataType]}
              dataType={dataType}
              columnDescriptions={searchResult?.columnDescriptions?.[dataType]}
            />
          ) : (
            <div className="progressWrapper">
              <progress
                className="progress is-small is-primary m-5"
                style={{
                  animationDuration: '2s',
                  width: '80%',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RawDataAnnotations;
