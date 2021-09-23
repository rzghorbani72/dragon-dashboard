// ACTIONS
const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR';

const initialState = {
  isOpen: false,
  msg: '',
  severity: ''
};

// REDUCER
const snackbarReducer = (snackbar = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...snackbar,
        isOpen: true,
        msg: action.payload.msg,
        severity: action.payload.severity
      };

    case CLEAR_SNACKBAR:
      return {
        ...snackbar,
        isOpen: false
      };

    default:
      return snackbar;
  }
};

export default snackbarReducer;

// ACTION CREATORS
export const closeSnackBar = () => ({ type: CLEAR_SNACKBAR });

export const openSnackBar = (msg, severity) => ({
  type: OPEN_SNACKBAR,
  payload: { msg, severity }
});
