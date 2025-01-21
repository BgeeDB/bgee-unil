/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as d3 from "d3";
import api from '../../../api';
import { getGeneLabel } from '../../../helpers/gene';
import {
  getIdAndNameLabel,
  getOptionsForFilter,
} from '../../../helpers/selects';
import { flattenDevStagesList } from './components/filters/DevelopmentalAndLifeStages/useLogic';
import { EMPTY_SPECIES_VALUE } from './components/filters/Species/Species';
import config from '../../../config.json';
import { FULL_LENGTH_LABEL } from '../../../api/prod/constant';
import { isEmpty } from '../../../helpers/arrayHelper';
import dataAnatTerms from '../../../assets/anatomy.curated.flat.csv';
// DEBUG: remove in PROD
// import maxExpScoreCsv from '../../../assets/maxExpScore.csv'

// to workaround backend server issues
// import apiResp1 from '../../../assets/response_query1.INS.json';
// import apiResp2 from '../../../assets/response_query2.INS.json';

const APP_VERSION = config.version;
const URL_VERSION = APP_VERSION.replaceAll('.', '-');
const URL_ROOT = `${config.archive ? `/${URL_VERSION}` : ''}`;

// TODO: create an API endpoint to query root terms for condition params?
export const ROOT_TERM_ANAT_ENTITY = 'UBERON:0001062-GO:0005575';

// building the page_type array depending on config.json
// TODO: in future, adapt for display of different condition params?
export const EXPERIMENTS = 'experiments';
export const RAW_DATA_ANNOTS = 'raw_data_annots';
export const PROC_EXPR_VALUES = 'proc_expr_values';
export const EXPR_CALLS = 'expr_calls';

export const TAB_PAGE = [
  {
    id: EXPERIMENTS,
    label: 'Experiments',
    searchLabel: 'Search for Experiments',
    resultLabel: 'Experiments',
  },
  {
    id: RAW_DATA_ANNOTS,
    label: 'Raw data annotations',
    searchLabel: 'Search for Raw data annotations',
    resultLabel: 'Raw data annotations results',
  },
  {
    id: PROC_EXPR_VALUES,
    label: 'Processed expression values',
    searchLabel: 'Search for Processed expression values',
    resultLabel: 'Processed expression values results',
  },
];

export const TAB_PAGE_EXPR_CALL = {
  id: EXPR_CALLS,
  label: 'Gene expression matrix',
  searchLabel: 'Search for expression calls',
  resultLabel: 'Expression matrix',
};

// building dataTypes depending on config.json
export const AFFYMETRIX = 'AFFYMETRIX';
export const EST = 'EST';
export const IN_SITU = 'IN_SITU';
export const RNA_SEQ = 'RNA_SEQ';
export const { ID_FULL_LENGTH } = config.dataTypeIds;

const dataTypeConf = [
  {
    position: config.dataType_RNA_SEQ,
    type: {
      id: RNA_SEQ,
      label: 'bulk RNA-Seq',
      sourceLetter: 'R',
    },
  },
  {
    position: config.dataType_FULL_LENGTH,
    type: {
      id: ID_FULL_LENGTH,
      label: FULL_LENGTH_LABEL,
      sourceLetter: config.dataTypeSourceLetter.SL_FULL_LENGTH,
    },
  },
  {
    position: config.dataType_AFFYMETRIX,
    type: {
      id: AFFYMETRIX,
      label: 'Affymetrix data',
      sourceLetter: 'A',
    },
  },
  {
    position: config.dataType_IN_SITU,
    type: {
      id: IN_SITU,
      label: 'In situ hybridization',
      sourceLetter: 'I',
    },
  },
  {
    position: config.dataType_EST,
    type: {
      id: EST,
      label: 'EST',
      sourceLetter: 'E',
    },
  },
];
const sortedDataTypes = dataTypeConf
  .filter((t) => !!t.position)
  .sort((a, b) => a.position - b.position)
  .map((data) => data.type);
export const DATA_TYPES = sortedDataTypes;
export const ALL_DATA_TYPES = dataTypeConf.map((data) => data.type);
export const ALL_DATA_TYPES_ID = ALL_DATA_TYPES.map((d) => d.id);
const BRONZE = 'BRONZE';
const SILVER = 'SILVER';
const GOLD = 'GOLD';
export const ALL_DATA_QUALITIES = [
  { id: BRONZE, label: 'Bronze' },
  { id: SILVER, label: 'Silver' },
  { id: GOLD, label: 'Gold' },
];
export const COND_PARAM2_ANAT_KEY = 'anat_entity';
export const COND_PARAM2_DEVSTAGE_KEY = 'dev_stage';
export const COND_PARAM2_SEX_KEY = 'sex';
export const COND_PARAM2_STRAIN_KEY = 'strain';
export const COND_PARAM2 = [
  {
    id: COND_PARAM2_ANAT_KEY,
    label: 'Anatomical localization',
  },
  {
    id: COND_PARAM2_DEVSTAGE_KEY,
    label: 'Development and life stage',
  },
  {
    id: COND_PARAM2_SEX_KEY,
    label: 'Sex',
  },
  {
    id: COND_PARAM2_STRAIN_KEY,
    label: 'Strain',
  },
];

export const EXPRESSED = 'EXPRESSED';
export const NOT_EXPRESSED = 'NOT_EXPRESSED';
export const ALL_CALL_TYPE = [
  { id: EXPRESSED, label: 'Present' },
  { id: NOT_EXPRESSED, label: 'Absent' },
];

const BASE_PAGE_NUMBER = '1';
const BASE_LIMIT = '10000';

