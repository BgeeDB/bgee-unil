import React from 'react';
import axios from 'axios';
import axiosInstance, { getAxiosAddNotif } from './constant';

export const SEARCH_CANCEL_API = {
  genes: {
    getGeneralInformation: null,
  },
};

const DEFAULT_PARAMETERS = (page, action) => {
  const params = new URLSearchParams();

  params.append('display_type', 'json');
  params.append('page', page);
  params.append('action', action);

  return params;
};

const search = {
  genes: {
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
  },
};

export default search;
