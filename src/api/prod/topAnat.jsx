import React from 'react';
import axiosInstance, { getAxiosAddNotif } from './constant';

const DEFAULT_PARAMETERS = (params) => {
  params.append('ajax', 1);
  params.append('display_type', 'json');
  params.append('page', 'top_anat');
};
const topAnat = {
  autoCompleteGenes: (genes, isFg = true) => {
    const params = new URLSearchParams();
    DEFAULT_PARAMETERS(params);
    params.append('action', 'gene_validation');
    params.append(isFg ? 'fg_list' : 'bg_list', genes);
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/', params)
        .then(({ data }) => resolve(data))
        .catch(
          ({
            response: {
              data,
              data: {
                code,
                message,
                data: { exceptionType, invalidKey },
              },
            },
          }) => {
            console.log(data);
            getAxiosAddNotif()({
              id: Math.random().toString(10),
              children: <p>{message}</p>,
              className: `is-danger`,
            });
            reject();
            // TODO handle error
          }
        );
    });
  },
  getStatus: (searchId, jobId) => {
    const params = new URLSearchParams();
    DEFAULT_PARAMETERS(params);
    params.append('action', 'tracking_job');
    params.append('display_rp', 1);
    params.append('data', searchId);
    params.append('job_id', jobId);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/?${params.toString()}`)
        .then(({ data }) => resolve(data))
        .catch(
          ({
            response: {
              data,
              data: {
                code,
                message,
                data: { exceptionType, invalidKey },
              },
            },
          }) => {
            console.log(data);
            getAxiosAddNotif()({
              id: Math.random().toString(10),
              children: <p>{message}</p>,
              className: `is-danger`,
            });
            reject();
            // TODO handle error
          }
        );
    });
  },
  getResults: (searchId) => {
    const params = new URLSearchParams();
    DEFAULT_PARAMETERS(params);
    params.append('action', 'get_results');
    params.append('gene_info', 1);
    params.append('display_rp', 1);
    params.append('data', searchId);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/?${params.toString()}`)
        .then(({ data }) => resolve(data))
        .catch(
          ({
            response: {
              data,
              data: {
                code,
                message,
                data: { exceptionType, invalidKey },
              },
            },
          }) => {
            console.log(data);
            getAxiosAddNotif()({
              id: Math.random().toString(10),
              children: <p>{message}</p>,
              className: `is-danger`,
            });
            reject();
            // TODO handle error
          }
        );
    });
  },
  runJob: (form) => {
    const t = new Date();
    const paddedValue = (v) => String(v).padStart(2, '0');

    const params = new URLSearchParams();
    DEFAULT_PARAMETERS(params);
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
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/`, params)
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(
          ({
            response: {
              data,
              data: {
                code,
                message,
                data: { exceptionType, invalidKey },
              },
            },
          }) => {
            console.log(data);
            getAxiosAddNotif()({
              id: Math.random().toString(10),
              children: <p>{message}</p>,
              className: `is-danger`,
            });
            reject();
            // TODO handle error
          }
        );
    });
  },
};
export default topAnat;
