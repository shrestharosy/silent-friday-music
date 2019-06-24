import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { loginEffect, fetchProfileEffect } from './effects';

export function* loginWatcher() {
  yield takeLatest(actionConstants.LOGIN, loginEffect);
}

export function* fetchProfileWatcher() {
  yield takeLatest(actionConstants.FETCH_PROFILE_ACTION, fetchProfileEffect);
}

export default function AuthWatchers() {
  return [loginWatcher(), fetchProfileWatcher()];
}
