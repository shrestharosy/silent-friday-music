import { takeLatest } from 'redux-saga/effects';

import * as ActionConstants from '../../constants/actions';
import { loginEffect } from './effects';

export function* loginWatcher() {
  yield takeLatest(ActionConstants.LOGIN, loginEffect);
}

export default function AuthWatchers() {
  return [loginWatcher()];
}
