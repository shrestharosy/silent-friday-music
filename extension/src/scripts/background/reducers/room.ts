import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';
import { ISong } from './song';

export interface IRoomReduxState {
  _id: string;
  members: Array<Object>;
  requests: Array<ISong>;
  name: string;
  master: string;
}

const initialroomReduxState: IRoomReduxState = {
  _id: '',
  members: [],
  requests: [],
  name: '',
  master: '',
};

export type IFillRoomActionPayload = IRoomReduxState;

type RoomActionType =
  | ActionType<typeof ActionConstants.FILL_ROOM_ACTION, IFillRoomActionPayload>
  | ActionType<typeof ActionConstants.RESET_ROOM_STATE, {}>;

const roomReducer = (state = initialroomReduxState, action: RoomActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_ROOM_ACTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionConstants.RESET_ROOM_STATE: {
      return {
        ...initialroomReduxState,
      };
    }
    default: {
      return state;
    }
  }
};

export default roomReducer;
