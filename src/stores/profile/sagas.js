import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchDataSuccessful, fetchDataFailed } from './actions';
import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
import { FETCH_PROFILE_DATA } from './types';

export function* fetchProfileData() {
  try {
    yield put(openLoaderAction());
    const res = yield call(request, 'get', api.user.profile());
    yield put(closeLoaderAction());
    if (res.status === 200) {
      yield put(fetchDataSuccessful(res.data));
    } else {
      yield put(fetchDataFailed());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailed());
    yield put(closeLoaderAction());
  }
}

export function* fetchProfileDataSaga() {
  yield takeLatest(FETCH_PROFILE_DATA, fetchProfileData);
}

export function* root() {
  yield all([fork(fetchProfileDataSaga)]);
}

export default root;
