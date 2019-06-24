import { combineReducers } from 'redux';

import broadcast, { IBroadcastReduxState } from './broadcast';
import room, { IRoomReduxState } from './room';
import profile, { IProfileReduxState } from './profile';
import active, { IActiveReduxState } from './active';
import auth, { IAuthReduxState } from './auth';
import nowPlaying, { INowPlayingReduxState } from './nowPlaying';

export interface IReduxState {
  broadcast: IBroadcastReduxState;
  room: IRoomReduxState;
  profile: IProfileReduxState;
  active: IActiveReduxState;
  auth: IAuthReduxState;
  nowPlaying: INowPlayingReduxState;
}

export default combineReducers<IReduxState>({
  broadcast,
  room,
  profile,
  active,
  auth,
  nowPlaying,
});
