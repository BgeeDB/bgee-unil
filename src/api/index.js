import prod from './prod';
import mock from './mock';

const api = process.env.NODE_ENV === 'production' ? prod : mock;

export default api;
