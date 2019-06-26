import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { createRoomEffect, removeFinishedSongEffect } from './effects';

import { fetchRoomsListEffect, fetchRoomInfoEffect, leaveRoomEffect } from './effects';

export function* createRoomWatcher() {
  yield takeLatest(actionConstants.CREATE_ROOM, createRoomEffect);
}

export function* fetchRoomsListWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOMS_LIST_ACTION, fetchRoomsListEffect);
}

export function* fetchRoomInfoWatcher() {
  yield takeLatest(actionConstants.FETCH_ROOM_INFO_ACTION, fetchRoomInfoEffect);
}

export function* leaveRoomWatcher() {
  yield takeLatest(actionConstants.LEAVE_ROOM_ACTION, leaveRoomEffect);
}

export function* removeFinishedSongWatcher() {
  yield takeLatest(actionConstants.REMOVE_FINISHED_SONG, removeFinishedSongEffect);
}

export default function roomWatchers() {
  return [
    createRoomWatcher(),
    fetchRoomsListWatcher(),
    fetchRoomInfoWatcher(),
    leaveRoomWatcher(),
    removeFinishedSongWatcher(),
  ];
}
