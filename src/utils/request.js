import axios from 'axios';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

axios.interceptors.request.use(
  async (config) => config,
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

async function request(
  method = 'get',
  url,
  bodyData = {},
  headers = { 'Content-Type': 'application/json' }
) {
  switch (method) {
    case 'get':
      return axios
        .get(url, headers)
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
        data: bodyData,
        headers
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
        headers,
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
        headers,
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
        headers,
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
