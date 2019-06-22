import { call, put } from 'redux-saga/effects';

import { addToPlayListAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';

export function* addToPlaylistEffect(action: ActionCreatorsTypes.AddToPlaylistActionType) {
  try {
    const updatedPlaylist = yield call(addToPlayListAPI, action.payload);
    // yield put(ActionCreators.fillAuthAction({ accessToken, refreshToken }));
    if (action.resolve) {
      action.resolve();
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
