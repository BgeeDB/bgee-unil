/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Button from '../../../components/Bulma/Button/Button';
import './rawDataAnnotations.scss';
import RawDataAnnotationResults from './RawDataAnnotationResults';
import DevelopmentalAndLifeStages from './components/filters/DevelopmentalAndLifeStages/DevelopmentalAndLifeStages';
import Species from './components/filters/Species/Species';
import useLogic, {
  DATA_TYPES,
  EXPERIMENTS,
  TAB_PAGE,
  TAB_PAGE_EXPR_CALL,
} from './useLogic';
import CellTypes from './components/filters/CellTypes';
import Tissues from './components/filters/Tissues/Tissues';
import Sex from './components/filters/Sex/Sex';
import Strain from './components/filters/Strain/Strain';
import Gene from './components/filters/Gene/Gene';
import ExperimentOrAssay from './components/filters/ExperimentOrAssay/ExperimentOrAssay';
import RawDataAnnotationsFilters from './RawDataAnnotationsFilters';
import DataType from './components/filters/DataType/DataType';
import ConditionParameter from './components/filters/ConditionParameter';
import ResultTabs from './components/ResultTabs';
import DataQualityParameter from './components/filters/DataQualityParameter';
import CallType from './components/filters/CallType';

const RawDataAnnotations = ({ isExprCalls = false }) => {
  const {
    searchResult,
    allCounts,
    localCount,
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
    filters,
    limit,
    isCountLoading,
    pageNumber,
    pageType,
    dataTypesExpCalls,
    dataQuality,
    conditionalParam2,
    callTypes,
    setCallTypes,
    setConditionalParam2,
    setDataQuality,
    setDataTypesExpCalls,
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
    setFilters,
    triggerSearch,
    triggerCounts,
    setPageType,
  } = useLogic(isExprCalls);

  const defaultResults = searchResult?.results?.[dataType] || [];
  const resultExprsCall = searchResult?.expressionData?.expressionCalls || [];
  const results = isExprCalls ? resultExprsCall : defaultResults;

  const defaultColumDesc = searchResult?.columnDescriptions?.[dataType] || [];
  const columnDescExprsCall = searchResult?.columnDescriptions || [];
  const columnsDesc = isExprCalls ? columnDescExprsCall : defaultColumDesc;

  const countLabels = DATA_TYPES.find((d) => d.id === dataType) || {};

  const countResultKey =
    pageType === EXPERIMENTS ? 'experimentCount' : 'assayCount';
  const maxPage = Math.ceil((localCount?.[countResultKey] || 0) / limit);

  const detailedData = isExprCalls
    ? TAB_PAGE_EXPR_CALL
    : TAB_PAGE.find((d) => d.id === pageType);

  const changePageType = (e, newPageType) => {
    e.preventDefault();
    e.stopPropagation();
    setPageType(newPageType);
  };

  return (
    <>
      <div className="rawDataAnnotation">
        <div className="columns is-8 ongletPageWrapper">
          {isExprCalls ? (
            <span className="ongletPages pageActive">
              {TAB_PAGE_EXPR_CALL.label}
            </span>
          ) : (
            TAB_PAGE.map((type) => {
              const isActive = type.id === pageType;
              return (
                <a
                  onClick={(e) => changePageType(e, type.id)}
                  key={type.id}
                  className={`ongletPages is-centered py-2 px-5 ${
                    isActive ? 'pageActive' : ''
                  }`}
                >
                  {type.label}
                </a>
              );
            })
          )}
        </div>
        {pageType && (
          <div>
            <h2 className="gradient-underline title is-size-5 has-text-primary">
              {detailedData.searchLabel}
            </h2>
            {show && (
              <>
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
                          <Gene
                            selectedGene={selectedGene}
                            setSelectedGene={setSelectedGene}
                            autoCompleteByType={autoCompleteByType}
                          />
                        </div>
                        {((isExprCalls && selectedGene.length > 0) ||
                          !isExprCalls) && (
                          <>
                            <div className="my-2">
                              <Tissues
                                selectedTissue={selectedTissue}
                                setSelectedTissue={setSelectedTissue}
                                autoCompleteByType={autoCompleteByType}
                                hasTissueSubStructure={hasTissueSubStructure}
                                setHasTissueSubStructure={
                                  setHasTissueSubStructure
                                }
                              />
                            </div>
                            <div className="my-2">
                              <CellTypes
                                selectedCellTypes={selectedCellTypes}
                                setSelectedCellTypes={setSelectedCellTypes}
                                autoCompleteByType={autoCompleteByType}
                                hasCellTypeSubStructure={
                                  hasCellTypeSubStructure
                                }
                                setHasCellTypeSubStructure={
                                  setHasCellTypeSubStructure
                                }
                              />
                            </div>
                            <div className="my-2">
                              <DevelopmentalAndLifeStages
                                devStages={devStages}
                                hasDevStageSubStructure={
                                  hasDevStageSubStructure
                                }
                                setDevStageSubStructure={
                                  setDevStageSubStructure
                                }
                                selectedOptions={selectedDevStages}
                                setSelectedOptions={setSelectedDevStages}
                              />
                            </div>
                            <div className="my-2">
                              <Strain
                                selectedStrain={selectedStrain}
                                setSelectedStrain={setSelectedStrain}
                                autoCompleteByType={autoCompleteByType}
                              />
                            </div>
                            <div className="my-2">
                              <Sex
                                speciesSexes={speciesSexes}
                                selectedSexes={selectedSexes}
                                toggleSex={toggleSex}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="column">
                    <div>
                      {isExprCalls ? (
                        <>
                          <DataType
                            dataTypes={dataTypesExpCalls}
                            setDataTypes={setDataTypesExpCalls}
                          />
                          <hr />
                          <ConditionParameter
                            conditionalParam2={conditionalParam2}
                            setConditionalParam2={setConditionalParam2}
                          />
                          <hr />
                          <CallType
                            callTypes={callTypes}
                            setCallTypes={setCallTypes}
                          />
                          <hr />
                          <DataQualityParameter
                            dataQuality={dataQuality}
                            setDataQuality={setDataQuality}
                          />
                        </>
                      ) : (
                        <div className="mb-2">
                          <ExperimentOrAssay
                            selectedExpOrAssay={selectedExpOrAssay}
                            setSelectedExpOrAssay={setSelectedExpOrAssay}
                            autoCompleteByType={autoCompleteByType}
                          />
                        </div>
                      )}
                      <div className="submit-reinit">
                        <Button
                          className="button is-success is-light is-outlined"
                          type="submit"
                          onClick={onSubmit}
                          disabled={isLoading}
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
                {show ? 'Hide Form' : 'Show Form'}
              </button>
            </div>
            <h2 className="gradient-underline title is-size-5 has-text-primary">
              {detailedData.resultLabel}
            </h2>
            {!isExprCalls && (
              <ResultTabs
                dataTypes={DATA_TYPES}
                dataType={dataType}
                setDataType={setDataType}
                allCounts={allCounts}
                pageType={pageType}
                isCountLoading={isCountLoading}
              />
            )}
            <div className="resultPart">
              {isLoading ? (
                <div className="progressWrapper is-justify-content-flex-end	">
                  <progress
                    className="progress is-small is-primary"
                    style={{
                      animationDuration: '2s',
                      width: '10%',
                    }}
                  />
                </div>
              ) : (
                <div className="resultCounts">
                  {isExprCalls ? (
                    <>{`${localCount?.assayCount || 0} expressions`}</>
                  ) : (
                    <>
                      {countLabels.experimentCountLabel &&
                        `${localCount?.experimentCount || 0} ${
                          countLabels.experimentCountLabel
                        } / `}
                      {countLabels.assayCountLabel &&
                        `${localCount?.assayCount || 0} ${
                          countLabels.assayCountLabel
                        }`}
                      {countLabels.libraryCountLabel &&
                        ` / ${localCount?.libraryCount || 0} ${
                          countLabels.libraryCountLabel
                        }`}
                    </>
                  )}
                </div>
              )}
              {!!searchResult && dataType && (
                <RawDataAnnotationsFilters
                  dataFilters={searchResult?.filters?.[dataType]}
                  dataType={dataType}
                  filters={filters}
                  setFilters={setFilters}
                  triggerSearch={triggerSearch}
                  triggerCounts={triggerCounts}
                />
              )}
              {isLoading ? (
                <div className="progressWrapper">
                  <progress
                    className="progress is-small is-primary m-5"
                    style={{
                      animationDuration: '2s',
                      width: '80%',
                    }}
                  />
                </div>
              ) : (
                <RawDataAnnotationResults
                  results={results}
                  resultCount={allCounts[dataType]}
                  dataType={dataType}
                  maxPage={maxPage}
                  columnDescriptions={columnsDesc}
                  pageType={pageType}
                  pageNumber={pageNumber}
                  isExprCalls={isExprCalls}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RawDataAnnotations;
