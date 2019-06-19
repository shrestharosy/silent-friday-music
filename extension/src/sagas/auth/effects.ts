import { call } from 'redux-saga/effects';

import { loginAPI } from './apis';

export function* loginEffect(action) {
  try {
    const token = yield call(loginAPI, action.payload);
    if (action.resolve) {
      action.resolve(token);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
