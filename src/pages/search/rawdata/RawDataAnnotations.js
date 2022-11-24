/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import Button from '../../../components/Bulma/Button/Button';
import HelpIcon from '../../../components/HelpIcon';
import './rawDataAnnotations.scss';
import RawDataAnnotationResults from './RawDataAnnotationResults';
import SelectMultipleWithAutoComplete from '../../../components/SelectMultipleWithAtuComplete/SelectMultipleWithAutoComplete';
import PATHS from '../../../routes/paths';

const EMPTY_SPECIES_VALUE = { label: 'Any species', value: '' };

// http://localhost:3000/search/raw-data-annotations/?data=cec94e401483b2364953832916cf1410a756e7f8

const AFFYMETRIX = 'AFFYMETRIX';
const EST = 'EST';
const IN_SITU = 'IN_SITU';
const RNA_SEQ = 'RNA_SEQ';
const FULL_LENGTH = 'FULL_LENGTH';
const DATA_TYPES = [
  { id: FULL_LENGTH, label: 'scRNA-Seq full-length' },
  { id: RNA_SEQ, label: 'bulk RNA-Seq' },
  { id: AFFYMETRIX, label: 'Affymetrix data' },
  { id: IN_SITU, label: 'In situ hybridization' },
  { id: EST, label: 'EST' },
];

