import { ActionType } from 'src/constants/action';
import * as ActionConstants from 'src/constants/actions';

export interface IProfileReduxState {
  _id: string;
  name: string;
  email: string;
  userId: string;
  image: string;
}

const initialroomReduxState: IProfileReduxState = {
  _id: '',
  name: '',
  email: '',
  image: '',
  userId: '',
};

export type IFillProfileActionPayload = IProfileReduxState;

type ProfileActionType = ActionType<typeof ActionConstants.FILL_PROFILE_ACTION, IFillProfileActionPayload>;

const profileReducer = (state = initialroomReduxState, action: ProfileActionType) => {
  switch (action.type) {
    case ActionConstants.FILL_PROFILE_ACTION: {
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

export default profileReducer;
