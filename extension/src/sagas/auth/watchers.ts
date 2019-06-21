import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { loginEffect } from './effects';

export function* loginWatcher() {
  yield takeLatest(actionConstants.LOGIN, loginEffect);
}

export default function AuthWatchers() {
  return [loginWatcher()];
}
