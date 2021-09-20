import { combineReducers } from 'redux';
import user from './users/reducers';
import profile from './profile/reducers';

export default combineReducers({
  user,
  profile
});
