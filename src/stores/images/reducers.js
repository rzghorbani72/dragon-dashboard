import { FETCH_DATA, FETCH_DATA_FAILED, FETCH_DATA_SUCCESSFUL } from './types';

const initial = {
  data: {},
  fetch_status: ''
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        fetch_status: 'loading'
      };
    case FETCH_DATA_SUCCESSFUL:
      return {
        ...state,
        data: action.payload,
        fetch_status: 'successful'
      };
    case FETCH_DATA_FAILED:
      return {
        ...state,
        fetch_status: 'failed'
      };
    default:
      return state;
  }
};

export default reducer;
