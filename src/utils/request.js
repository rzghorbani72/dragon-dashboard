import axios from 'axios';
import { merge, isEmpty } from 'lodash';

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

function requestHandler(method = 'get', url, bodyData = {}) {
  switch (method) {
    case 'get':
      return axios
        .get(url, { headers: merged_header })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => handleApiResponse(err?.response));
    case 'post':
      return axios({
        method: 'POST',
        url,
        data: bodyData,
        headers: merged_header
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => handleApiResponse(err?.response));
    case 'put':
      return axios({
        method: 'PUT',
        url,
        data: isEmpty(bodyData) ? {} : bodyData,
        headers: merged_header
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => handleApiResponse(err?.response));
    case 'patch':
      return axios({
        method: 'PATCH',
        url,
        data: bodyData,
        headers: merged_header
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => handleApiResponse(err?.response));
    case 'delete':
      return axios({
        method: 'DELETE',
        url,
        headers: merged_header,
        data: bodyData
      })
        .then((response) => ({
          ...response,
          status_name: 'success'
        }))
        .catch((err) => handleApiResponse(err?.response));
  }
}
export default requestHandler;
