import prod from './prod';
import mock from './mock';
import config from '../config.json';

const api =
  process.env.NODE_ENV === 'production' || config.production ? prod : mock;

export default api;
