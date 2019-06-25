import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { createRoomEffect } from './effects';

export function* createRoomWatcher() {
  yield takeLatest(actionConstants.CREATE_ROOM, createRoomEffect);
}

export default function RoomWatchers() {
  return [createRoomWatcher()];
}
