import * as actionConstants from 'src/constants/actions';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { IFillActiveActionPayload } from 'src/scripts/background/reducers/active';
import { ActionCallbacks } from 'src/constants/action';
import { ILoginPayload } from 'src/sagas/auth/apis';
import { IFillAuthActionPayload } from '../scripts/background/reducers/auth';
import { IAddtoPlaylistPayload } from 'src/sagas/song/apis';

export interface FillBroadcastActionType {
  type: typeof actionConstants.FILL_BROADCAST_ACTION;
  payload: IFillBroadcastActionPayload;
}

export interface FillRoomActionType {
  type: typeof actionConstants.FILL_ROOM_ACTION;
  payload: IFillRoomActionPayload;
}

export interface FillProfileActionType {
  type: typeof actionConstants.FILL_PROFILE_ACTION;
  payload: IFillProfileActionPayload;
}

export interface FillActiveActionType {
  type: typeof actionConstants.FILL_ACTIVE_ACTION;
  payload: IFillActiveActionPayload;
}

export interface LoginActionType extends ActionCallbacks {
  type: typeof actionConstants.LOGIN;
  payload: ILoginPayload;
}

export interface FillAuthActionType {
  type: typeof actionConstants.FILL_AUTH_ACTION;
  payload: IFillAuthActionPayload;
}

export interface AddToPlaylistActionType extends ActionCallbacks {
  type: typeof actionConstants.ADD_TO_PLAYLIST;
  payload: IAddtoPlaylistPayload;
}
