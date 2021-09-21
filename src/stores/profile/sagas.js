import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchDataSuccessful, fetchDataFailed } from './actions';
// import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
// import { handleOpenAction } from '../reducer';
import { FETCH_PROFILE_DATA } from './types';

export function* fetchProfileData() {
  try {
    // yield put(openLoaderAction());
    const res = yield call(request, 'get', api.user.profile());
    if (res.status === 200) {
      yield put(fetchDataSuccessful(res.data));
      //   yield put(closeLoaderAction());
    } else {
      yield put(fetchDataFailed());
      //   yield put(closeLoaderAction());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailed());
    // yield put(closeLoaderAction());
  }
}

export function* fetchProfileDataSaga() {
  yield takeLatest(FETCH_PROFILE_DATA, fetchProfileData);
}

export function* root() {
  yield all([fork(fetchProfileDataSaga)]);
}

export default root;
