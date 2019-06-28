import * as actionConstants from 'src/constants/actions';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { IFillActiveActionPayload } from 'src/scripts/background/reducers/active';
import { ActionCallbacks } from 'src/constants/action';
import { ILoginPayload } from 'src/sagas/auth/apis';
import { IAddtoPlaylistPayload, ISongsPayload } from 'src/sagas/song/apis';
import { IFillPlaylistActionPayload } from 'src/scripts/background/reducers/song';
import { IFillNowPlayingActionPayload } from 'src/scripts/background/reducers/nowPlaying';
import { ICreateRoomPayload, IRemoveFinishedSongPayload, IAddMembersToRoomPayload } from 'src/sagas/room/apis';

export interface FillBroadcastActionType {
  type: typeof actionConstants.FILL_BROADCAST_ACTION;
  payload: IFillBroadcastActionPayload;
}

export interface FetchRoomsListActionType extends ActionCallbacks {
  type: typeof actionConstants.FETCH_ROOMS_LIST_ACTION;
}

export interface FetchRoomInfoActionType extends ActionCallbacks {
  type: typeof actionConstants.FETCH_ROOM_INFO_ACTION;
  payload: string;
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

export interface FetchProfileAction extends ActionCallbacks {
  type: typeof actionConstants.FETCH_PROFILE_ACTION;
}

export interface FillNowPlayingActionType {
  type: typeof actionConstants.FILL_NOW_PLAYING_ACTION;
  payload: IFillNowPlayingActionPayload;
}

export interface FetchUsersActionType extends ActionCallbacks {
  type: typeof actionConstants.FETCH_USERS;
}

export interface CreateRoomActionType extends ActionCallbacks {
  type: typeof actionConstants.CREATE_ROOM;
  payload: ICreateRoomPayload;
}

export interface FetchCurrentSongDetailsAction extends ActionCallbacks {
  type: typeof actionConstants.FETCH_CURRENT_SONG_DETAILS_ACTION;
  payload: string;
}

export interface LeaveRoomAction extends ActionCallbacks {
  type: typeof actionConstants.LEAVE_ROOM_ACTION;
  payload: string;
}

export interface RemoveFinishedSongType extends ActionCallbacks {
  type: typeof actionConstants.REMOVE_FINISHED_SONG;
  payload: IRemoveFinishedSongPayload;
}

export interface ResetNowPlayingStateType extends ActionCallbacks {
  type: typeof actionConstants.RESET_NOW_PLAYING_STATE;
}

export interface ResetRoomStateType extends ActionCallbacks {
  type: typeof actionConstants.RESET_ROOM_STATE;
}

export interface ResetBroadcastStateType extends ActionCallbacks {
  type: typeof actionConstants.RESET_BROADCAST_STATE;
}

export interface AddMembersToRoomType extends ActionCallbacks {
  type: typeof actionConstants.ADD_MEMBERS_TO_ROOM;
  payload: IAddMembersToRoomPayload;
}
