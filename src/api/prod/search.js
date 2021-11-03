import React from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import axiosInstance, { getAxiosAddNotif } from './constant';

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
          .catch(
            ({
              response: {
                data,
                data: { message },
              },
            }) => {
              console.log(data);
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{message}</p>,
                className: `is-danger`,
              });
              reject();
            }
          );
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
          .catch(
            ({
              response: {
                data,
                data: { message },
              },
            }) => {
              console.log(data);
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{message}</p>,
                className: `is-danger`,
              });
              reject();
            }
          );
      }),
    getGeneralInformation: (geneId) =>
      new Promise((resolve, reject) => {
        // https://bgee.org/bgee_test/?page=gene&action=general_info&gene_id=GENE_ID&display_type=json
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
          });
      }),
    expression: (geneId, speciesId, fields) =>
      new Promise((resolve, reject) => {
        const params = DEFAULT_PARAMETERS('gene', 'expression');
        params.append('gene_id', geneId);
        params.append('species_id', speciesId);

        if (fields.anat) {
          params.append('cond_param', 'anat_entity');
          params.append('cond_param', 'cell_type');
        }
        if (fields.strain) params.append('cond_param', 'strain');
        if (fields.devStage) params.append('cond_param', 'dev_stage');
        if (fields.sex) params.append('cond_param', 'sex');
        axiosInstance
          .get(`/?${params.toString()}`, {
            cancelToken: new axios.CancelToken((c) => {
              // An executor function receives a cancel function as a parameter
              SEARCH_CANCEL_API.genes.expression = c;
            }),
          })
          .then(({ data }) => resolve(data))
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
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
          .catch((err) => {
            if (!axios.isCancel(err)) {
              ReactGA.exception({ description: err.response?.data?.message });
              getAxiosAddNotif()({
                id: Math.random().toString(10),
                children: <p>{err.response?.data?.message}</p>,
                className: `is-danger`,
              });
            }
            reject();
          });
      }),
  },
};

export default search;
