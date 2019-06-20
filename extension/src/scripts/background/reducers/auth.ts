import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface IAuthReduxState {
  accessToken: string;
  refreshToken: string;
}

const initialAuthReduxState: IAuthReduxState = {
  accessToken: '',
  refreshToken: '',
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
