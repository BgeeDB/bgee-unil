/* eslint-disable no-use-before-define */
import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import { getGeneLabel } from '../../../helpers/gene';
import { getIdAndNameLabel } from '../../../helpers/selects';
import PATHS from '../../../routes/paths';
import { flattenDevStagesList } from './components/filters/DevelopmentalAndLifeStages/useLogic';
import { EMPTY_SPECIES_VALUE } from './components/filters/Species/Species';

const AFFYMETRIX = 'AFFYMETRIX';
const EST = 'EST';
const IN_SITU = 'IN_SITU';
const RNA_SEQ = 'RNA_SEQ';
const FULL_LENGTH = 'FULL_LENGTH';

export const DATA_TYPES = [
  { id: FULL_LENGTH, label: 'scRNA-Seq full-length' },
  { id: RNA_SEQ, label: 'bulk RNA-Seq' },
  { id: AFFYMETRIX, label: 'Affymetrix data' },
  { id: IN_SITU, label: 'In situ hybridization' },
  { id: EST, label: 'EST' },
];

const useLogic = () => {
  const history = useHistory();

  // http://localhost:3000/search/raw-data-annotations/?data=cec94e401483b2364953832916cf1410a756e7f8

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

  // console.log('initGene = ', initGene);
  // console.log('initStrain = ', initStrain);
  // console.log('initTissue = ', initTissue);
  // console.log('initSex = ', initSex);

  // lists
  const [speciesSexes, setSpeciesSexes] = useState([]);
  const [devStages, setDevStages] = useState([]);

  // Form
  const [selectedSpecies, setSelectedSpecies] = useState(EMPTY_SPECIES_VALUE);
  const [selectedTissue, setSelectedTissue] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState([]);
  const [selectedCellTypes, setSelectedCellTypes] = useState([]);
  const [selectedGene, setSelectedGene] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [selectedExpOrAssay, setSelectedExpOrAssay] = useState([]);
  const [selectedDevStages, setSelectedDevStages] = useState([]);
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
    // if (newSpecies.value !== EMPTY_SPECIES_VALUE.value) {
    //   getSexesAndDevStageForSpecies(newSpecies.value);
    // }
    setSelectedSpecies(newSpecies);
    setSelectedCellTypes([]);
    setSelectedGene([]);
    setSelectedStrain([]);
    setSelectedTissue([]);
    setSelectedSexes([]);
  };

  useEffect(() => {
    triggerSearch();
    triggerCounts();
  }, [dataType]);

  useEffect(() => {
    if (selectedSpecies.value !== EMPTY_SPECIES_VALUE.value) {
      getSexesAndDevStageForSpecies();
      resetForm(true);
    }
  }, [selectedSpecies]);

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
          initTissues.push({
            label: getIdAndNameLabel(foundTissue),
            value: tissueId,
          });
        }
      });
      setSelectedTissue(initTissues);
    }

    // Cell types
    if (requestParameters?.cell_type_id?.length > 0) {
      const initCelleTypes = [];
      requestParameters?.cell_type_id.forEach((cellTypeId) => {
        const foundCellType = cellTypesAndTissues.find(
          (t) => t.id === cellTypeId
        );
        if (foundCellType) {
          initCelleTypes.push({
            label: getIdAndNameLabel(foundCellType),
            value: cellTypeId,
          });
        }
      });
      setSelectedCellTypes(initCelleTypes);
    }

    // Dev Stage
    if (requestParameters?.stage_id?.length > 0) {
      const initDevStage = [];
      const flattenedList = flattenDevStagesList(
        requestDetails?.requestedSpeciesDevStageOntology
      );
      requestParameters?.stage_id.forEach((devStageId) => {
        const foundDevStage = flattenedList.find((t) => t.id === devStageId);
        if (foundDevStage) {
          initDevStage.push({
            label: getIdAndNameLabel(foundDevStage),
            value: devStageId,
          });
        }
      });
      setSelectedDevStages(initDevStage);
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
    selectedDevStages: selectedDevStages.map((ds) => ds.value),
    selectedSexes: selectedSexes.length > 0 ? selectedSexes : ['all'],
    hasCellTypeSubStructure,
    hasDevStageSubStructure,
    hasTissueSubStructure,
  });

  const triggerSearch = async () => {
    const params = getSearchParams();
    return api.search.rawData
      .search(params, false)
      .then((resp) => {
        if (resp.code === 200) {
          setSearchResult(resp?.data);

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
          setHash(null);
        }
        return [];
      })
      .catch((e) => {
        console.log('catch e = ', e);
        // if (
        //   e?.data?.data?.exceptionType === 'RequestParametersNotFoundException'
        // ) {
        history.push(PATHS.SEARCH.RAW_DATA_ANNOTATIONS);
        // }
      });
  };

  const triggerCounts = async () =>
    api.search.rawData.search(getSearchParams(), true).then((resp) => {
      if (resp.code === 200) {
        setCounts(resp?.data?.resultCount);
      }
      return [];
    });

  const getSexesAndDevStageForSpecies = () => {
    api.search.species
      .speciesDevelopmentSexe(selectedSpecies.value)
      .then((resp) => {
        if (resp.code === 200) {
          setSpeciesSexes(resp.data?.requestDetails?.requestedSpeciesSexes);
          setDevStages(
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

  const getSpeciesLabel = (specie) =>
    `${specie.genus} ${specie.speciesName} - ${
      specie.name ? `${specie.name}` : ''
    }`;

  const toggleSex = (sexName) => {
    const i = selectedSexes.indexOf(sexName);
    // Cas particulier du "all"
    if (selectedSexes.length === 1 && selectedSexes[0] === 'all') {
      setSelectedSexes([sexName]);
    }

    if (i === -1) {
      setSelectedSexes([...selectedSexes, sexName]);
    } else {
      const nextSexes = [...selectedSexes];
      nextSexes.splice(i, 1);
      setSelectedSexes(nextSexes);
    }
  };

  const resetForm = (isSpeciesChange = false) => {
    setSelectedCellTypes([]);
    setSelectedGene([]);
    setSelectedStrain([]);
    setSelectedTissue([]);
    setSelectedSexes([]);
    setSelectedDevStages([]);
    setHasCellTypeSubStructure(false);
    setHasTissueSubStructure(false);
    setDevStageSubStructure(false);
    if (!isSpeciesChange) {
      setSelectedSpecies(EMPTY_SPECIES_VALUE);
      setSelectedExpOrAssay([]);
    }
  };

  return {
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
  };
};

export default useLogic;
