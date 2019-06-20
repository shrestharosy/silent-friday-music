import { call, put } from 'redux-saga/effects';

import { loginAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';

export function* loginEffect(action: ActionCreatorsTypes.LoginActionType) {
  try {
    const { accessToken, refreshToken } = yield call(loginAPI, action.payload);
    // yield put(ActionCreators.fillAuthAction({ accessToken, refreshToken }));
    storageUtils.setInStorage(storageConstants.ACCESS_TOKEN, accessToken);
    storageUtils.setInStorage(storageConstants.REFRESH_TOKEN, refreshToken);

    if (action.resolve) {
      action.resolve();
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
