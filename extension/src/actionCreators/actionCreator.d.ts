import * as actionConstants from 'src/constants/actions';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { IFillActiveActionPayload } from 'src/scripts/background/reducers/active';
import { ActionCallbacks } from 'src/constants/action';
import { ILoginPayload } from 'src/sagas/auth/apis';
import { IAddtoPlaylistPayload, ISongsPayload } from 'src/sagas/song/apis';
import { IFillPlaylistActionPayload } from 'src/scripts/background/reducers/song';

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

export interface FillPlaylistActionType {
  type: typeof actionConstants.FILL_PLAYLIST_ACTION;
  payload: IFillPlaylistActionPayload;
}

export interface AddToPlaylistActionType extends ActionCallbacks {
  type: typeof actionConstants.ADD_TO_PLAYLIST;
  payload: IAddtoPlaylistPayload;
}

export interface GetPlaylistActionType extends ActionCallbacks {
  type: typeof actionConstants.GET_PLAYLIST;
  payload: ISongsPayload;
}
