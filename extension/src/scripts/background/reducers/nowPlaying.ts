import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface INowPlayingReduxState {
  songId: string;
  streamUrl: string;
  timestamp: string;
}

const initialState: INowPlayingReduxState = {
  songId: '',
  streamUrl: '',
  timestamp: '',
};

export type IFillNowPlayingActionPayload = INowPlayingReduxState;

type NowPlayingActionType = ActionType<typeof ActionConstants.FILL_NOW_PLAYING_ACTION, IFillNowPlayingActionPayload>;

const nowPlayingReducer = (state = initialState, action: NowPlayingActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_NOW_PLAYING_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default nowPlayingReducer;
