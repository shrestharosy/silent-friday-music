import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { addToPlaylistEffect } from './effects';

export function* addToPlaylistWatcher() {
  yield takeLatest(actionConstants.ADD_TO_PLAYLIST, addToPlaylistEffect);
}

export default function SongWatchers() {
  return [addToPlaylistWatcher()];
}
