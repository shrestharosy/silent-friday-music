import { takeLatest } from 'redux-saga/effects';

import * as actionConstants from 'src/constants/actions';

import { addToPlaylistEffect, getPlaylistEffect, fetchCurrentSongDetailsEffect } from './effects';

export function* addToPlaylistWatcher() {
  yield takeLatest(actionConstants.ADD_TO_PLAYLIST, addToPlaylistEffect);
}

export function* getPlaylistWatcher() {
  yield takeLatest(actionConstants.GET_PLAYLIST, getPlaylistEffect);
}

export function* fetchCurrentSongDetailsWatcher() {
  yield takeLatest(actionConstants.FETCH_CURRENT_SONG_DETAILS_ACTION, fetchCurrentSongDetailsEffect);
}

export default function SongWatchers() {
  return [addToPlaylistWatcher(), getPlaylistWatcher(), fetchCurrentSongDetailsWatcher()];
}
