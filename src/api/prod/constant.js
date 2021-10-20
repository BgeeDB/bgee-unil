import axios from 'axios';

export const API_DOMAIN = 'https://bgee.org/bgee_test';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
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
