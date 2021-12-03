import axios from 'axios';
import React from 'react';
import axiosInstance, { getAxiosAddNotif } from './constant';
import errorHandler from '../errorHandler';
import random from '../../helpers/random';

export const EXPRESSION_COMPARISON_API = {
  getResults: null,
};

const DEFAULT_PARAMETERS = (page = 'expression_comparison') => {
  const params = new URLSearchParams();
  params.append('page', page);

  return params;
};

const expressionComparison = {
  getResults: (geneList) =>
    new Promise((resolve, reject) => {
      const params = DEFAULT_PARAMETERS();
      params.append('gene_list', geneList);
      params.append('display_type', 'json');
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            EXPRESSION_COMPARISON_API.getResults = c;
          }),
        })
        .then(({ data }) => resolve(data))
        .catch((error) => {
          if (
            error?.response?.data?.code === 400 &&
            error?.response?.data?.data?.exceptionType ===
              'JobResultNotFoundException'
          ) {
            getAxiosAddNotif()({
              id: random.toString(),
              children: (
                <p>
                  Results were not present on our server, resubmitting the
                  analysis
                </p>
              ),
              className: `is-warning`,
            });
          } else {
            errorHandler(error);
          }
          reject(error?.response);
        });
    }),
};

export default expressionComparison;
