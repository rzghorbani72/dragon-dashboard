import { all } from 'redux-saga/effects';
import userSaga from './users/sagas';
import profileSaga from './profile/sagas';
import courseSaga from './courses/sagas';
import categorySaga from './categories/sagas';

export default function* AppSaga() {
  yield all([userSaga(), profileSaga(), courseSaga(), categorySaga()]);
}
