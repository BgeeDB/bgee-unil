import ReactGA from 'react-ga';
import React from 'react';
import axios from 'axios';
import { getAxiosAddNotif } from './prod/constant';

const errorHandler = (error) => {
  if (axios.isCancel(error)) return;
  if (error.response) {
    const {
      response: {
        data: { data },
      },
    } = error;
    // response falls out of the range of 2xx
    ReactGA.exception({
      description: `${error.response.status}_${data.exceptionType}${
        data.incorrectParameters ? `_${data.incorrectParameters}` : ''
      }${data.invalidKey ? `_${data.invalidKey}` : ''}`,
    });
    getAxiosAddNotif()({
      id: Math.random().toString(10),
      children: <p>{error.message}</p>,
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
