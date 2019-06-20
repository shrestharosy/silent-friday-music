import { call, put } from 'redux-saga/effects';

import { loginAPI } from './apis';
import * as ActionCreators from '../../actionCreators/actionCreator';

export function* loginEffect(action) {
  try {
    const token = yield call(loginAPI, action.payload);
    yield put(ActionCreators.fillAuthAction({ token: token }));
    if (action.resolve) {
      action.resolve(token);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
