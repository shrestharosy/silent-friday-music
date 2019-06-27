import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface IBroadcastReduxState {
  streamUrl: string;
  status: boolean;
  songId: string;
  lengthSeconds: number;
}

const initialBroadcastReduxState: IBroadcastReduxState = {
  streamUrl: '',
  status: false,
  songId: '',
  lengthSeconds: 0,
};

export type IFillBroadcastActionPayload = IBroadcastReduxState;

type BroadcastActionType =
  | ActionType<typeof ActionConstants.FILL_BROADCAST_ACTION, IFillBroadcastActionPayload>
  | ActionType<typeof ActionConstants.RESET_BROADCAST_STATE, {}>;

const broadcastReducer = (state = initialBroadcastReduxState, action: BroadcastActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_BROADCAST_ACTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionConstants.RESET_BROADCAST_STATE: {
      return {
        ...initialBroadcastReduxState,
      };
    }
    default: {
      return state;
    }
  }
};

export default broadcastReducer;
