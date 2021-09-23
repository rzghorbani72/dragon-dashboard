import { combineReducers } from 'redux';
import users from './users/reducers';
import profile from './profile/reducers';
import courses from './courses/reducers';
import categories from './categories/reducers';
import snackbar from './snackbar/reducer';
import loader from './loader/reducer';

export default combineReducers({
  users,
  profile,
  courses,
  categories,
  snackbar,
  loader
});
