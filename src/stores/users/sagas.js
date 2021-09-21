import { takeLatest, put, call, fork, all, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchUsersDataSuccessful, fetchUsersDataFailed } from './actions';
// import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
// import { handleOpenAction } from '../reducer';
import { FETCH_DATA } from './types';

export function* fetchData({ payload }) {
  try {
    // yield put(openLoaderAction());
    const res = yield call(request, 'get', api.user.list());
    debugger;
    if (res.status === 200) {
      yield put(fetchUsersDataSuccessful(res.data.details));
      //   yield put(closeLoaderAction());
    } else {
      yield put(fetchUsersDataFailed());
      //   yield put(closeLoaderAction());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchUsersDataFailed());
    // yield put(closeLoaderAction());
  }
}

export function* fetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchData);
}

export function* root() {
  yield all([fork(fetchDataSaga)]);
}

export default root;
