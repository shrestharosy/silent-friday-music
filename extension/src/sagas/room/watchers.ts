import { takeLatest } from 'redux-saga/effects';
import * as actionConstants from 'src/constants/actions';
import { leaveRoomEffect } from './effects';

export function* leaveRoomWatcher() {
  yield takeLatest(actionConstants.LEAVE_ROOM_ACTION, leaveRoomEffect);
}

export default function RoomWatchers() {
  return [leaveRoomWatcher()];
}
