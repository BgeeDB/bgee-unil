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
  },
  species: {
    exprCalls: null,
    processedValues: null,
    species: null,
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
  },
};

export default search;
