import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface ISong {
  title: string;
  thumbnailUrl: string;
}

export interface IPlaylistReduxState {
  requests: Array<ISong>;
}

const initialPlaylistReduxState: IPlaylistReduxState = {
  requests: [],
};

export type IFillPlaylistActionPayload = IPlaylistReduxState;

type PlaylistActionType = ActionType<typeof ActionConstants.FILL_PLAYLIST_ACTION, IFillPlaylistActionPayload>;

const playlistReducer = (state = initialPlaylistReduxState, action: PlaylistActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_PLAYLIST_ACTION: {
      return {
        ...state,
        requests: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default playlistReducer;
