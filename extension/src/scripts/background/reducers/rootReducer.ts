import { combineReducers } from 'redux';

import broadcast, { IBroadcastReduxState } from './broadcast';
import room, { IRoomReduxState } from './room';
import profile, { IProfileReduxState } from './profile';
import auth, { IAuthReduxState } from './auth';

export interface IReduxState {
  broadcast: IBroadcastReduxState;
  room: IRoomReduxState;
  profile: IProfileReduxState;
  auth: IAuthReduxState;
}

export default combineReducers<IReduxState>({
  broadcast,
  room,
  profile,
  auth,
});
