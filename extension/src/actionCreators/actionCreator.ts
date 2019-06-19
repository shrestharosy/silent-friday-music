import * as ActionTypes from './actionCreator.d';
import * as actionConstants from 'src/constants/actions';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { ILoginPayload } from 'src/sagas/auth/apis';

export function fillBroadcastAction(payload: IFillBroadcastActionPayload): ActionTypes.FillBroadcastActionType {
  return {
    type: actionConstants.FILL_BROADCAST_ACTION,
    payload,
  };
}

export function fillRoomAction(payload: IFillRoomActionPayload): ActionTypes.FillRoomActionType {
  return {
    type: actionConstants.FILL_ROOM_ACTION,
    payload,
  };
}

export function fillProfileAction(payload: IFillProfileActionPayload): ActionTypes.FillProfileActionType {
  return {
    type: actionConstants.FILL_PROFILE_ACTION,
    payload,
  };
}

export function loginAction(
  payload: ILoginPayload,
  resolve?: Function,
  reject?: Function
): ActionTypes.LoginActionType {
  return {
    type: actionConstants.LOGIN,
    payload,
    resolve,
    reject,
  };
}
