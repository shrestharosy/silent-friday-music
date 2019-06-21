import * as ActionTypes from './actionCreator.d';
import * as actionConstants from 'src/constants/actions';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { IFillActiveActionPayload } from 'src/scripts/background/reducers/active';
import { ILoginPayload } from 'src/sagas/auth/apis';
import { IFillAuthActionPayload } from '../scripts/background/reducers/auth';

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

export function fillActiveAction(payload: IFillActiveActionPayload): ActionTypes.FillActiveActionType {
  return {
    type: actionConstants.FILL_ACTIVE_ACTION,
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

export function fillAuthAction(payload: IFillAuthActionPayload): ActionTypes.FillAuthActionType {
  return {
    type: actionConstants.FILL_AUTH_ACTION,
    payload,
  };
}
