import { FETCH_COURSE_DATA, FETCH_COURSE_DATA_FAILED, FETCH_COURSE_DATA_SUCCESSFUL } from './types';

const initial = {
  data: [],
  count: 0,
  fetch_status: ''
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_COURSE_DATA:
      return {
        ...state,
        fetch_status: 'loading'
      };
    case FETCH_COURSE_DATA_SUCCESSFUL:
      return {
        ...state,
        count: action.payload.details.count,
        data: action.payload.details.rows,
        fetch_status: 'successful'
      };
    case FETCH_COURSE_DATA_FAILED:
      return {
        ...state,
        fetch_status: 'failed'
      };
    default:
      return state;
  }
};

export default reducer;
