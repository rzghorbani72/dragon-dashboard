import { takeLatest, put, call, fork, all, select } from 'redux-saga/effects';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchUsersDataSuccessful, fetchUsersDataFailed } from './actions';
import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
import { openSnackBar } from '../snackbar/reducer';
import { FETCH_DATA } from './types';

export function* fetchData() {
  try {
    yield put(openLoaderAction());
    const res = yield call(request, 'get', api.user.list());
    yield put(closeLoaderAction());
    if (res.status === 200) {
      yield put(fetchUsersDataSuccessful(res.data.details));
    } else {
      yield put(fetchUsersDataFailed());
      yield put(openSnackBar(res.response.data.message || res.response.data.name, 'error'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchUsersDataFailed());
    yield put(closeLoaderAction());
  }
}

export function* fetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchData);
}

export function* root() {
  yield all([fork(fetchDataSaga)]);
}

export default root;
