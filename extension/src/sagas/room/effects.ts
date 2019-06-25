import { LeaveRoomAction } from 'src/actionCreators/actionCreator.d';
import { call } from 'redux-saga/effects';
import { leaveRoomAPI } from './apis';

export function* leaveRoomEffect(action: LeaveRoomAction) {
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
