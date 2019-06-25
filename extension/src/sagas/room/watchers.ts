import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';
import { fetchRoomsListEffect, fetchRoomInfoEffect } from './effects';

export function* fetchRoomsListWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOMS_LIST_ACTION, fetchRoomsListEffect);
}

export function* fetchRoomInfoWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOM_INFO_ACTION, fetchRoomInfoEffect);
}

export default function roomWatchers() {
  return [fetchRoomsListWatcher(), fetchRoomInfoWatcher()];
}
