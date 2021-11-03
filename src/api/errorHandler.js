import ReactGA from 'react-ga';
import React from 'react';
import axios from 'axios';
import { getAxiosAddNotif } from './prod/constant';

const errorHandler = (error) => {
  if (axios.isCancel(error)) return;
  if (error.response) {
    // response falls out of the range of 2xx
    ReactGA.exception({
      description: `${error.response.status}_${
        error.response.data.exceptionType
      }${
        error.response.data.incorrectParameters
          ? `_${error.response.data.incorrectParameters}`
          : ''
      }${
        error.response.data.invalidKey
          ? `_${error.response.data.invalidKey}`
          : ''
      }`,
    });
    getAxiosAddNotif()({
      id: Math.random().toString(10),
      children: <p>{error?.response?.data?.message || error.message}</p>,
      className: `is-danger`,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.debug('Error api request', error.request);
  } else {
    console.debug('Error api', error.message);
  }
};

export default errorHandler;
