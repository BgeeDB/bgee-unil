import React from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import axiosInstance, { getAxiosAddNotif } from './constant';

export const TOP_ANAT_CANCEL_API = {
  autoCompleteGenes: null,
  runJob: null,
  getJob: null,
  cancelJob: null,
  getResults: null,
};

const DEFAULT_PARAMETERS = (page = 'top_anat') => {
  const params = new URLSearchParams();

  params.append('ajax', 1);
  params.append('display_type', 'json');
  params.append('page', page);

  return params;
};

const topAnat = {
  autoCompleteGenes: (genes, isFg = true) =>
    new Promise((resolve, reject) => {
      if (TOP_ANAT_CANCEL_API.autoCompleteGenes) {
        TOP_ANAT_CANCEL_API.autoCompleteGenes();
        TOP_ANAT_CANCEL_API.autoCompleteGenes = null;
      }
      const params = DEFAULT_PARAMETERS();
      params.append('action', 'gene_validation');
      params.append(isFg ? 'fg_list' : 'bg_list', genes);
      axiosInstance
        .post('/', params, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            TOP_ANAT_CANCEL_API.autoCompleteGenes = c;
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
            ReactGA.exception({ description: message });
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
  runJob: (form) =>
    new Promise((resolve, reject) => {
      if (TOP_ANAT_CANCEL_API.runJob) {
        TOP_ANAT_CANCEL_API.runJob();
        TOP_ANAT_CANCEL_API.runJob = null;
      }
      const t = new Date();
      const paddedValue = (v) => String(v).padStart(2, '0');

      const params = DEFAULT_PARAMETERS();
      params.append('action', 'submit_job');
      params.append('display_rp', 1);
      params.append('fg_list', form.genes);
      params.append('bg_list', form.genesBg);
      params.append('data_type', 'FULL_LENGTH');
      params.append('data_type', form.affymetrix && 'AFFYMETRIX');
      params.append('data_type', form.est && 'EST');
      params.append('data_type', form.inSitu && 'IN_SITU');
      params.append('data_type', form.rnaSeq && 'RNA_SEQ');
      if (form.stages === 'all') {
        params.append('stage_id', '');
      } else {
        form.stages.forEach((s) => params.append('stage_id', s));
      }
      params.append('data_qual', form.dataQuality);
      params.append('decorr_type', form.decorrelationType);
      params.append('node_size', form.nodeSize);
      params.append('nb_node', form.nbNode);
      params.append('fdr_thr', form.fdrThreshold);
      params.append('p_value_thr', form.pValueThreshold);
      params.append(
        'job_creation_date',
        `${paddedValue(t.getDate())}/${paddedValue(
          t.getMonth()
        )}/${t.getFullYear()}, ${paddedValue(t.getHours())}:${paddedValue(
          t.getMinutes()
        )}:${paddedValue(t.getSeconds())}`
      );
      params.append('job_title', form.jobDescription);
      params.append('email', form.email);
      params.append('submitted', 'true');
      params.append('expr_type', 'EXPRESSED');
      axiosInstance
        .post(`/`, params, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            TOP_ANAT_CANCEL_API.autoCompleteGenes = c;
          }),
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(
          ({
            response: {
              data,
              data: { message },
            },
          }) => {
            ReactGA.exception({ description: message });
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
  getJob: (searchId, jobId) =>
    new Promise((resolve, reject) => {
      if (TOP_ANAT_CANCEL_API.getJob) {
        TOP_ANAT_CANCEL_API.getJob();
        TOP_ANAT_CANCEL_API.getJob = null;
      }
      const params = DEFAULT_PARAMETERS();
      params.append('action', 'tracking_job');
      params.append('display_rp', 1);
      params.append('data', searchId);
      params.append('job_id', jobId);
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            TOP_ANAT_CANCEL_API.autoCompleteGenes = c;
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
            ReactGA.exception({ description: message });
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
  cancelJob: (jobId) =>
    new Promise((resolve, reject) => {
      if (TOP_ANAT_CANCEL_API.cancelJob) {
        TOP_ANAT_CANCEL_API.cancelJob();
        TOP_ANAT_CANCEL_API.cancelJob = null;
      }
      const params = DEFAULT_PARAMETERS('job');
      params.append('job_id', jobId);
      axiosInstance
        .post(`/`, params, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            TOP_ANAT_CANCEL_API.cancelJob = c;
          }),
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(
          ({
            response: {
              data,
              data: { message },
            },
          }) => {
            ReactGA.exception({ description: message });
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
  getResults: (searchId) =>
    new Promise((resolve, reject) => {
      if (TOP_ANAT_CANCEL_API.getResults) {
        TOP_ANAT_CANCEL_API.getResults();
        TOP_ANAT_CANCEL_API.getResults = null;
      }
      const params = DEFAULT_PARAMETERS();
      params.append('action', 'get_results');
      params.append('gene_info', 1);
      params.append('display_rp', 1);
      params.append('data', searchId);
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            TOP_ANAT_CANCEL_API.autoCompleteGenes = c;
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
            ReactGA.exception({ description: message });
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
};

export default topAnat;
