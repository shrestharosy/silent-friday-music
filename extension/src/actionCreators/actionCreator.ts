import * as ActionTypes from './actionCreator.d';
import * as actionConstants from 'src/constants/actions';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';
import { IFillActiveActionPayload } from 'src/scripts/background/reducers/active';
import { ILoginPayload } from 'src/sagas/auth/apis';
import { IAddtoPlaylistPayload, ISongsPayload } from 'src/sagas/song/apis';
import { IFillPlaylistActionPayload } from '../scripts/background/reducers/song';
import { IFillNowPlayingActionPayload } from 'src/scripts/background/reducers/nowPlaying';
import { ICreateRoomPayload, IRemoveFinishedSongPayload } from 'src/sagas/room/apis';

export function fillBroadcastAction(payload: IFillBroadcastActionPayload): ActionTypes.FillBroadcastActionType {
  return {
    type: actionConstants.FILL_BROADCAST_ACTION,
    payload,
  };
}

export function fetchRoomsListAction(resolve?: Function, reject?: Function): ActionTypes.FetchRoomsListActionType {
  return {
    type: actionConstants.FETCH_ROOMS_LIST_ACTION,
    resolve,
    reject,
  };
}

export function fetchRoomInfoAction(
  payload: string,
  resolve?: Function,
  reject?: Function
): ActionTypes.FetchRoomInfoActionType {
  return {
    type: actionConstants.FETCH_ROOM_INFO_ACTION,
    payload,
    resolve,
    reject,
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

export function fillPlaylistAction(payload: IFillPlaylistActionPayload): ActionTypes.FillPlaylistActionType {
  return {
    type: actionConstants.FILL_PLAYLIST_ACTION,
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

export function addToPlaylistAction(
  payload: IAddtoPlaylistPayload,
  resolve?: Function,
  reject?: Function
): ActionTypes.AddToPlaylistActionType {
  return {
    type: actionConstants.ADD_TO_PLAYLIST,
    payload,
    resolve,
    reject,
  };
}

export function getPlaylistAction(
  payload: ISongsPayload,
  resolve?: Function,
  reject?: Function
): ActionTypes.GetPlaylistActionType {
  return {
    type: actionConstants.GET_PLAYLIST,
    payload,
    resolve,
    reject,
  };
}

export function fetchProfileAction(resolve?: Function, reject?: Function): ActionTypes.FetchProfileAction {
  return {
    type: actionConstants.FETCH_PROFILE_ACTION,
    resolve,
    reject,
  };
}

export function fillNowPlayingAction(payload: IFillNowPlayingActionPayload): ActionTypes.FillNowPlayingActionType {
  return {
    type: actionConstants.FILL_NOW_PLAYING_ACTION,
    payload,
  };
}

export function fetchUsersAction(resolve?: Function, reject?: Function): ActionTypes.FetchUsersActionType {
  return {
    type: actionConstants.FETCH_USERS,
    resolve,
    reject,
  };
}
export function fetchCurrentSongDetailsAction(
  payload: string,
  resolve?: Function,
  reject?: Function
): ActionTypes.FetchCurrentSongDetailsAction {
  return {
    type: actionConstants.FETCH_CURRENT_SONG_DETAILS_ACTION,
    payload,
    resolve,
    reject,
  };
}

export function createRoomAction(
  payload: ICreateRoomPayload,
  resolve?: Function,
  reject?: Function
): ActionTypes.CreateRoomActionType {
  return {
    type: actionConstants.CREATE_ROOM,
    payload,
    resolve,
    reject,
  };
}

export function leaveRoomAction(payload: string, resolve?: Function, reject?: Function): ActionTypes.LeaveRoomAction {
  return {
    type: actionConstants.LEAVE_ROOM_ACTION,
    payload,
    resolve,
    reject,
  };
}

export function removeFinishedSongAction(
  payload: IRemoveFinishedSongPayload,
  resolve?: Function,
  reject?: Function
): ActionTypes.RemoveFinishedSongType {
  return {
    type: actionConstants.REMOVE_FINISHED_SONG,
    payload,
    resolve,
    reject,
  };
}
