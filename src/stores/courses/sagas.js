import { takeLatest, put, call, fork, all, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import request from 'src/utils/request';
import api from 'src/config/api';
import { fetchCourseDataSuccessful, fetchCourseDataFailed } from './actions';
// import { openLoaderAction, closeLoaderAction } from '../loader/reducer';
// import { openSnackBar } from '../reducer';
import { FETCH_COURSE_DATA } from './types';

export function* fetchData({ payload }) {
  try {
    // yield put(openLoaderAction());
    const res = yield call(request, 'get', api.course.list());
    debugger;
    if (res.status === 200) {
      yield put(fetchCourseDataSuccessful(res.data));
      //   yield put(closeLoaderAction());
    } else {
      yield put(fetchCourseDataFailed());
      //   yield put(closeLoaderAction());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchCourseDataFailed());
    // yield put(closeLoaderAction());
  }
}

export function* fetchDataSaga() {
  yield takeLatest(FETCH_COURSE_DATA, fetchData);
}

export function* root() {
  yield all([fork(fetchDataSaga)]);
}

export default root;
