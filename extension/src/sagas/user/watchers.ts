import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { fetchUsersEffect } from './effects';

export function* fetchUsersWatcher() {
  yield takeLatest(actionConstants.FETCH_USERS, fetchUsersEffect);
}

export default function UserWatchers() {
  return [fetchUsersWatcher()];
}
