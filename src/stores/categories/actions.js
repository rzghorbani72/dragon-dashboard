import {
  FETCH_CATEGORY_DATA,
  FETCH_CATEGORY_DATA_FAILED,
  FETCH_CATEGORY_DATA_SUCCESSFUL
} from './types';

export const fetchCategoriesData = (payload) => ({
  type: FETCH_CATEGORY_DATA,
  payload
});
export const fetchCategoriesDataSuccessful = (payload) => ({
  type: FETCH_CATEGORY_DATA_SUCCESSFUL,
  payload
});
export const fetchCategoriesDataFailed = () => ({
  type: FETCH_CATEGORY_DATA_FAILED
});
