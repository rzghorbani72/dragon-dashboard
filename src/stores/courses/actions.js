import { FETCH_COURSE_DATA, FETCH_COURSE_DATA_FAILED, FETCH_COURSE_DATA_SUCCESSFUL } from './types';

export const fetchCourseData = (payload) => ({
  type: FETCH_COURSE_DATA,
  payload
});
export const fetchCourseDataSuccessful = (payload) => ({
  type: FETCH_COURSE_DATA_SUCCESSFUL,
  payload
});
export const fetchCourseDataFailed = () => ({
  type: FETCH_COURSE_DATA_FAILED
});
