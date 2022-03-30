import axios from 'axios';
import config from '../../config.json';

const axiosInstance = axios.create({
  baseURL: config.apiDomain,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

let axiosAddNotif = null;
export const setAxiosAddNotif = (fct) => {
  axiosAddNotif = fct;
};
export const getAxiosAddNotif = () => axiosAddNotif || (() => () => {});

export default axiosInstance;
