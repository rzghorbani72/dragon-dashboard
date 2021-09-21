import { FETCH_DATA, FETCH_DATA_FAILED, FETCH_DATA_SUCCESSFUL } from './types';

export const fetchUsersData = (payload) => ({
  type: FETCH_DATA,
  payload
});
export const fetchUsersDataSuccessful = (payload) => ({
  type: FETCH_DATA_SUCCESSFUL,
  payload
});
export const fetchUsersDataFailed = () => ({
  type: FETCH_DATA_FAILED
});
