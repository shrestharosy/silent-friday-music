import { takeLatest } from 'redux-saga/effects';
import * as actionConstants from 'src/constants/actions';
import { fetchRoomsListEffect, fetchRoomInfoEffect, leaveRoomEffect } from './effects';

export function* fetchRoomsListWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOMS_LIST_ACTION, fetchRoomsListEffect);
}

export function* fetchRoomInfoWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOM_INFO_ACTION, fetchRoomInfoEffect);
}

export function* leaveRoomWatcher() {
  yield takeLatest(actionConstants.LEAVE_ROOM_ACTION, leaveRoomEffect);
}

export default function roomWatchers() {
  return [fetchRoomsListWatcher(), fetchRoomInfoWatcher(), leaveRoomWatcher()];
}
