import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { addToPlaylistEffect, getPlaylistEffect } from './effects';

export function* addToPlaylistWatcher() {
  yield takeLatest(actionConstants.ADD_TO_PLAYLIST, addToPlaylistEffect);
}

export function* getPlaylistWatcher() {
  yield takeLatest(actionConstants.GET_PLAYLIST, getPlaylistEffect);
}

export default function SongWatchers() {
  return [addToPlaylistWatcher(), getPlaylistWatcher()];
}
