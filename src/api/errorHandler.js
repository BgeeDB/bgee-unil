import ReactGA from 'react-ga';
import React from 'react';
import axios from 'axios';
import { getAxiosAddNotif } from './prod/constant';
import random from '../helpers/random';

const errorHandler = (error) => {
  if (axios.isCancel(error)) return;
  if (error.response) {
    const {
      response: {
        data: { data },
      },
    } = error;
    const incorrectParameters = data.incorrectParameters
      ? `_${data.incorrectParameters}`
      : '';
    const invalidKey = data.invalidKey ? `_${data.invalidKey}` : '';
    // response falls out of the range of 2xx
    ReactGA.exception({
      description: `${error.response.status}_${data.exceptionType}${incorrectParameters}${invalidKey}`,
    });
    getAxiosAddNotif()({
      id: random.toString(),
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
