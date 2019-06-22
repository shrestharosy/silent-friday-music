import { combineReducers } from 'redux';

import broadcast, { IBroadcastReduxState } from './broadcast';
import room, { IRoomReduxState } from './room';
import profile, { IProfileReduxState } from './profile';
import active, { IActiveReduxState } from './active';
import song, { IPlaylistReduxState } from './song';

export interface IReduxState {
  broadcast: IBroadcastReduxState;
  room: IRoomReduxState;
  profile: IProfileReduxState;
  active: IActiveReduxState;
  song: IPlaylistReduxState;
}

export default combineReducers<IReduxState>({
  broadcast,
  room,
  profile,
  active,
  song,
});
