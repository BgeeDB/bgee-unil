import axios from 'axios';
import axiosInstance from './constant';
import errorHandler from '../errorHandler';
import PATHS from '../../routes/paths';
import obolibraryLinkFromID from '../../helpers/obolibraryLinkFromID';

export const SEARCH_CANCEL_API = {
  genes: {
    autoComplete: null,
    geneSearchResult: null,
    getGeneralInformation: null,
    expression: null,
    homologs: null,
    xrefs: null,
    AutoCompleteByType: null,
  },
  species: {
    exprCalls: null,
    processedValues: null,
    species: null,
    speciesDevelopmentSexe: null,
  },
  rawData: {
    search: null,
    count: null,
  },
};

const DEFAULT_PARAMETERS = (page, action) => {
  const params = new URLSearchParams();

  params.append('display_type', 'json');
  params.append('page', page);
  if (action) params.append('action', action);

  return params;
};

const search = {
  anatomicalHomology: (
    { type, query },
    species = undefined,
    aeList = undefined
  ) =>
    new Promise((resolve, reject) => {
      let params = DEFAULT_PARAMETERS('anat_similarities');
      if (type === 'form') {
        if (aeList) params.append('ae_list', aeList);
        species.forEach((s) => params.append('species_list', s));
      } else if (type === 'query') {
        params = new URLSearchParams(query);

        params.append('display_type', 'json');
        params.append('page', 'anat_similarities');
        params.append('display_rp', 1);
      } else {
        reject(new Error('invalid format'));
      }

      axiosInstance
        .get(`/?${params.toString()}`)
        .then(({ data }) => {
          const formatted = JSON.parse(JSON.stringify(data));
          formatted.data.anatEntitySimilarities =
            formatted.data.anatEntitySimilarities.map(
              ({
                anatEntities,
                ancestralTaxon,
                speciesWithAnatEntityPresence,
              }) => ({
                anatEntities: anatEntities.map((a) => ({
                  name: `${a.name} (${a.id})`,
                  link: obolibraryLinkFromID(a.id),
                  id: a.id,
                })),
                ancestralTaxon: `${ancestralTaxon.scientificName} (${ancestralTaxon.id})`,
                speciesWithAnatEntityPresence:
                  speciesWithAnatEntityPresence.map((s) => ({
                    id: s.id,
                    name: `${s.genus} ${s.speciesName}`,
                    link: PATHS.SEARCH.SPECIES_ITEM.replace(':id', s.id),
                  })),
                aeSorter: anatEntities
                  .map((a) => `${a.name} (${a.id})`)
                  .join(', '),
                atSorter: `${ancestralTaxon.scientificName} (${ancestralTaxon.id})`,
                ssSorter: speciesWithAnatEntityPresence
                  .map((s) => `${s.genus} ${s.speciesName}`)
                  .join(', '),
              })
            );
          resolve(formatted);
        })
        .catch((error) => {
          errorHandler(error);
          reject(error?.response);
        });
    }),
  genes: {
    autoComplete: (val) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS(
          'search',
          'auto_complete_gene_search'
        );
        params.append('query', `${val}`);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.genes.autoComplete = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    AutoCompleteByType: (searchType, query, speciesId) =>
      new Promise((resolve, reject) => {
        let params = {};

        // /!\ will change after asking to the client that all search_autocomplete are the same
        // The "if gene" here will then be removed
        if (searchType === 'gene') {
          params = DEFAULT_PARAMETERS('gene');
        } else {
          params = DEFAULT_PARAMETERS('search', searchType);
        }
        if (speciesId) {
          params.append('species_id', speciesId);
        }
        params.append('query', `${query}`);
        params.append('limit', 20);

        // Allow to cancel the previous request if it is not yet completed
        // (convinient for an autocomplete triggered everytime a character is taped)
        if (SEARCH_CANCEL_API?.genes?.AutoCompleteByType !== null) {
          SEARCH_CANCEL_API.genes?.AutoCompleteByType?.(
            '-- Search was canceled because another search was triggered --'
          );
        }
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.genes.AutoCompleteByType = c;
            }),
          })
          .then(({ data }) => {
            SEARCH_CANCEL_API.genes.AutoCompleteByType = null;
            return resolve(data);
          })
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    geneSearchResult: (val) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('gene');
        params.append('query', `${val}`);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.genes.geneSearchResult = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    getGeneralInformation: (geneId) =>
      new Promise((resolve, reject) => {
        // https://bgee.org/api/?page=gene&action=general_info&gene_id=GENE_ID&display_type=json
        const params = DEFAULT_PARAMETERS('gene', 'general_info');
        params.append('gene_id', geneId);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.genes.getGeneralInformation = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    expression: (geneId, speciesId, fields, dataType, isNotExpressed = false) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('gene', 'expression');
        if (isNotExpressed) params.append('expr_type', 'not_expressed');
        params.append('gene_id', geneId);
        params.append('species_id', speciesId);

        if (fields.anat) {
          params.append('cond_param', 'anat_entity');
          params.append('cond_param', 'cell_type');
        }
        if (fields.strain) params.append('cond_param', 'strain');
        if (fields.devStage) params.append('cond_param', 'dev_stage');
        if (fields.sex) params.append('cond_param', 'sex');
        dataType.forEach((d) => params.append('data_type', d));
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.genes.expression = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    homologs: (geneId, speciesId) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('gene', 'homologs');
        params.append('gene_id', geneId);
        params.append('species_id', speciesId);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.genes.homologs = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    xrefs: (geneId, speciesId) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('gene', 'xrefs');
        params.append('gene_id', geneId);
        params.append('species_id', speciesId);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.genes.xrefs = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
  },
  species: {
    exprCalls: () =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('download', 'expr_calls');
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.species.exprCalls = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    processedValues: () =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('download', 'proc_values');
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.species.processedValues = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    species: (speciesId) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('species');
        params.append('species_id', speciesId);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.species.exprCalls = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    list: () =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('species');
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.species.exprCalls = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
    speciesDevelopmentSexe: (speciesId) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('data');
        params.append('detailed_rp', '1');
        params.append('species_id', speciesId);
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.species.speciesDevelopmentSexe = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((error) => {
            errorHandler(error);
            reject(error?.response);
          });
      }),
  },
  rawData: {
    search: (form, isOnlyCounts) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('data', form.pageType);

        // Here we force the pageType in the URL to retrieve it
        // ("data" is used by the hash too, so we cannot use it as key)
        params.append('pageType', form.pageType);

        // We ask for the result count (for the "localCount")
        params.append('get_result_count', '1');

        // Patch used to force a gene in the query parameters to avoid too long requests
        // (A server cache has been set since)
        // _____________________________________________________________________________
        // if (
        //   form.pageType === 'proc_expr_values' &&
        //   form.selectedGene?.length === 0
        // ) {
        //   console.warn('FAKE FILTER GENE ACTIVATED !');
        //   // human gene to avoid too long requests when no gene specified!
        //   params.append('gene_id', 'ENSG00000158813');

        //   // and if there is no selected species...
        //   // (this is mandatory to use a gene filter)
        //   // we also force human as species
        //   if (!form.selectedSpecies && !form?.initSearch?.get('species_id')) {
        //     params.append('species_id', '9606');
        //   }
        // }
        // _____________________________________________________________________________

        if (isOnlyCounts) {
          params.append('data_type', 'all');
          params.append('get_filters', '1');
        } else {
          form.dataType.forEach((type) => params.append('data_type', type));

          params.append('get_results', '1');
          params.append('get_filters', '1');
          params.append('get_column_definition', '1');
          // To be able to extract key-value pairs to pre-fill the form
          params.append('display_rp', '1');

          const offset = form?.limit * (form?.pageNumber - 1);
          params.append('offset', offset);
          params.append('limit', form?.limit);
          // Warning : useless for API call but usefull for prefilling pagination
          params.append('pageNumber', form?.pageNumber);
        }

        if (form.isFirstSearch) {
          params.append('detailed_rp', '1'); // To get filters initial values

          // We send all values contained in the URL
          // that is to say the initSearch combined with "base" parameters which are the only parameters
          // in case of first arrival on the page
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, val] of form?.initSearch) {
            if (
              key !== 'data_type' &&
              key !== 'offset' &&
              key !== 'limit' &&
              key !== 'pageType' &&
              key !== 'pageNumber'
            ) {
              /* For the 1st search we don't put "filter_*" in the count!
              if (!isOnlyCounts || (isOnlyCounts && !key.includes('filter_'))) { */
                params.append(key, val);
              // }
            }
          }
        } else {
          // If no hash, we send all parameters separately
          if (form.selectedSpecies) {
            params.append('species_id', form.selectedSpecies);
          }
          form.selectedCellTypes.forEach((ct) =>
            params.append('cell_type_id', ct)
          );
          form.selectedGene.forEach((g) => params.append('gene_id', g));
          form.selectedStrain.forEach((s) => params.append('strain', s));
          form.selectedDevStages.forEach((ds) => params.append('stage_id', ds));
          form.selectedTissue.forEach((t) =>
            params.append('anat_entity_id', t)
          );
          form.selectedExpOrAssay.forEach((exp) =>
            params.append('exp_assay_id', exp)
          );
          form.selectedSexes.forEach((s) => params.append('sex', s));

          if (form.hasCellTypeSubStructure) {
            params.append('cell_type_descendant', form.hasCellTypeSubStructure);
          }
          if (form.hasTissueSubStructure) {
            params.append('anat_entity_descendant', form.hasTissueSubStructure);
          }
          if (form.hasDevStageSubStructure) {
            params.append('stage_descendant', form.hasDevStageSubStructure);
          }

          // Search form for Expression calls
          if (form?.dataQuality) {
            params.append('data_qual', form?.dataQuality);
          }
          if (form?.callTypes) {
            form.callTypes.forEach((ct) => params.append('expr_type', ct));
          }
          if (form?.conditionalParam2) {
            form.conditionalParam2.forEach((cp) =>
              params.append('cond_param2', cp)
            );
          }
          if (form?.condObserved !== undefined) {
            params.append('cond_observed', form?.condObserved);
          }

          // Application of filters! (VS form)
          if (form?.filters && !isOnlyCounts) {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, values] of Object.entries(form.filters)) {
              // console.log('key = ', key);
              // console.log('values = ', values);
              values.forEach((obj) => params.append(key, obj.value));
            }
          }
        }

        // Allow to cancel the previous request if it is not yet completed
        // to not have a "recovery of data when changing tab too quickly"
        let typeToken = '';
        if (isOnlyCounts) {
          typeToken = 'count';
        } else {
          typeToken = 'search';
        }
        if (SEARCH_CANCEL_API?.rawData?.[typeToken] !== null) {
          SEARCH_CANCEL_API?.rawData?.[typeToken]?.(
            '-- Search was canceled because another search was triggered --'
          );
        }

        const paramsURLCalled = params.toString();
        axiosInstance
          .get(`/?${paramsURLCalled}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.rawData[typeToken] = c;
            }),
          })
          .then(({ data }) => {
            SEARCH_CANCEL_API.rawData[typeToken] = null;
            return resolve({ resp: data, paramsURLCalled });
          })
          .catch((error) => {
            errorHandler(error);
            reject(error?.response || error?.message);
          });
      }),
  },
  experiments: {
    getExperiment: (experimentId) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('data');
        params.append('exp_id', experimentId);
        axiosInstance
          .get(`/?${params.toString()}`)
          .then((response) => resolve(response))
          .catch((error) => {
            errorHandler(error);
            reject(error);
          });
      }),
  },
};

export default search;