const RawDataAnnotations = () => {
  const history = useHistory();

  // Init from URL
  const loc = useLocation();
  const initSearch = new URLSearchParams(loc.search);
  const initHash = initSearch.get('data');
  const [hash, setHash] = useState(initHash);

  // const initGene = initSearch.getAll('gene_id') || [];
  // const initStrain = initSearch.getAll('strain') || [];
  // const initTissue = initSearch.getAll('anat_entity_id') || [];
  // const initSex = initSearch.getAll('sex') || [];
  // const initHasCellTypeSubStructure =
  //   initSearch.get('cell_type_descendant') || false;
  // const initHasTissueSubStructure =
  //   initSearch.get('anat_entity_descendant') || false;
  // const initHasDevStageSubStructure =
  //   initSearch.get('stage_descendant') || false;

  // lists
  const [speciesList, setSpeciesList] = useState([]);
  const [speciesSexes, setSpeciesSexes] = useState([]);
  const [devStage, setDevStage] = useState([]);

  // Form
  const [selectedSpecies, setSelectedSpecies] = useState(EMPTY_SPECIES_VALUE);
  const [selectedTissue, setSelectedTissue] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState([]);
  const [selectedCellTypes, setSelectedCellTypes] = useState([]);
  const [selectedGene, setSelectedGene] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [selectedExpOrAssay, setSelectedExpOrAssay] = useState([]);
  const [hasCellTypeSubStructure, setHasCellTypeSubStructure] = useState(false);
  const [hasTissueSubStructure, setHasTissueSubStructure] = useState(false);
  const [hasDevStageSubStructure, setDevStageSubStructure] = useState(false);
  // const [selectExp, setSelectExp] = useState([]);

  // results
  const [show, setShow] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [dataType, setDataType] = useState(AFFYMETRIX);
  const [counts, setCounts] = useState({});

  const onChangeSpecies = (newSpecies) => {
    console.log('species changed erase all form');
    if (newSpecies.value !== EMPTY_SPECIES_VALUE.value) {
      getSexesAndDevStageForSpecies(newSpecies.value);
    }
    setSelectedSpecies(newSpecies);
    setSelectedCellTypes([]);
    setSelectedGene([]);
    setSelectedStrain([]);
    setSelectedTissue([]);
    setSelectedSexes([]);
  };

  useEffect(() => {
    triggerSearch();
  }, [dataType]);

  useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
  }, []);

  const onSubmit = () => {
    triggerCounts();
    triggerSearch();
  };

  const setInitDataFromDetailedRP = (resp) => {
    const { requestParameters, data } = resp;
    const { requestDetails } = data;
    setDataType(requestParameters.data_type[0]);

    // Species
    if (requestDetails?.requestedSpecies) {
      setSelectedSpecies({
        label: getSpeciesLabel(requestDetails?.requestedSpecies),
        value: requestDetails?.requestedSpecies?.id,
      });
    }

    // Sexes
    if (requestDetails?.requestedSpeciesSexes?.length > 0) {
      setSpeciesSexes(requestDetails?.requestedSpeciesSexes);
    }
    if (
      requestParameters?.sex?.length > 0 &&
      requestParameters?.sex[0] !== 'all'
    ) {
      setSelectedSexes(requestParameters?.sex);
    }

    // Genes
    if (requestDetails?.requestedGenes?.length > 0) {
      const initGenes = requestDetails?.requestedGenes.map((g) => ({
        label: getGeneLabel(g),
        value: g.geneId,
      }));
      setSelectedGene(initGenes);
    }

    // Tissues (anatEntities)
    const cellTypesAndTissues =
      requestDetails?.requestedAnatEntitesAndCellTypes || [];
    if (requestParameters?.anat_entity_id?.length > 0) {
      const initTissues = [];
      requestParameters?.anat_entity_id.forEach((tissueId) => {
        const foundTissue = cellTypesAndTissues.find((t) => t.id === tissueId);
        if (foundTissue) {
          initTissues.push({ label: foundTissue.name, value: tissueId });
        }
      });
      setSelectedTissue(initTissues);
    }

    // Celle types
    if (requestParameters?.cell_type_id?.length > 0) {
      const initCelleTypes = [];
      requestParameters?.cell_type_id.forEach((cellTypeId) => {
        const foundCellType = cellTypesAndTissues.find(
          (t) => t.id === cellTypeId
        );
        if (foundCellType) {
          initCelleTypes.push({ label: foundCellType.name, value: cellTypeId });
        }
      });
      setSelectedCellTypes(initCelleTypes);
    }

    // Strain
    if (requestParameters?.strain?.length > 0) {
      setSelectedStrain(
        requestParameters?.strain.map((s) => ({ value: s, label: s }))
      );
    }

    // Exp or Assay ID
    // @TODO
    if (requestParameters?.exp_assay_id?.length) {
      console.log('assay = ', requestParameters?.exp_assay_id);
      // setSelectedExpOrAssay();
    }

    // SubStructures
    if (requestParameters?.anat_entity_descendant === 'true') {
      setHasTissueSubStructure(true);
    }
    if (requestParameters?.cell_type_descendant === 'true') {
      setHasCellTypeSubStructure(true);
    }
    if (requestParameters?.stage_descendant === 'true') {
      setDevStageSubStructure(true);
    }
  };

  const getSearchParams = () => ({
    hash,
    dataType,
    selectedExpOrAssay: selectedExpOrAssay.map((exp) => exp.value),
    selectedSpecies: selectedSpecies.value,
    selectedCellTypes: selectedCellTypes.map((ct) => ct.value),
    selectedGene: selectedGene.map((g) => g.value),
    selectedStrain: selectedStrain.map((s) => s.value),
    selectedTissue: selectedTissue.map((t) => t.value),
    selectedSexes: selectedSexes.length > 0 ? selectedSexes : ['all'],
    hasCellTypeSubStructure,
    hasDevStageSubStructure,
    hasTissueSubStructure,
  });

  const triggerSearch = async () => {
    const params = getSearchParams();
    console.log('[triggerSearch] params =', params);
    return api.search.rawData
      .search(params, false)
      .then((resp) => {
        if (resp.code === 200) {
          setSearchResult(resp?.data);
          console.log('[triggerSearch] resp = ', resp);

          // post première recherche ( => hash !== null ) on met à jour les filtres via le detailed_rp
          if (hash) {
            setInitDataFromDetailedRP(resp);
          }

          // Lors du retour de la requête, si il existe, on met le hash dans l'url
          const newHash = resp?.requestParameters?.data;
          if (newHash) {
            history.push(
              `${PATHS.SEARCH.RAW_DATA_ANNOTATIONS}/?data=${newHash}`
            );
          }
        }
        // Quand que ce soit on écrase le hash après une recherche
        // --> permet l'utilisation des filtres dans la prochaine requête
        if (hash) {
          console.log('-- erase hash -- ');
          setHash(null);
        }
        return [];
      })
      .catch((e) => {
        console.log('catch e = ', e);
        if (
          e?.data?.data?.exceptionType === 'RequestParametersNotFoundException'
        ) {
          history.push(PATHS.SEARCH.RAW_DATA_ANNOTATIONS);
        }
      });
  };

  const triggerCounts = async () =>
    api.search.rawData.search(getSearchParams(), true).then((resp) => {
      if (resp.code === 200) {
        setCounts(resp?.data?.resultCount);
      }
      return [];
    });

  const getSexesAndDevStageForSpecies = (nextSpecieValue) => {
    api.search.species.speciesDevelopmentSexe(nextSpecieValue).then((resp) => {
      if (resp.code === 200) {
        setSpeciesSexes(resp.data?.requestDetails?.requestedSpeciesSexes);
        setDevStage(
          resp.data?.requestDetails?.requestedSpeciesDevStageOntology
        );
      } else {
        setSpeciesSexes([]);
      }
    });
  };

  const autoCompleteByType = (type, mappingFn) =>
    useCallback(
      async (query) => {
        if (query) {
          return api.search.genes
            .autoCompleteByType(type, query, selectedSpecies.value)
            .then((resp) => {
              if (resp.code === 200) {
                const results =
                  resp.data.result.searchMatches ||
                  resp.data.result.geneMatches;
                let list = [];
                list = results.map(mappingFn);
                return list;
              }
              return [];
            });
        }
        console.warn('Empty species or query !');
        return [];
      },
      [selectedSpecies.value]
    );

  const getIdAndNameLabel = (obj) =>
    `${obj?.id}${obj?.name ? ` - ${obj?.name}` : ''}`;
  const getGeneLabel = (g) => `${g?.geneId}${g?.name ? ` - ${g?.name}` : ''}`;
  const getSpeciesLabel = (specie) =>
    `${specie.genus.substr(0, 1)} ${specie.speciesName} ${
      specie.name ? `${specie.name}` : ''
    }`;

  const getOptionsFunctionGenes = autoCompleteByType('gene', (result) => ({
    label: getGeneLabel(result?.gene),
    value: result?.gene?.geneId,
    result,
  }));

  const getCellTypeOptions = autoCompleteByType('cell_type', (result) => ({
    label: getIdAndNameLabel(result?.object),
    value: result?.object?.id,
    result,
  }));

  const getStrainOptions = autoCompleteByType('strain', (result) => ({
    label: result?.object,
    value: result?.object,
    result,
  }));

  const getTissueOptions = autoCompleteByType('anat_entity', (result) => ({
    label: getIdAndNameLabel(result?.object),
    value: result?.object?.id,
    result,
  }));

  const getExpOrAssayOptions = autoCompleteByType(
    'experiment_assay',
    (result) => ({
      label: getIdAndNameLabel(result?.object),
      value: result?.object?.id,
      result,
    })
  );

  const metaKeywords = useMemo(() => {
    const list = speciesList.map((s) => ({
      label: getSpeciesLabel(s),
      value: s.id,
    }));

    return [EMPTY_SPECIES_VALUE, ...list];
  }, [speciesList]);

  const toggleSex = (sexName) => {
    const i = selectedSexes.indexOf(sexName);
    // Cas particulier du "all"
    if (selectedSexes.length === 1 && selectedSexes[0] === 'all')
      setSelectedSexes([sexName]);

    if (i === -1) {
      setSelectedSexes([...selectedSexes, sexName]);
    } else {
      const nextSexes = [...selectedSexes];
      nextSexes.splice(i, 1);
      setSelectedSexes(nextSexes);
    }
  };

  return (
    <>
      <div className="container rawDataAnnotation">
        {show && (
          <>
            <label className="title-raw">Search for Raw data annotations</label>
            <div className="row">
              <div className="selector col-sm-6">
                <div className="mb-2">
                  <label className="labelWithHelpIcon">
                    <span>Species</span>
                    <HelpIcon
                      className="helpIcon"
                      title="Species"
                      content={
                        <>
                          By default, all developmental and life stages are
                          considered for the enrichment analysis. It is possible
                          to provide a custom selection of developmental and
                          life stages, selecting one or several developmental
                          and life stages.
                        </>
                      }
                    />
                  </label>
                  <Select
                    options={metaKeywords}
                    className="form-control"
                    value={selectedSpecies}
                    onChange={onChangeSpecies}
                  />
                </div>
                {selectedSpecies.value && (
                  <div>
                    <div className="my-2">
                      <label className="labelWithHelpIcon">
                        <span>Cell type</span>
                        <HelpIcon
                          className="helpIcon"
                          title="Cell type"
                          content={
                            <>
                              By default, all developmental and life stages are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stages, selecting one or
                              several developmental and life stages.
                            </>
                          }
                        />
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
                          onChange={() =>
                            setHasCellTypeSubStructure(!hasCellTypeSubStructure)
                          }
                        />
                        <label htmlFor="hasCellTypeSubStructure">
                          Including substrcutures
                        </label>
                      </div>
                    </div>
                    <div className="my-2">
                      <label className="labelWithHelpIcon">
                        <span>Tissue</span>
                        <HelpIcon
                          className="helpIcon"
                          title="Tissue"
                          content={
                            <>
                              By default, all developmental and life stage are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stage, selecting one or
                              several developmental and life stage.
                            </>
                          }
                        />
                      </label>
                      <SelectMultipleWithAutoComplete
                        placeholder="Search Tissue"
                        getOptionsFunction={getTissueOptions}
                        selectedOptions={selectedTissue}
                        setSelectedOptions={setSelectedTissue}
                      />
                      <div className="checkboxWrapper">
                        <input
                          id="hasTissueSubStructure"
                          type="checkbox"
                          checked={hasTissueSubStructure ? 'checked' : ''}
                          onChange={() =>
                            setHasTissueSubStructure(!hasTissueSubStructure)
                          }
                        />
                        <label htmlFor="hasTissueSubStructure">
                          Including substrcutures
                        </label>
                      </div>
                    </div>
                    <div className="my-2">
                      <label className="labelWithHelpIcon">
                        <span>Developmental and life stage</span>
                        <HelpIcon
                          className="helpIcon"
                          title="Developmental and life stage"
                          content={
                            <>
                              By default, all developmental and life stages are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stages, selecting one or
                              several developmental and life stages.
                            </>
                          }
                        />
                      </label>
                      <Select />
                      <div className="checkboxWrapper">
                        <input
                          id="hasDevStageSubStructure"
                          type="checkbox"
                          checked={hasDevStageSubStructure ? 'checked' : ''}
                          onChange={() =>
                            setDevStageSubStructure(!hasDevStageSubStructure)
                          }
                        />
                        <label htmlFor="hasDevStageSubStructure">
                          Including substrcutures
                        </label>
                      </div>
                    </div>
                    <div className="my-2">
                      <label className="labelWithHelpIcon">
                        <span>Sex</span>
                        <HelpIcon
                          className="helpIcon"
                          title="Developmental and life stages"
                          content={
                            <>
                              By default, all developmental and life stages are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stages, selecting one or
                              several developmental and life stages.
                            </>
                          }
                        />
                      </label>
                      <div className="sex-container">
                        {speciesSexes.map((sex) => {
                          const isChecked =
                            selectedSexes.indexOf(sex.name) !== -1;
                          return (
                            <div
                              id={sex.name}
                              key={sex.name}
                              className="sex-input-name"
                            >
                              <input
                                onChange={() => toggleSex(sex.name)}
                                type="checkbox"
                                checked={isChecked ? 'checked' : ''}
                              />
                              <label
                                onClick={() => toggleSex(sex.name)}
                                htmlFor={sex.name}
                                className="sex-name"
                              >
                                {sex.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6 my-2">
                <div className="input-form">
                  {selectedSpecies.value && (
                    <>
                      <div className="mb-2">
                        <label className="labelWithHelpIcon">
                          <span>Strain</span>
                          <HelpIcon
                            title="Strain"
                            className="helpIcon"
                            content={
                              <>
                                By default, all developmental and life stages
                                are considered for the enrichment analysis. It
                                is possible to provide a custom selection of
                                developmental and life stages, selecting one or
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
                      </div>
                      <div className="mb-2">
                        <label className="labelWithHelpIcon">
                          <span>Gene</span>
                          <HelpIcon
                            className="helpIcon"
                            title="Gene"
                            content={
                              <>
                                By default, all developmental and life stages
                                are considered for the enrichment analysis. It
                                is possible to provide a custom selection of
                                developmental and life stages, selecting one or
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
                      </div>
                    </>
                  )}
                  <div className="mb-2">
                    <label className="labelWithHelpIcon">
                      <span>Experiment or assay ID</span>
                      <HelpIcon
                        title="Experiment or assay ID"
                        className="helpIcon"
                        content={
                          <>
                            By default, all developmental and life stages are
                            considered for the enrichment analysis. It is
                            possible to provide a custom selection of
                            developmental and life stages, selecting one or
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
                  </div>
                  <div className="submit-reinit">
                    <Button type="submit" onClick={onSubmit}>
                      Submit
                    </Button>
                    <Button className="reinit">Reinitialize</Button>
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
        <div className="is-flex columns ongletWrapper is-centered">
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
                  {searchResult?.resultCount?.[type.id]?.assayCount ||
                    'No data'}
                  )
                </span>
              </div>
            );
          })}
        </div>
        {!!searchResult && (
          <RawDataAnnotationResults
            results={searchResult?.results?.[dataType]}
            filters={searchResult?.filters?.[dataType]}
            resultCount={counts[dataType]}
            dataType={dataType}
            columnDescriptions={searchResult?.columnDescriptions?.[dataType]}
          />
        )}
      </div>
    </>
  );
};

export default RawDataAnnotations;
