import { combineReducers } from 'redux';
import users from './users/reducers';
import profile from './profile/reducers';

export default combineReducers({
  users,
  profile
});
