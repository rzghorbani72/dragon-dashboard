import {
  FETCH_CATEGORY_DATA,
  FETCH_CATEGORY_DATA_FAILED,
  FETCH_CATEGORY_DATA_SUCCESSFUL
} from './types';

const initial = {
  data: {},
  count: 0,
  fetch_status: ''
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_DATA:
      return {
        ...state,
        fetch_status: 'loading'
      };
    case FETCH_CATEGORY_DATA_SUCCESSFUL:
      return {
        ...state,
        count: action.payload.details.count,
        data: action.payload.details.list,
        fetch_status: 'successful'
      };
    case FETCH_CATEGORY_DATA_FAILED:
      return {
        ...state,
        fetch_status: 'failed'
      };
    default:
      return state;
  }
};

export default reducer;
