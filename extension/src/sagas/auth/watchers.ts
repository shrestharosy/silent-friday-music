import { takeLatest } from 'redux-saga/effects';

import * as ActionCreators from '../../actionCreators/actionCreator';

import { loginEffect } from './effects';

export function* loginWatcher() {
  yield takeLatest(ActionCreators.loginAction, loginEffect);
}

export default function AuthWatchers() {
  return [loginWatcher()];
}
