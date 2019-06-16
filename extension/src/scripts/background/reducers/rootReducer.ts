import { combineReducers } from 'redux';

import demo, { DemoReduxState } from './demo';
import broadcast, { IBroadcastReduxState } from './broadcast';
import room, { IRoomReduxState } from './room';
import profile, { IProfileReduxState } from './profile';

export interface IReduxState {
  demo: DemoReduxState;
  broadcast: IBroadcastReduxState;
  room: IRoomReduxState;
  profile: IProfileReduxState;
}

export default combineReducers<IReduxState>({
  broadcast,
  room,
  profile,
});
