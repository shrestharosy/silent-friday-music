import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface IPlayerReduxState {
  mute: boolean;
}

const initialState: IPlayerReduxState = {
  mute: false,
};

export type IFillPlayerActionPayload = IPlayerReduxState;

type PlayerActionType = ActionType<typeof ActionConstants.FILL_PLAYER_ACTION, IFillPlayerActionPayload>;

const playerReducer = (state = initialState, action: PlayerActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_PLAYER_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
