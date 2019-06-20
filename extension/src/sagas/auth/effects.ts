import { call, put } from 'redux-saga/effects';

import { loginAPI } from './apis';
import * as ActionCreators from '../../actionCreators/actionCreator';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';

export function* loginEffect(action: ActionCreatorsTypes.LoginActionType) {
  try {
    const { accessToken, refreshToken } = yield call(loginAPI, action.payload);
    yield put(ActionCreators.fillAuthAction({ accessToken, refreshToken }));
    if (action.resolve) {
      action.resolve();
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
