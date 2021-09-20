import axios from 'axios';
import { isEmpty } from 'lodash';

axios.interceptors.request.use(
  async (config) => config,
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    response,
  async (error) =>
    // if (error.response?.status === 401) {
    // }

    Promise.reject(error)
);
axios.defaults.withCredentials = true;

async function request(method = 'get', url, bodyData = {}) {
  switch (method) {
    case 'get':
      return axios
        .get(url)
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
    case 'post':
      return axios({
        method: 'POST',
        url,
        data: bodyData
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
    case 'put':
      return axios({
        method: 'PUT',
        url,
        data: isEmpty(bodyData) ? {} : bodyData
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
    case 'patch':
      return axios({
        method: 'PATCH',
        url,
        data: bodyData
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
    case 'delete':
      return axios({
        method: 'DELETE',
        url,
        data: bodyData
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
    default:
      return axios
        .get(url)
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => ({
          ...err,
          status_name: 'error'
        }));
  }
}
export default request;
