import { call, put } from 'redux-saga/effects';

import { fetchUsersAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';

export function* fetchUsersEffect(action: ActionCreatorsTypes.FetchUsersAction) {
  try {
    const users = yield call(fetchUsersAPI);
    if (action.resolve) {
      action.resolve(users);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
