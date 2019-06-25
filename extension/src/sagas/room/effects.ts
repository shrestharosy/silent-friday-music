import { call, put } from 'redux-saga/effects';

import { createRoomAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';

export function* createRoomEffect(action: ActionCreatorsTypes.CreateRoomActionType) {
  try {
    const newRoom = yield call(createRoomAPI, action.payload);
    // yield put(ActionCreators.fillRoomAction(updatedRoom));
    if (action.resolve) {
      action.resolve(newRoom);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
