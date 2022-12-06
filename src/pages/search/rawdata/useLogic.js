/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import { getGeneLabel } from '../../../helpers/gene';
import {
  getIdAndNameLabel,
  getOptionsForFilter,
} from '../../../helpers/selects';
import { flattenDevStagesList } from './components/filters/DevelopmentalAndLifeStages/useLogic';
import { EMPTY_SPECIES_VALUE } from './components/filters/Species/Species';

const AFFYMETRIX = 'AFFYMETRIX';
const EST = 'EST';
const IN_SITU = 'IN_SITU';
const RNA_SEQ = 'RNA_SEQ';
const FULL_LENGTH = 'FULL_LENGTH';

export const DATA_TYPES = [
  {
    id: FULL_LENGTH,
    label: 'scRNA-Seq',
    experimentCountLabel: 'experiments',
    assayCountLabel: 'samples',
    libraryCountLabel: 'libraries',
  },
  {
    id: RNA_SEQ,
    label: 'bulk RNA-Seq',
    experimentCountLabel: 'experiments',
    assayCountLabel: 'samples',
  },
  {
    id: AFFYMETRIX,
    label: 'Affymetrix data',
    experimentCountLabel: 'experiments',
    assayCountLabel: 'chips',
  },
  {
    id: IN_SITU,
    label: 'In situ hybridization',
    experimentCountLabel: 'experiments',
    assayCountLabel: 'evidences lines',
  },
  {
    id: EST,
    label: 'EST',
    assayCountLabel: 'libraries',
  },
];

export const RAW_DATA_ANNOTS = 'raw_data_annots';
export const PROC_EXPR_VALUES = 'proc_expr_values';
export const EXPR_CALLS = 'expr_calls';

export const TAB_PAGE = [
  {
    id: RAW_DATA_ANNOTS,
    label: 'Raw data annotations',
    searchLabel: 'Search for Raw data annotations',
    resultLabel: 'Raw data annotations results',
  },
  {
    id: PROC_EXPR_VALUES,
    label: 'Processed expresion values',
    searchLabel: 'Search for Processed expresion values',
    resultLabel: 'Processed expresion values results',
  },
  {
    id: EXPR_CALLS,
    label: 'Present/absent expression calls',
    searchLabel: 'Search for Present/absent expression calls',
    resultLabel: 'Present/absent expression calls results',
  },
];

const BASE_PAGE_NUMBER = '1';
const BASE_LIMIT = '10';

