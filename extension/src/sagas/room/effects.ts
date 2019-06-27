import { call, put } from 'redux-saga/effects';

import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as ActionCreators from 'src/actionCreators/actionCreator';
import { createRoomAPI, removeFinishedSong, addMembersToRoom } from './apis';
import { fetchRoomsList, fetchRoomInfo } from 'src/sagas/room/apis';
import { leaveRoomAPI } from './apis';

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

export function* fetchRoomsListEffect(action: ActionCreatorsTypes.FetchRoomsListActionType) {
  try {
    const data = yield call(fetchRoomsList);

    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* fetchRoomInfoEffect(action: ActionCreatorsTypes.FetchRoomInfoActionType) {
  try {
    const data = yield call(fetchRoomInfo, action.payload);
    yield put(ActionCreators.fillRoomAction(data));
    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* leaveRoomEffect(action: ActionCreatorsTypes.LeaveRoomAction) {
  try {
    const data = yield call(leaveRoomAPI, action.payload);
    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* removeFinishedSongEffect(action: ActionCreatorsTypes.RemoveFinishedSongType) {
  try {
    const data = yield call(removeFinishedSong, action.payload);
    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}

export function* addMembersToRoomEffect(action: ActionCreatorsTypes.AddMembersToRoomType) {
  try {
    const data = yield call(addMembersToRoom, action.payload);
    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
