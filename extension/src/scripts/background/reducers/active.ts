import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export enum AvailableComponents {
  ROOM_LIST = 'ROOM_LIST',
  CREATE_ROOM = 'CREATE_ROOM',
  ROOM_DETAILS = 'ROOM_DETAILS',
  LOGIN = 'LOGIN',
}

export interface IActiveReduxState {
  component: AvailableComponents;
  id: string;
}

const initialActiveReduxState: IActiveReduxState = {
  component: AvailableComponents.ROOM_LIST,
  id: '',
};

export type IFillActiveActionPayload = IActiveReduxState;

type ActiveActionType = ActionType<typeof ActionConstants.FILL_ACTIVE_ACTION, IFillActiveActionPayload>;

const activecastReducer = (state = initialActiveReduxState, action: ActiveActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_ACTIVE_ACTION: {
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

export default activecastReducer;
