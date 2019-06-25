import { call, put } from 'redux-saga/effects';

import { addToPlayListAPI, getPlaylistAPI, fetchCurrentSongDetails } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as ActionCreators from 'src/actionCreators/actionCreator';
import * as ActionConstants from 'src/constants/actions';

export function* addToPlaylistEffect(action: ActionCreatorsTypes.AddToPlaylistActionType) {
  try {
    const updatedRoom = yield call(addToPlayListAPI, action.payload);
    yield put(ActionCreators.fillRoomAction(updatedRoom));
    if (action.resolve) {
      action.resolve();
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* getPlaylistEffect(action: ActionCreatorsTypes.GetPlaylistActionType) {
  try {
    const playlist = yield call(getPlaylistAPI, action.payload);
    yield put(ActionCreators.fillPlaylistAction({ requests: playlist.requests }));
    if (action.resolve) {
      action.resolve();
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* fetchCurrentSongDetailsEffect(action: ActionCreatorsTypes.FetchCurrentSongDetailsAction) {
  try {
    const data = yield call(fetchCurrentSongDetails, action.payload);
    if (action.resolve) {
      console.log(data);
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
