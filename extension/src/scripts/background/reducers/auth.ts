import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface IAuthReduxState {
  token: string;
}

const initialAuthReduxState: IAuthReduxState = {
  token: '',
};

export type IFillAuthActionPayload = IAuthReduxState;

type AuthActionType = ActionType<typeof ActionConstants.FILL_AUTH_ACTION, IFillAuthActionPayload>;

const authReducer = (state = initialAuthReduxState, action: AuthActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_AUTH_ACTION: {
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

export default authReducer;
