import React from 'react';
import axios from 'axios';
import axiosInstance, { getAxiosAddNotif } from './constant';

export const HOME_CANCEL_API = {
  speciesList: null,
};

const DEFAULT_PARAMETERS = (page = 'species') => {
  const params = new URLSearchParams();

  params.append('display_type', 'json');
  params.append('page', page);

  return params;
};

const home = {
  speciesList: () =>
    new Promise((resolve, reject) => {
      const params = DEFAULT_PARAMETERS();
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            HOME_CANCEL_API.speciesList = c;
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

export default home;
