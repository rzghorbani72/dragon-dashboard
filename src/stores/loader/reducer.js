// ACTIONS
const OPEN_lOADER = 'OPEN_lOADER';
const CLOSE_lOADER = 'CLOSE_lOADER';

// REDUCER
const loaderReducer = (loader = { isOpen: false }, action) => {
  switch (action.type) {
    case OPEN_lOADER:
      return {
        ...loader,
        isOpen: true
      };

    case CLOSE_lOADER:
      return {
        ...loader,
        isOpen: false
      };

    default:
      return loader;
  }
};

export default loaderReducer;

// ACTION CREATORS
export const openLoaderAction = () => ({ type: OPEN_lOADER });
export const closeLoaderAction = () => ({ type: CLOSE_lOADER });