const useLogic = (pageType) => {
  const history = useHistory();
  // Init from URL
  const loc = useLocation();
  const initSearch = new URLSearchParams(loc.search);
  const initHash = initSearch.get('data');

  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const initDataType = initSearch.get('data_type') || RNA_SEQ;
  const initLimit = initSearch.get('limit') || BASE_LIMIT;
  const initPageNumber = initSearch.get('pageNumber') || BASE_PAGE_NUMBER;

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
  const [hasCellTypeSubStructure, setHasCellTypeSubStructure] = useState(true);
  const [hasTissueSubStructure, setHasTissueSubStructure] = useState(true);
  const [hasDevStageSubStructure, setDevStageSubStructure] = useState(true);

  // results
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [dataType, setDataType] = useState(initDataType);
  // Store all counts per dataType
  const [allCounts, setAllCounts] = useState({});
  // Store only the count of the current DataType ( to match the filters)
  const [localCount, setLocalCount] = useState({});
  const [limit, setLimit] = useState(initLimit);
  const [pageNumber, setPageNumber] = useState(initPageNumber);

  // filters
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const sp = new URLSearchParams(loc.search);
    const nextLimit = sp.get('limit');
    const nextPageNumber = sp.get('pageNumber');
    if (nextLimit !== null) {
      setLimit(nextLimit);
    }
    if (nextPageNumber !== null) {
      setPageNumber(nextPageNumber);
    }
  }, [loc.search]);

  const onChangeSpecies = (newSpecies) => {
    setSelectedSpecies(newSpecies);
    setSelectedCellTypes([]);
    setSelectedGene([]);
    setSelectedStrain([]);
    setSelectedTissue([]);
    setSelectedSexes([]);
  };

  useEffect(() => {
    if (
      (limit !== BASE_LIMIT || pageNumber !== BASE_PAGE_NUMBER) &&
      !isFirstSearch
    ) {
      triggerSearch();
    }
  }, [pageNumber, limit]);

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
    triggerSearch(true);
  };

  const initFormFromDetailedRP = (resp) => {
    const { requestParameters, data } = resp;
    const { requestDetails } = data;

    // Data type
    const nextDataType = requestParameters.data_type[0];
    setDataType(nextDataType);

    // Species
    if (requestDetails?.requestedSpecies) {
      setSelectedSpecies({
        label: getSpeciesLabel(requestDetails?.requestedSpecies),
        value: requestDetails?.requestedSpecies?.id,
      });
    }

    // Sexes
    // les possibles
    if (requestDetails?.requestedSpeciesSexes?.length > 0) {
      setSpeciesSexes(requestDetails?.requestedSpeciesSexes);
    }
    // les sélectionnés
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
    if (requestParameters?.exp_assay_id?.length > 0) {
      const initExpOrAssay = [];
      requestParameters?.exp_assay_id.forEach((expOrAssayId) => {
        const foundExpOrAssay =
          requestDetails?.requestedExperimentAndAssays?.find(
            (t) => t.id === expOrAssayId
          );
        if (foundExpOrAssay) {
          initExpOrAssay.push({
            label: getIdAndNameLabel(foundExpOrAssay),
            value: expOrAssayId,
          });
        }
      });
      setSelectedExpOrAssay(initExpOrAssay);
    }

    // SubStructures
    if (requestParameters?.anat_entity_descendant === 'true') {
      setHasTissueSubStructure(true);
    } else {
      setHasTissueSubStructure(false);
    }
    if (requestParameters?.cell_type_descendant === 'true') {
      setHasCellTypeSubStructure(true);
    } else {
      setHasCellTypeSubStructure(false);
    }
    if (requestParameters?.stage_descendant === 'true') {
      setDevStageSubStructure(true);
    } else {
      setDevStageSubStructure(false);
    }

    // Filters
    const filtersToCheck = data.filters[nextDataType];
    const searchParams = new URLSearchParams(requestParameters);
    const initFilters = {};
    // eslint-disable-next-line no-unused-vars
    Object.entries(filtersToCheck).forEach(([_, f]) => {
      const ids = searchParams.getAll(f.urlParameterName);
      const nextValues = f.values.filter((v) => ids.includes(v.id));
      const nextValuesMapped = getOptionsForFilter(
        nextValues,
        f?.informativeId,
        f?.informativeName
      );
      initFilters[f.urlParameterName] = nextValuesMapped;
    });
    setFilters({ [nextDataType]: initFilters });
  };

  const getSearchParams = () => ({
    hash: initHash,
    isFirstSearch,
    initSearch,
    pageType,
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
    filters: filters[dataType],
    pageNumber,
    limit,
  });

  const triggerSearch = async (
    cleanFilters = false,
    cleanPagination = false
  ) => {
    const params = getSearchParams();
    if (cleanPagination) {
      params.pageNumber = BASE_PAGE_NUMBER;
      params.limit = BASE_LIMIT;
    }
    if (cleanFilters) {
      params.filters = {};
      setFilters({});
    }
    // console.log('[TRIGGER SEARCH] params = ', params);
    setIsLoading(true);
    return api.search.rawData
      .search(params, false)
      .then(({ resp, paramsURLCalled }) => {
        if (resp.code === 200) {
          setSearchResult(resp?.data);
          setLocalCount(resp?.data?.resultCount?.[dataType]);

          // post première recherche ( => hash !== null ) on met à jour les filtres via le detailed_rp
          if (isFirstSearch) {
            initFormFromDetailedRP(resp);
          }

          const searchParams = new URLSearchParams(paramsURLCalled);
          const sp = Object.fromEntries(searchParams.entries());

          // Si il existe un hash on le met dans l'url
          // Et comme les données suivantes sont "codés" dans ce hash...
          // On peut donc "clean" l'url de ces valeurs (aka storableParams)
          const newHash = resp?.requestParameters?.data;
          if (newHash) {
            // console.warn('>> clean values in hash <<');
            resp?.requestParameters?.storableParameters?.forEach(
              (key) => delete sp[key]
            );

            // Rajout du hash (dans la key "data")
            sp.data = newHash;
          }

          // Dans tous les cas on clean aussi les paramètres "tech" de l'url :
          delete sp.display_type;
          delete sp.page;
          delete sp.action;
          delete sp.get_results;
          delete sp.get_column_definition;
          delete sp.get_filters;
          delete sp.display_rp;
          delete sp.detailed_rp;
          delete sp.offset;
          delete sp.get_result_count;

          const replaceSP = new URLSearchParams(sp).toString();
          history.push({
            search: replaceSP,
          });
        }
        // On change le flag de première recherche
        // --> permet l'utilisation des filtres dans la prochaine requête
        setIsFirstSearch(false);
      })
      .catch((e) => {
        console.log('[error triggerSearch] e = ', e);
        // On enlève tous les paramètres qu'on a pu envoyer
        history.replace(loc.pathname);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const triggerCounts = async () => {
    api.search.rawData.search(getSearchParams(), true).then(({ resp }) => {
      if (resp.code === 200) {
        setAllCounts(resp?.data?.resultCount);
      }
    });
  };

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
    setHasCellTypeSubStructure(true);
    setHasTissueSubStructure(true);
    setDevStageSubStructure(true);
    if (!isSpeciesChange) {
      setSelectedSpecies(EMPTY_SPECIES_VALUE);
      setSelectedExpOrAssay([]);
    }
  };

  return {
    searchResult,
    allCounts,
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
    localCount,
    setFilters,
    setIsLoading,
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
    triggerSearch,
    triggerCounts,
  };
};

export default useLogic;