const useLogic = (isExprCalls) => {
  const history = useHistory();
  // Init from URL
  const loc = useLocation();
  const initSearch = new URLSearchParams(loc.search);
  const initHash = initSearch.get('data');
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const initDataType = initSearch.get('data_type') || DATA_TYPES[0].id;
  const initDataTypeExpCalls = initSearch.getAll('data_type') || ALL_DATA_TYPES_ID;
  const initLimit = initSearch.get('limit') || BASE_LIMIT;
  const initPageNumber = initSearch.get('pageNumber') || BASE_PAGE_NUMBER;
  const initPageType = initSearch.get('pageType') || EXPERIMENTS;

  // Page Type / Data Type
  // Page type = data in search params !
  const [pageType, setPageType] = useState(
    isExprCalls ? EXPR_CALLS : initPageType
  );
  const [dataType, setDataType] = useState(initDataType);
  const [dataTypesExpCalls, setDataTypesExpCalls] =
    useState(initDataTypeExpCalls);

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
  const [dataQuality, setDataQuality] = useState(BRONZE);
  const [callTypes, setCallTypes] = useState([NOT_EXPRESSED, EXPRESSED]);
  const [condObserved, setCondObserved] = useState(false);
  const [conditionalParam2, setConditionalParam2] = useState([
    COND_PARAM2_ANAT_KEY,
    COND_PARAM2_DEVSTAGE_KEY,
    COND_PARAM2_SEX_KEY,
    COND_PARAM2_STRAIN_KEY,
  ]);

  // results
  const [isLoading, setIsLoading] = useState(false);
  const [isCountLoading, setIsCountLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [maxExpScore, setMaxExpScore] = useState({});
  const [genes, setGenes] = useState({});
  // Store all counts per dataType
  const [allCounts, setAllCounts] = useState({});
  // Store only the count of the current DataType ( to match the filters)
  const [localCount, setLocalCount] = useState({});
  const [limit, setLimit] = useState(initLimit);
  // TODO: remove?
  const [pageNumber, setPageNumber] = useState(initPageNumber);

  // filters
  const [filters, setFilters] = useState({});

  // Will determine if the User clicked on a link to come on Raw-Data page even though he is already on it
  // The page will reset to it default state
  const [needToResetThePage, setNeedToResetThePage] = useState(false);


  const [pageCanLoadFirstCount, setPageCanLoadFirstCount] = useState(false);

  // HD: howto keep state about anatomical hierarchy?
  const [anatomicalHierarchyTerms, setAnatomicalHierarchyTerms] = useState([]);
  const [anatomicalTerms, setAnatomicalTerms] = useState([]);
  const [anatomicalTermsProps, setAnatomicalTermsProps] = useState({});
  
  // flatten anatomical terms' props
  useEffect(() => {
    const newAnatTermsProps = {}

    function traverse(term) {
      newAnatTermsProps[term.id] = {
        label: term.label,
        isTopLevelTerm: term.isTopLevelTerm,
        isExpanded: term.isExpanded,
        isPopulated: term.isExpanded,
        hasBeenQueried: term.hasBeenQueried,
      };
      term.children.forEach(traverse);
    }

    anatomicalTerms.forEach((item) => traverse(item));
    setAnatomicalTermsProps(newAnatTermsProps);
  }, [anatomicalTerms]);

  // prepare term hierarchy from gene expression call data
  const prepTermHierarchy = (expressionCalls) => {
    const termProps = { 'UBERON:0001062-GO:0005575': {
      label: 'anatomical entity',
      anatEntityId: 'UBERON:0001062',
      anatEntityLabel: 'anatomical entity',
      cellTypeId: 'GO:0005575',
      cellTypeLabel: 'cellular component',
      isTopLevelTerm: true,
      isExpanded: true,
      isPopulated: false,
      hasBeenQueried: true,
      isSingleCell: false,
    }};
    const parents = { [ROOT_TERM_ANAT_ENTITY]: [] };
    const children = { [ROOT_TERM_ANAT_ENTITY]: [] };
    // console.log(`[useLogic.triggerInitialSearch] prepTermHierarchy()`);
    expressionCalls.forEach((exprCall) => {
      const { id: anatEntityId, name: anatEntityName } = exprCall.condition.anatEntity;
      const { id: cellTypeId, name: cellTypeName } = exprCall.condition.cellType;
      const termIsSingleCell = (cellTypeId !== 'GO:0005575');
      const termId = `${anatEntityId}-${cellTypeId}`;
      const termLabel = termIsSingleCell ? `${anatEntityName} : ${cellTypeName}` : anatEntityName;
      if (!(termId in termProps)) {
        termProps[termId] = {
          label: termLabel,
          anatEntityId,
          anatEntityLabel: anatEntityName,
          cellTypeId,
          cellTypeLabel: cellTypeName,
          isTopLevelTerm: true,
          isExpanded: true,
          isPopulated: false,
          hasBeenQueried: true,
          isSingleCell: termIsSingleCell,
        }

        if (termId !== ROOT_TERM_ANAT_ENTITY) {  
          parents[termId] = [ROOT_TERM_ANAT_ENTITY];
          children[ROOT_TERM_ANAT_ENTITY].push(termId);
        }
      }
    });

    // console.log(`[useLogic.triggerInitialSearch] parents:\n${JSON.stringify(parents)}`);
    // console.log(`[useLogic.triggerInitialSearch] children:\n${JSON.stringify(children)}`);
    // console.log(`[useLogic.triggerInitialSearch] termProps:\n${JSON.stringify(termProps)}`);

    // identify root terms
    const roots = Object.keys(parents).filter(id => parents[id].length === 0);
    // console.log(`root terms:\n${JSON.stringify(roots)}`);
    // console.log(`root terms:\n${JSON.stringify(roots.map(id => ({'id': id, 'label': termProps[id]})))}`);

    function createNestedStructure(termId, depth = 0) {
      // console.log(`[createNestedStructure] ${termId} - ${depth}`);
      // Get the term's properties
      const term = termProps[termId];
      if (!term) {
        console.error(`[useLogic.prepTermHierarchy] term not found: ${termId}`);
      }
      // Initialize the nested structure
      const nestedTerm = {
        id: termId,
        label: term.isSingleCell ? `${term.label} : ${term.cellTypeLabel}` : term.label,
        anatEntityId: term.anatEntityId,
        anatEntityLabel: term.anatEntityLabel,
        cellTypeId: term.cellTypeId,
        cellTypeLabel: term.cellTypeLabel,
        depth,
        isTopLevelTerm: true,
        isExpanded: depth === 0,
        isPopulated: true,
        hasBeenQueried: depth === 0, 
        isSingleCell: term.isSingleCell,
        children: []
      };
    
      // If the term has children, recursively create their nested structure
      if (children[termId]) {
        nestedTerm.children = children[termId].map(childId => createNestedStructure(childId, depth+1));
      }
    
      return nestedTerm;
    }
    
    // Create the nested structure for each root term
    console.log(`[useLogic.prepTermHierarchy] termProps:\n${JSON.stringify(termProps)}`);
    console.log(`[useLogic.prepTermHierarchy] roots:\n${JSON.stringify(roots)}`);
    const anatTerms = roots.map(root => createNestedStructure(root));
    // console.log(`[useLogic.triggerInitialSearch] anatTerms (top-level):\n${JSON.stringify(anatTerms, null, 2)}`);

    return { anatTerms, termProps };
  };

  // add lower level ontology terms to existing hierarchy based on exression call data
  const addLowLevelTerms = (parentId, nestedStructure, terms, expressionCalls) => {
    // Make a copy of termProps to avoid reassigning the parameter directly
    const newTerms = {};

    // Helper function to recursively find the term by id and add children
    const addChildren = (term, depth) => {
      // Check if the current term's id matches the parentId
      if (term.id === parentId) {
        // Loop through each expressionCall and add children to the term
        expressionCalls.forEach(call => {
          const { anatEntity, cellType } = call.condition;
          if (!(anatEntity.id in terms) && !(anatEntity.id in newTerms)) {
            const newChild = {
              id: `${anatEntity.id}-${cellType.id}`,
              label: anatEntity.name,
              anatEntityId: anatEntity.id,
              anatEntityLabel: anatEntity.name,
              cellTypeId: cellType.id,
              cellTypeLabel: cellType.name,
              depth: term.depth + 1,
              isTopLevelTerm: false,
              children: []
            };
            term.children.push(newChild);
            // Add the new term to termProps
            newTerms[anatEntity.id] = { 
              label: anatEntity.name,
              isTopLevel: false };
          }
        });
      } else {
        // If not the matching term, recurse into its children
        term.children.forEach(child => addChildren(child, child.depth+1));
      }
    };
  
    // Start the recursive search from each root term in the nested structure
    nestedStructure.forEach(root => addChildren(root, root.depth));

    // Return the updated termProps
    return newTerms;
  };

  // DEBUG: remove in PROD
  // load showcase max expression scores
  /*
  useEffect(() => {
    const score = {};
    d3.csv(maxExpScoreCsv).then(data => {
      // console.log(`[GeneExpressionMatrixResults] data:\n${JSON.stringify(data, null, 2)}`);
      data.forEach(row => {
        const { geneId, termId } = row;
        const maxScore = +row.maxExpScore;  // Convert to number

        if (!score[geneId]) {
          score[geneId] = {};
        }
        score[geneId][`${termId}-GO:0005575`] = maxScore;
      });
    }).catch(error => {
      console.error("Error loading the CSV file:", error);
    });

    console.log(`[useLogic.js] score:\n${JSON.stringify(score, null, 2)}`);
    setMaxExpScore(score);

  }, []);
  */

  useEffect(() => {
    console.log(`[useLogic.js] loc.search CHANGED:\n${JSON.stringify(loc.search, null, 2)}`);
    const sp = new URLSearchParams(loc.search);
    const nextLimit = sp.get('limit');
    const nextPageNumber = sp.get('pageNumber');
    if (nextLimit !== null) {
      setLimit(nextLimit);
    }
    if (nextPageNumber) {
      setPageNumber(nextPageNumber);
    } else {
      setPageNumber(1);
    }

    // If we are already on the Raw-Data page and we try to access it again in the Header all the search variables will be cleared.
    // If there is no search variable we set back the page to it default state.
    if(!loc.search && !isFirstSearch && !isLoading){
      resetForm(false, true);
    }

  }, [loc.search]);

  useEffect(() => {
    if (needToResetThePage) {
      // We set FirstSearch at TRUE so we don't trigger all the useEffect that checks for it
      setIsFirstSearch(true);
      setDataType(initDataType);
      setDataTypesExpCalls(initDataTypeExpCalls);
      setPageType(isExprCalls ? EXPR_CALLS : initPageType);

      setIsFirstSearch(false);
      setLocalCount({});
      triggerCounts();
      triggerSearch(true, true);

      setNeedToResetThePage(false);
    }
  }, [needToResetThePage]);

  useEffect(() => {
    if (pageCanLoadFirstCount) {
      triggerCounts(false, true);
    }
  }, [pageCanLoadFirstCount])

  const onChangeSpecies = (newSpecies) => {
    setSelectedSpecies(newSpecies);
    setSelectedCellTypes([]);
    setSelectedGene([]);
    setSelectedStrain([]);
    setSelectedTissue([]);
    setSelectedSexes([]);
  };

  // TODO: remove pageNumber, limit and associated useEffect
  useEffect(() => {
    if (!isFirstSearch) {
      triggerSearch();
    }
  }, [pageNumber, limit]);

  // TODO: adjust parameters for first search
  /*
  useEffect(() => {
    triggerSearch();
    setIsCountLoading(true);

    // Allow to detect a browser back btn pressed and force all the worflow to work again by forcing reload @ugly
    history.listen(() => {
      if (history.action === 'POP') {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    });
  }, []);
  */

  // TODO: remove dataType and associated useEffect
  useEffect(() => {
    if (!isFirstSearch && !isExprCalls) {
      setLocalCount({});
      triggerSearch(false, false);
    }
  }, [dataType]);

  // TODO: remove pageType and associated useEffect
  useEffect(() => {
    if (!isFirstSearch) {
      setLocalCount({});
      triggerSearch(true, true);
      triggerCounts();
    }
  }, [pageType]);

  useEffect(() => {
    if (selectedSpecies.value !== EMPTY_SPECIES_VALUE.value) {
      getSexesAndDevStageForSpecies();
      resetForm(true);
    }
  }, [selectedSpecies]);

  const onSubmit = () => {
    // triggerSearch(true, true);
    triggerInitialSearch();
    triggerCounts();
  };

  const addConditionalParam = (id) => {
    const indexOfValue = conditionalParam2.indexOf(id);
    if (indexOfValue === -1) {
      setConditionalParam2([...conditionalParam2, id]);
    }
  };

  // CONTINUE HERE
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
    // Possible sexes
    if (requestDetails?.requestedSpeciesSexes?.length > 0) {
      setSpeciesSexes(requestDetails?.requestedSpeciesSexes);
    }
    // Selected sexes
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
      // HD: add top-level anatomical terms

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
        } else {
          initDevStage.push({
            label: devStageId,
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
    setHasTissueSubStructure(true);
    setHasCellTypeSubStructure(true);
    setDevStageSubStructure(true);
    if (requestParameters?.anat_entity_descendant === 'false')
      setHasTissueSubStructure(false);
    if (requestParameters?.cell_type_descendant === 'false')
      setHasCellTypeSubStructure(false);
    if (requestParameters?.stage_descendant === 'false')
      setDevStageSubStructure(false);

    // Filters
    const filtersToCheck =
      (isExprCalls ? data?.filters : data?.filters?.[nextDataType]) || {};
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

    const currentSP = new URLSearchParams(loc?.search);
    const applyFilterForAllDataTypes = currentSP.get('filters_for_all');

    if (applyFilterForAllDataTypes === '1') {
      setFilters({
        [ID_FULL_LENGTH]: initFilters,
        [RNA_SEQ]: initFilters,
        [AFFYMETRIX]: initFilters,
        [EST]: initFilters,
        [IN_SITU]: initFilters,
      });
    } else {
      setFilters({ [nextDataType]: initFilters });
    }

    if (isExprCalls) {
      // Call types
      if (requestParameters?.expr_type?.length > 0) {
        setCallTypes(requestParameters?.expr_type);
      }

      // data_type expres calls
      if (requestParameters?.data_type?.length > 0) {
        setDataTypesExpCalls(requestParameters?.data_type);
      }

      // Data quality
      if (requestParameters?.data_qual?.length > 0) {
        setDataQuality(requestParameters?.data_qual);
      }

      // Conditional parameter 2
      if (requestParameters?.cond_param2?.length > 0) {
        setConditionalParam2(requestParameters?.cond_param2);
      }

      // Conditions observed
      if (requestParameters?.cond_observed === 'true') {
        setCondObserved(true);
      } else {
        setCondObserved(false);
      }
    }

    setPageCanLoadFirstCount(true);
  };

  const getSearchParams = () => {
    let params = {
      hash: initHash,
      isFirstSearch,
      initSearch,
      pageType,
      dataType: [dataType],
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
      pageNumber,
      limit,
      queryGenes: [], // HD: store homologous genes
    };

    // Here we are filtering the filters themself
    // We don't send to the backend the filters that have no corresponding list in the filters object from last research
    const defaultdataFilters = searchResult?.filters?.[dataType] || {};
    const dataFiltersExprCall = searchResult?.filters || {};
    const dataFilters = isExprCalls ? dataFiltersExprCall : defaultdataFilters;
    const wantedFilters = filters[dataType] || {};
    // ( if there is any filters that have been set before )
    if (!isEmpty(dataFilters)) {
      const myFilters = {};
      Object.entries(wantedFilters)
        .filter(([wantedFilterKey]) => {
          const filterExists = Object.entries(dataFilters).some(
            ([, existingFilter]) =>
              wantedFilterKey === existingFilter?.urlParameterName
          );
          return filterExists;
        })
        .forEach(([key, values]) => {
          myFilters[key] = values;
        });

      params.filters = myFilters;
    } else {
      params.filters = filters[dataType];
    }
    if (isExprCalls) {
      const dataTypeForExpCalls =
        dataTypesExpCalls.length === 0 ? ALL_DATA_TYPES_ID : dataTypesExpCalls;
      params.dataType = dataTypeForExpCalls;
      params = {
        ...params,
        dataQuality,
        callTypes,
        conditionalParam2,
        isExprCalls,
        condObserved,
      };
    }
    return params;
  };

  // API QUERY 1: Get gene expression data for top-level anatomical terms
  // TODO: factor out repetitive code (between this function and triggerSearch, triggerInitialSearchComplementary)
  const triggerInitialSearch = async () => {
    const params = getSearchParams();
    params.limit = 10000;
    
    // TODO: if only one gene was selected -> get gene homologs?
    console.log(`[useLogic.triggerInitialSearch] selected gene:\n${JSON.stringify(params.selectedGene)}`);
    console.log(`[useLogic.triggerInitialSearch] selected species:\n${JSON.stringify(params.selectedSpecies)}`);
    console.log(`[useLogic.triggerInitialSearch] params:\n${JSON.stringify(params)}`);

    setIsLoading(true);

    try {
      console.log(`[useLogic.triggerInitialSearch] submitting API requests...`);
      // Perform two API calls in parallel:
      //   API QUERY 1: Get genex data for top-level anatomical terms
      //   API QUERY 2: Get genex for anatomical terms not nested below any top-level term 
      const [ result1, result2 ] = await Promise.all([
        api.search.geneExpressionMatrix.initialSearch(params),
        api.search.geneExpressionMatrix.initialSearchComplementary(params)
      ]);

      const { resp: resp1, paramsURLCalled: paramsURLCalled1 } = result1;
      const { resp: resp2, paramsURLCalled: paramsURLCalled2 } = result2;

      // const paramsURLCalled1 = params.toString();
      // const [ resp1, resp2 ] = [ apiResp1, apiResp2 ];
      
      if (resp1.code === 200 && resp2.code === 200) {
        // console.log(`[useLogic.triggerInitialSearch] QUERY 1 response:`)
        console.log(JSON.stringify(resp1));
        // console.log(`[useLogic.triggerInitialSearch] QUERY 2 response:`)
        console.log(JSON.stringify(resp2));

        // Prepare term hierarchy from returned terms
        const{ anatTerms, termProps } = prepTermHierarchy(resp1.data.expressionData.expressionCalls);
        console.log(`[useLogic.triggerInitialSearch] anatTerms:\n${JSON.stringify(anatTerms)}`);
        setAnatomicalTerms(anatTerms);
        console.log(`[useLogic.triggerInitialSearch] termProps:\n${JSON.stringify(termProps)}`);
        const newTermProps = addLowLevelTerms(
          ROOT_TERM_ANAT_ENTITY, 
          anatTerms, 
          termProps, 
          resp2.data.expressionData.expressionCalls
        );
        // Merge newTermProps into the original termProps
        Object.assign(termProps, newTermProps);
        setAnatomicalTermsProps(termProps);

        // merge genex data from both calls
        const { data } = resp1;
        // console.log(`[useLogic.triggerInitialSearch] data before:\n${JSON.stringify(data.expressionData.expressionCalls)}`);
        data.expressionData.expressionCalls.push(...resp2.data.expressionData.expressionCalls);
        // console.log(`[useLogic.triggerInitialSearch] data after:\n${JSON.stringify(data.expressionData.expressionCalls)}`);

        // After First search ( => hash !== null ) we update the filters via detailed_rp
        if (isFirstSearch) { // TODO: should always be true here - remove check?
          try {
            // CONTINUE HERE
            initFormFromDetailedRP(resp1);
          } catch (e) {
            console.error('Error when parsing URL e = ', e);
          }
        }

        // "Mirroring" management in URL's parameter (with & without hash)
        const searchParams = new URLSearchParams(paramsURLCalled1);
        // If there is a hash we put it in the URL
        // And as all next data are "coded" in the Hash...
        // We can clear the URL from those (aka storableParams)
        const newHash = resp1?.requestParameters?.data;
        if (newHash) {
          // We delete the potential old hash
          searchParams.delete('data');

          resp1?.requestParameters?.storableParameters?.forEach((key) => {
            if (key !== 'data_type') {
              searchParams.delete(key);
            }
          });

          // Adding Hash (in "data" key)
          searchParams.append('data', newHash);
        }

        // We can always clean those "tech" parameters from the URL
        searchParams.delete('display_type');
        searchParams.delete('page');
        searchParams.delete('action');
        searchParams.delete('get_results');
        searchParams.delete('get_column_definition');
        searchParams.delete('get_filters');
        searchParams.delete('display_rp');
        searchParams.delete('detailed_rp');
        searchParams.delete('offset');
        searchParams.delete('get_result_count');
        searchParams.delete('filters_for_all');

        // The following code clean the url of any default value
        if (searchParams.get('limit') === '50') {
          searchParams.delete('limit');
        }
        if (searchParams.get('pageType') === 'experiments') {
          searchParams.delete('pageType');
        }
        if (searchParams.get('pageNumber') === '1') {
          searchParams.delete('pageNumber');
        }
        if (searchParams.get('sex') === 'all') {
          searchParams.delete('sex');
        }
        if (searchParams.get('cell_type_descendant') === 'true') {
          searchParams.delete('cell_type_descendant');
        }
        if (searchParams.get('stage_descendant') === 'true') {
          searchParams.delete('stage_descendant');
        }
        // if (searchParams.get('anat_entity_descendant') === 'true') {
        //   searchParams.delete('anat_entity_descendant');
        // }
        if (isFirstSearch) {
          history.replace({
            search: searchParams.toString(),
            pathname: `${URL_ROOT}${loc.pathname}`,
          });
        } else {
          history.push({
            search: searchParams.toString(),
            pathname: `${URL_ROOT}${loc.pathname}`,
          });
        }
        
        // The search form will be collapsed if this is not the first time we're on the page
        if (!isFirstSearch) {
          setShow(false); // TODO: give this function a more specific name
        }

        // Finally, we set the values we are interested in
        setIsLoading(false);
        setSearchResult(data);
      }
    // } catch (error) {
    //   console.log(`[useLogic.triggerInitialSearch] ERROR:\n${JSON.stringify(error)}`)
    //   // We remove all the parameters that we may have sent
    //   history.replace(`${URL_ROOT}${loc.pathname}`);
    //   setIsLoading(false);
    } finally {
      console.log(`[useLogic.triggerInitialSearch] finally.`)
        // The next searches will not be considered as the first
        // --> Filters will now be used for the next requests
        setIsFirstSearch(false);
    }
  };

  const triggerHomologSearch = async () => {
    const params = getSearchParams();
    // HD: if only one gene was selected -> get gene homologs
    console.log(`[useLogic.triggerSearch] selected gene:\n${JSON.stringify(params.selectedGene)}`);
    console.log(`[useLogic.triggerSearch] selected species:\n${JSON.stringify(params.selectedSpecies)}`);
    const queryGenes = new Set();
    const homologGeneIds = new Set(); // ---
    if (params.selectedGene.length === 1) {
      const geneId = params.selectedGene[0];
      const speciesId = params.selectedSpecies;
      const homologCalls = [];
      api.search.genes.homologs(geneId, speciesId).then(async (result) => {
        console.log(`[useLogic.triggerSearch] homologs:\n${JSON.stringify(result.data)}`);
        
        // collect homologous genes
        result.data.orthologsByTaxon.forEach((entry) => {
          entry.genes.forEach(async (gene) => {
            // ---
            if (gene.geneId in homologGeneIds) return;
            homologGeneIds.add(gene.geneId);
            const searchParams = { ...params, selectedGene: [gene.geneId], selectedSpecies: gene.species.id };
            try {
                const homoRes = await api.search.geneExpressionMatrix.initialSearch(searchParams);
                homologCalls.push(homoRes.resp.data.expressionData.expressionCalls);
                console.log(`[useLogic.triggerHomologSearch] Search result for gene ${gene.geneId} and species ${gene.species.id}:\n${JSON.stringify(homoRes.resp.data)}`);
                const newData = searchResult;
                // newData.expressionData.expressionCalls.push(homoRes.resp.data.expressionData.expressionCalls);
                // setSearchResult(newData);
            } catch (error) {
                console.error(`[useLogic.triggerHomologSearch] Error searching for gene ${gene.geneId} and species ${gene.species.id}:`, error);
            }
              // ---
            queryGenes.add(JSON.stringify({
              geneId: gene.geneId,
              speciesId: gene.species.id,
              geneName: gene.name,
              speciesName: `${gene.species.genus} ${gene.species.speciesName}`
            }));
          });
        });
        console.log(`[useLogic.triggerHomologSearch] queryGenes:\n${JSON.stringify([...queryGenes])}`);
        console.log(`[useLogic.triggerHomologSearch] queryGenes:\n${[...queryGenes].length}`);
        console.log(`[useLogic.triggerHomologSearch] homologCalls:\n${JSON.stringify([...homologCalls])}`);
      })
    }
  };

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
    
    // HD: if only one gene was selected -> get gene homologs
    console.log(`[useLogic.triggerSearch] selected gene:\n${JSON.stringify(params.selectedGene)}`);
    console.log(`[useLogic.triggerSearch] selected species:\n${JSON.stringify(params.selectedSpecies)}`);
    const queryGenes = new Set();
    if (params.selectedGene.length === 1) {
      const geneId = params.selectedGene[0];
      const speciesId = params.selectedSpecies;
      api.search.genes.homologs(geneId, speciesId).then((result) => {
        console.log(`[useLogic.triggerSearch] homologs:\n${JSON.stringify(result.data)}`);
        
        // collect homologous genes
        result.data.orthologsByTaxon.forEach((entry) => {
          entry.genes.forEach((gene) => {
            queryGenes.add(JSON.stringify({
              geneId: gene.geneId,
              speciesId: gene.species.id,
              geneName: gene.name,
              speciesName: `${gene.species.genus} ${gene.species.speciesName}`
            }));
          });
        });
        console.log(`[useLogic.triggerSearch] queryGenes:\n${JSON.stringify([...queryGenes])}`);
        console.log(`[useLogic.triggerSearch] queryGenes:\n${[...queryGenes].length}`);

        // params.queryGenes = queryGenes;
      })
    }
    

    // HD: Add anatomical hierarchy to selected tissues
    params.selectedTissue = params.selectedTissue.concat(anatomicalHierarchyTerms);
    // HD: Fix other condition params to top-level terms (overrides form fields!)
    params.selectedCellTypes = ['GO:0005575']; // "cellular_component"
    params.selectedDevStages = ['UBERON:0000104']; // "life cycle"
    params.selectedStrain = ['wild-type'];
    params.hasCellTypeSubStructure = 0;
    params.hasTissueSubStructure = 0;
    params.hasDevStageSubStructure = 0;
    params.limit = 10000;

    setIsLoading(true);
    return api.search.geneExpressionMatrix
      .search(params, false)
      .then(({ resp, paramsURLCalled }) => {
        if (resp.code === 200) {
          // HD
          console.log(JSON.stringify(resp.data));
          console.log(`[useLogic.triggerSearch] params:\n${JSON.stringify(params)}`)
          // After First search ( => hash !== null ) we update the filters via detailed_rp
          if (isFirstSearch) {
            try {
              initFormFromDetailedRP(resp);
            } catch (e) {
              console.error('Error when parsing URL e = ', e);
            }
          }

          // "Mirroring" management in URL's parameter (with & without hash)
          const searchParams = new URLSearchParams(paramsURLCalled);
          // If there is a hash we put it in the URL
          // And as all next data are "coded" in the Hash...
          // We can clear the URL from those (aka storableParams)
          const newHash = resp?.requestParameters?.data;
          if (newHash) {
            // We delete the potential old hash
            searchParams.delete('data');

            resp?.requestParameters?.storableParameters?.forEach((key) => {
              if (key !== 'data_type') {
                searchParams.delete(key);
              }
            });

            // Adding Hash (in "data" key)
            searchParams.append('data', newHash);
          }

          // We can always clean those "tech" parameters from the URL
          searchParams.delete('display_type');
          searchParams.delete('page');
          searchParams.delete('action');
          searchParams.delete('get_results');
          searchParams.delete('get_column_definition');
          searchParams.delete('get_filters');
          searchParams.delete('display_rp');
          searchParams.delete('detailed_rp');
          searchParams.delete('offset');
          searchParams.delete('get_result_count');
          searchParams.delete('filters_for_all');

          // The following code clean the url of any default value
          if (searchParams.get('limit') === '50') {
            searchParams.delete('limit');
          }
          if (searchParams.get('pageType') === 'experiments') {
            searchParams.delete('pageType');
          }
          if (searchParams.get('pageNumber') === '1') {
            searchParams.delete('pageNumber');
          }
          if (searchParams.get('sex') === 'all') {
            searchParams.delete('sex');
          }
          if (searchParams.get('cell_type_descendant') === 'true') {
            searchParams.delete('cell_type_descendant');
          }
          if (searchParams.get('stage_descendant') === 'true') {
            searchParams.delete('stage_descendant');
          }
          if (searchParams.get('anat_entity_descendant') === 'true') {
            searchParams.delete('anat_entity_descendant');
          }
          if (isFirstSearch) {
            history.replace({
              search: searchParams.toString(),
              pathname: `${URL_ROOT}${loc.pathname}`,
            });
          } else {
            history.push({
              search: searchParams.toString(),
              pathname: `${URL_ROOT}${loc.pathname}`,
            });
          }
        }

        // The search form will be collapsed if this is not the first time we're on the page
        if (!isFirstSearch) {
          setShow(false);
        }

        // Finally, we set the values we are interested in
        setIsLoading(false);
        // TODO: CONTINUE - how to handle initial view?
        setSearchResult(resp?.data);

        // TODO: add result count to previous one?
        // setLocalCount(
        //   isExprCalls
        //     ? { assayCount: resp?.data?.expressionCallCount }
        //     : resp?.data?.resultCount?.[dataType]
        // );
      })
      .catch(() => {
        // We remove all the parameters that we may have sent
        history.replace(`${URL_ROOT}${loc.pathname}`);
        setIsLoading(false);
      })
      .finally(() => {
        // The next searches will not be considered as the first
        // --> Filters will now be used for the next requests
        setIsFirstSearch(false);
      });
  };

  // HD: perform API data request for subordinate terms
  const triggerSearchChildren = async (
    parentId, selectedTissueId
  ) => {
    // DEBUG: remove console log in prod
    console.log(`[useLogic] triggerSearchChildren:\n${parentId}`);

    const params = getSearchParams();
    
    // Set parent anatomical term as selected tissue
    params.selectedTissue = [selectedTissueId];
    // Fix other condition params to top-level terms (overrides form fields!)
    // params.selectedCellTypes = ['SUMMARY']; // top-level terms
    if (params.selectedCellTypes?.length === 0) {
      params.selectedCellTypes = ['GO:0005575']; // "cellular_component"
    }
    // params.selectedDevStages = ['UBERON:0000104']; // "life cycle"
    // params.selectedSexes = ['any'];
    // params.selectedStrain = ['wild-type'];
    // params.hasCellTypeSubStructure = 0;
    params.hasTissueSubStructure = 1; // we want children of parent term!
    // params.hasDevStageSubStructure = 0;
    params.limit = 10000;
    params.conditionalParam2 = ['anat_entity']; // HD: restrict to anatomical terms
    // TODO: add filters?

    setIsLoading(true);
    // DEBUG: remove console log in prod
    console.log(`[useLogic] triggerSearchChildren - triggered!`);
    return api.search.geneExpressionMatrix
      .search(params, false)
      .then(({ resp, paramsURLCalled }) => {
        // DEBUG: remove in prod
        console.log(`[useLogic] triggerSearchChildren - response:\n${JSON.stringify(resp)}`);
        if (resp.code === 200) {
          // DEBUG: remove console log in prod
          console.log(`[useLogic] triggerSearchChildren - resp.data:\n${JSON.stringify(resp.data)}`);
          console.log(`[useLogic] triggerSearchChildren - params:\n${JSON.stringify(params)}`)

          // TODO: make sure, URL reflects current query state
          // "Mirroring" management in URL's parameter (with & without hash)
          const searchParams = new URLSearchParams(paramsURLCalled);
          // If there is a hash we put it in the URL
          // And as all next data are "coded" in the Hash...
          // We can clear the URL from those (aka storableParams)
          const newHash = resp?.requestParameters?.data;
          if (newHash) {
            // We delete the potential old hash
            searchParams.delete('data');

            resp?.requestParameters?.storableParameters?.forEach((key) => {
              if (key !== 'data_type') {
                searchParams.delete(key);
              }
            });

            // Adding Hash (in "data" key)
            searchParams.append('data', newHash);
          }

          // We can always clean those "tech" parameters from the URL
          searchParams.delete('display_type');
          searchParams.delete('page');
          searchParams.delete('action');
          searchParams.delete('get_results');
          searchParams.delete('get_column_definition');
          searchParams.delete('get_filters');
          searchParams.delete('display_rp');
          searchParams.delete('detailed_rp');
          searchParams.delete('offset');
          searchParams.delete('get_result_count');
          searchParams.delete('filters_for_all');

          // The following code clean the url of any default value
          if (searchParams.get('limit') === '50') {
            searchParams.delete('limit');
          }
          if (searchParams.get('pageType') === 'experiments') {
            searchParams.delete('pageType');
          }
          if (searchParams.get('pageNumber') === '1') {
            searchParams.delete('pageNumber');
          }
          if (searchParams.get('sex') === 'all') {
            searchParams.delete('sex');
          }
          if (searchParams.get('cell_type_descendant') === 'true') {
            searchParams.delete('cell_type_descendant');
          }
          if (searchParams.get('stage_descendant') === 'true') {
            searchParams.delete('stage_descendant');
          }
          if (searchParams.get('anat_entity_descendant') === 'true') {
            searchParams.delete('anat_entity_descendant');
          }

          history.push({
            search: searchParams.toString(),
            pathname: `${URL_ROOT}${loc.pathname}`,
          });
        }

        // update anatomical terms
        const newChildTerms = new Set();
        resp?.data.expressionData.expressionCalls.forEach((exprCall) => {
          const { id: anatEntityId, name: anatEntityName } = exprCall.condition.anatEntity;
          const { id: cellTypeId, name: cellTypeName } = exprCall.condition.cellType;
          const isSingleCell = (cellTypeId !== 'GO:0005575');
          // if (!(anatEntityId === selectedTissueId && cellTypeId === 'GO:0005575')) {
          if (!(anatEntityId === selectedTissueId) || isSingleCell) {
            newChildTerms.add(JSON.stringify({
              id: `${anatEntityId}-${cellTypeId}`,
              // label: cellTypeId !== '' ? `${anatEntityName} : ${cellTypeName}` : anatEntityName,
              label: isSingleCell ? `${anatEntityName} : ${cellTypeName}` : anatEntityName,
              anatEntityId,
              anatEntityLabel: anatEntityName,
              cellTypeId,
              cellTypeLabel: cellTypeName,
              isTopLevelTerm: false,
              isExpanded: false,
              isPopulated: false,
              hasBeenQueried: false,
              isSingleCell,
            }));
          }
        });
        // DEBUG: remove console log in prod
        console.log(`[useLogic] triggerSearchChildren newChildTerms:\n${JSON.stringify([...newChildTerms])}`);
        function addChildren(hierarchy, termId, children) {
          // Helper function to recursively traverse the array
          function traverse(node) {
            if (!node || !Array.isArray(node)) return []; // break condition
        
            // Add property to each element in the current level
            return node.map(item => {
              const newItem = { ...item };
              if (item.id === termId) {
                // add children
                // console.log(`[Heatmap useLogic] adding children for:\n${termId} -> ${JSON.stringify([...children])}`);
                children.forEach((childStr) => {
                  const child = JSON.parse(childStr);
                  if (child.id !== newItem.id)
                  newItem.children.push({
                    id: child.id,
                    label: child.label,
                    anatEntityId: child.anatEntityId,
                    anatEntityLabel: child.anatEntityLabel,
                    cellTypeId: child.cellTypeId,
                    cellTypeLabel: child.cellTypeLabel,
                    depth: newItem.depth+1,
                    isTopLevelTerm: false,
                    isExpanded: false,
                    isPopulated: false,
                    hasBeenQueried: false,
                    isSingleCell: child.isSingleCell,
                    children: [],
                  });
                });
                newItem.isExpanded = true;
                newItem.hasBeenQueried = true;
              }
              newItem.children = traverse(newItem.children); // Recursively traverse children
              return newItem;
            });
          }
          // Start traversal from the root
          return traverse(hierarchy);
        }
        if (newChildTerms.size > 0) {
          const newAnatTerms = addChildren(anatomicalTerms, parentId, [...newChildTerms]);
          // DEBUG: remove console log in prod
          console.log(`[useLogic] triggerSearchChildren anatomicalTerms:\n${JSON.stringify(anatomicalTerms)}`);
          console.log(`[useLogic] triggerSearchChildren newAnatTerms:\n${JSON.stringify(newAnatTerms)}`);
          console.log(`[useLogic] triggerSearchChildren CALL setAnatomicalTerms`);
          setAnatomicalTerms(newAnatTerms);
          // add term props for new terms
          const newAnatTermsProps = {...anatomicalTermsProps};
          newChildTerms.forEach((child) => {
            if (!(child.id in newAnatTermsProps)) {
              newAnatTermsProps[child.id] = {
                isTopLevel: child.isTopLevelTerm,
                isExpanded: child.isExpanded,
                isPopulated: child.isPopulated,
                hasBeenQueried: child.hasBeenQueried,
                isSingleCell: child.isSingleCell,
              }
            }
          });
          setAnatomicalTermsProps(newAnatTermsProps);
        }
        
        // add additional data to previous ones
        const exprData = searchResult;
        exprData.expressionData.expressionCalls.push(...resp?.data.expressionData.expressionCalls);
        setSearchResult(exprData);

        // Finally, we set the values we are interested in
        setIsLoading(false);
        setLocalCount(
          isExprCalls
            ? { assayCount: resp?.data?.expressionCallCount }
            : resp?.data?.resultCount?.[dataType]
        );
      })
      /* .catch(() => {
        // DEBUG: remove console log in prod
        console.log(`[useLogic] triggerSearchChildren - Whoops! Something went wrong...`);
        // We remove all the parameters that we may have sent
        history.replace(`${URL_ROOT}${loc.pathname}`);
        setIsLoading(false);
      }) */
      .finally(() => {
        // The next searches will not be considered as the first
        // --> Filters will now be used for the next requests
        setIsFirstSearch(false);
      });
  };

  const triggerCounts = async (
    cleanFilters = false,
    bypassInitSearchParam = false
  ) => {
    const params = getSearchParams();
    if (cleanFilters) {
      params.filters = {};
      setFilters({});
    }

    if (!isExprCalls) {
      setIsCountLoading(true);
      api.search.rawData
        .search(params, true, bypassInitSearchParam)
        .then(({ resp }) => {
          if (resp.code === 200) {
            setIsCountLoading(false);
            setAllCounts(resp?.data?.resultCount);
          }
        })
        .catch(() => {
          // gene not found or some errors !
          setIsCountLoading(false);
          setAllCounts({});
        });
    }
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

  const AutoCompleteByType = (type, mappingFn) =>
    useCallback(
      async (query) => {
        if (query) {
          return api.search.genes
            .AutoCompleteByType(type, query, selectedSpecies.value)
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

  const getSpeciesLabel = (specie) => {
    if (specie.name !== '') {
      return `${specie.genus} ${specie.speciesName} - ${specie.name}`;
    }
    return `${specie.genus} ${specie.speciesName}`;
  };

  const toggleSex = (sexName) => {
    const i = selectedSexes.indexOf(sexName);
    // Edge case where "all" is set
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

  const resetForm = (isSpeciesChange = false, pageWillBeReset = false) => {
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
    if (pageWillBeReset) {
      setNeedToResetThePage(true);
    }
  };

  // updates component state!
  const onToggleExpandCollapse = (term) => {
    // DEBUG: remove console log in prod
    // console.log(`[useLogic] onToggleExpandCollapse:\n${term.id}`);
    console.log(`[useLogic] onToggleExpandCollapse:\n${JSON.stringify(term)}`);

    function updateExpandedStateHierarchically(terms) {
      const newTermProps = {...anatomicalTermsProps};
      // Helper function to recursively traverse the array
      function traverse(node) {
        if (!node || !Array.isArray(node)) return []; // break condition
    
        // Add property to each element in the current level
        return node.map(item => {
          const newItem = JSON.parse(JSON.stringify(item)); // { ...item };
          if (item.id === term.id) {
            // get data for descendants
            // if (!newItem.isExpanded && !item.hasBeenQueried) {
            if (!item.hasBeenQueried) {
              console.log(`[useLogic] onToggleExpandCollapse - get child data for:\n${term.id}`);
              triggerSearchChildren(term.id, term.anatEntityId);
              newItem.hasBeenQueried = true;
              newItem.isExpanded = true;
              newTermProps[term.id].hasBeenQueried = true;
              newTermProps[term.id].isExpanded = true;
            } else {
              // DEBUG: remove console log in prod
              console.log(`[useLogic] flipping item.isExpanded from ${item.isExpanded} to ${!item.isExpanded}.`);
              newItem.isExpanded = !item.isExpanded; // Flip expanded state
              newItem.isPopulated = item.isPopulated; // Keep populated state
            }
          }
          newItem.children = traverse(newItem.children); // Recursively traverse children
          if (item.termId === term.id) {
            // DEBUG: remove console log in prod
            console.log(JSON.stringify(newItem));
          }
          return newItem;
        });
      }
    
      // Start traversal from the root
      const newDrilldown = traverse(terms);
      return {newDrilldown, newTermProps};
    }

    const {newDrilldown, newTermProps} = updateExpandedStateHierarchically(anatomicalTerms);
    // DEBUG: remove console log in prod
    console.log(`[useLogic] TEST newDrilldown:\n${JSON.stringify(newDrilldown)}`);
    console.log(`[useLogic] TEST newTermProps:\n${JSON.stringify(newTermProps)}`);
    console.log(`[useLogic] CALL setAnatomicalTermsProps...`);
    setAnatomicalTermsProps(newTermProps);
    console.log(`[useLogic] CALL setAnatomicalTerms...`);
    setAnatomicalTerms(newDrilldown);
    console.log(`[useLogic] DONE onToggleExpandCollapse.`);
  }

  return {
    searchResult,
    anatomicalTerms,
    anatomicalTermsProps,
    maxExpScore,
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
    isCountLoading,
    pageNumber,
    pageType,
    dataTypesExpCalls,
    dataQuality,
    conditionalParam2,
    callTypes,
    condObserved,
    setAnatomicalTerms,
    setAnatomicalTermsProps,
    setCondObserved,
    setCallTypes,
    setConditionalParam2,
    setDataQuality,
    setDataTypesExpCalls,
    setPageType,
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
    AutoCompleteByType,
    onSubmit,
    resetForm,
    triggerSearch,
    triggerSearchChildren,
    triggerHomologSearch,
    triggerCounts,
    addConditionalParam,
    getSearchParams,
    onToggleExpandCollapse
  };
};

export default useLogic;
