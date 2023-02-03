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
    autoCompleteByType: null,
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
    autoCompleteByType: (searchType, query, speciesId) =>
      new Promise((resolve, reject) => {
        let params = {};

        // /!\ voué à changer après demande au client pour que toutes les search_autocomplete soit
        // pareil ... il faura donc enlever le if gene ici
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

        // Permet de cancel la requête précédente si elle n'a pas encore aboutie
        // (pratique pour un autocomplete triggered à chaque fois qu'on tape un charactère)
        if (SEARCH_CANCEL_API?.genes?.autoCompleteByType !== null) {
          SEARCH_CANCEL_API.genes?.autoCompleteByType?.(
            '-- Search was canceled because another search was triggered --'
          );
        }
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              SEARCH_CANCEL_API.genes.autoCompleteByType = c;
            }),
          })
          .then(({ data }) => {
            SEARCH_CANCEL_API.genes.autoCompleteByType = null;
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

        // Ici on force le pageType dans l'url pour le retrouver
        // ( en effet "data" est utilisé par le hash aussi donc on ne peut pas l'utilisé comme key)
        params.append('pageType', form.pageType);

        // On demande le count des résultats (pour le "localCount")
        params.append('get_result_count', '1');

        // Patch qui servait à forcer un gène dans les paramètres d'envoie pour éviter des
        // requêtes exessivement longues ( du cache côté server à été mis en place depuis )
        // _____________________________________________________________________________
        // if (
        //   form.pageType === 'proc_expr_values' &&
        //   form.selectedGene?.length === 0
        // ) {
        //   console.warn('FAKE FILTER GENE ACTIVATED !');
        //   // gène humain pour éviter les requêtes trop longues quand aucun gène n'est précisé !
        //   params.append('gene_id', 'ENSG00000158813');

        //   // et si jamais il n'y a pas d'espèce selectionnée...
        //   // ( ce qui est obligatoire pour mettre un filtre de gène)
        //   // on force aussi à l'espèce humaine
        //   if (!form.selectedSpecies && !form?.initSearch?.get('species_id')) {
        //     params.append('species_id', '9606');
        //   }
        // }
        // _____________________________________________________________________________

        if (isOnlyCounts) {
          params.append('data_type', 'all');
        } else {
          form.dataType.forEach((type) => params.append('data_type', type));

          params.append('get_results', '1');
          params.append('get_filters', '1');
          params.append('get_column_definition', '1');
          // Pour pouvoir extraire les paire de clés-valeur à pré-remplir dans le formulaire
          params.append('display_rp', '1');

          const offset = form?.limit * (form?.pageNumber - 1);
          params.append('offset', offset);
          params.append('limit', form?.limit);
          // Warning : useless for API call but usefull for prefilling pagination
          params.append('pageNumber', form?.pageNumber);
        }

        if (form.isFirstSearch) {
          if (!isOnlyCounts) {
            params.append('detailed_rp', '1'); // Pour obtenir les valeurs initiales des filtres
          }

          // On envoie toutes les valeurs contenu dans l'url
          // soit le initSearch combiné aux paramètres "de base" qui seront les seuls paramètres en cas
          // de première arrivée sur la page
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, val] of form?.initSearch) {
            if (
              key !== 'data_type' &&
              key !== 'offset' &&
              key !== 'limit' &&
              key !== 'pageType' &&
              key !== 'pageNumber'
            ) {
              // Pour la première recherche on ne met pas les "filter_*" dans le count !
              if (!isOnlyCounts || (isOnlyCounts && !key.includes('filter_'))) {
                params.append(key, val);
              }
            }
          }
        } else {
          // Si pas de hash on envoie tous les paramètres séparéments
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

          // Application des filtres ! (VS form)
          if (form?.filters && !isOnlyCounts) {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, values] of Object.entries(form.filters)) {
              // console.log('key = ', key);
              // console.log('values = ', values);
              values.forEach((obj) => params.append(key, obj.value));
            }
          }
        }

        // Permet de cancel la requête précédente si elle n'a pas encore aboutie
        // Pour ne pas avoir de "recouvrement de données en changeant trop vite d'onglet"
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
