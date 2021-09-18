import { FETCH_DATA, FETCH_DATA_FAILED, FETCH_DATA_SUCCESSFUL } from './types';

export const fetchData = (payload) => ({
  type: FETCH_DATA,
  payload
});
export const fetchDataSuccessful = (payload) => ({
  type: FETCH_DATA_SUCCESSFUL,
  payload
});
export const fetchDataFailed = () => ({
  type: FETCH_DATA_FAILED
});
