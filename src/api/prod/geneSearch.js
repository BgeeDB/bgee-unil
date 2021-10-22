import React from 'react';
import axios from 'axios';
import axiosInstance, { getAxiosAddNotif } from './constant';

export const GENE_SEARCH_CANCEL_API = {
  autoCompleteSearchGenes: null,
};

const DEFAULT_PARAMETERS = (page = 'search') => {
  const params = new URLSearchParams();

  params.append('ajax', 1);
  params.append('display_type', 'json');
  params.append('page', page);

  return params;
};

const geneSearch = {
  autoCompleteSearchGenes: (val) =>
    new Promise((resolve, reject) => {
      const params = DEFAULT_PARAMETERS();
      params.append('action', 'auto_complete_gene_search');
      params.append('query', `${val}`);
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            GENE_SEARCH_CANCEL_API.autoCompleteSearchGenes = c;
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
};

export default geneSearch;
