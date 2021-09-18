import { all } from 'redux-saga/effects';
import userSaga from './users/sagas';

export default function* AppSaga() {
  yield all([userSaga()]);
}
