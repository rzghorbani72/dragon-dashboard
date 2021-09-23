import { takeLatest, put, call, fork, all, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchDataSuccessful, fetchDataFailed } from './actions';
//import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
//import { openSnackBar } from '../reducer';
import { FETCH_DATA } from './types';

export function* fetchData({ payload }) {
  const storeId = yield select((state) => state.selectedStore.id);

  try {
    // yield put(openLoaderAction());
    const res = yield call(request, 'get', api.user.profile());
    if (!isEmpty(res)) {
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

export function* fetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchData);
}

export function* root() {
  yield all([fork(fetchDataSaga)]);
}

export default root;
