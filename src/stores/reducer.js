import { combineReducers } from 'redux';
import users from './users/reducers';
import profile from './profile/reducers';
import courses from './courses/reducers';

export default combineReducers({
  users,
  profile,
  courses
});
