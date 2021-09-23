import { takeLatest, put, call, fork, all, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchCategoriesDataSuccessful, fetchCategoriesDataFailed } from './actions';
// import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
// import { openSnackBar } from '../reducer';
import { FETCH_CATEGORY_DATA } from './types';

export function* fetchData({ payload }) {
  try {
    // yield put(openLoaderAction());
    const res = yield call(request, 'get', api.category.list());
    debugger;
    if (res.status === 200) {
      yield put(fetchCategoriesDataSuccessful(res.data));
      //   yield put(closeLoaderAction());
    } else {
      yield put(fetchCategoriesDataFailed());
      //   yield put(closeLoaderAction());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchCategoriesDataFailed());
    // yield put(closeLoaderAction());
  }
}

export function* fetchDataSaga() {
  yield takeLatest(FETCH_CATEGORY_DATA, fetchData);
}

export function* root() {
  yield all([fork(fetchDataSaga)]);
}

export default root;
