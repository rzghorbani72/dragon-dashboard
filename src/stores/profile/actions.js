import {
  FETCH_PROFILE_DATA,
  FETCH_PROFILE_DATA_FAILED,
  FETCH_PROFILE_DATA_SUCCESSFUL
} from './types';

export const fetchProfileData = () => ({
  type: FETCH_PROFILE_DATA
});
export const fetchDataSuccessful = (payload) => ({
  type: FETCH_PROFILE_DATA_SUCCESSFUL,
  payload
});
export const fetchDataFailed = () => ({
  type: FETCH_PROFILE_DATA_FAILED
});
