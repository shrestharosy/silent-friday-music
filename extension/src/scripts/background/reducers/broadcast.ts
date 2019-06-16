import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

interface IBroadcastReduxState {
  streamUrl: string;
  status: boolean;
}

const initialBroadcastReduxState: IBroadcastReduxState = {
  streamUrl: '',
  status: false,
};

export type IFillBroadcastActionPayload = IBroadcastReduxState;

type BroadcastActionType = ActionType<typeof ActionConstants.FILL_BROADCAST_ACTION, IFillBroadcastActionPayload>;

const broadcastReducer = (state = initialBroadcastReduxState, action: BroadcastActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_BROADCAST_ACTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default broadcastReducer;
