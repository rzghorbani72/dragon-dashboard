import {
  FETCH_PROFILE_DATA,
  FETCH_PROFILE_DATA_FAILED,
  FETCH_PROFILE_DATA_SUCCESSFUL
} from './types';

const initial = {
  data: {},
  fetch_status: ''
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DATA:
      return {
        ...state,
        fetch_status: 'loading'
      };
    case FETCH_PROFILE_DATA_SUCCESSFUL:
      return {
        ...state,
        data: action.payload.details,
        fetch_status: 'successful'
      };
    case FETCH_PROFILE_DATA_FAILED:
      return {
        ...state,
        fetch_status: 'failed'
      };
    default:
      return state;
  }
};

export default reducer;
