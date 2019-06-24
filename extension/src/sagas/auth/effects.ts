import { call, put } from 'redux-saga/effects';

import { loginAPI, fetchProfileAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';
import { fillProfileAction } from 'src/actionCreators/actionCreator';

export function* loginEffect(action: ActionCreatorsTypes.LoginActionType) {
  try {
    const { accessToken, refreshToken } = yield call(loginAPI, action.payload);
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

export function* fetchProfileEffect(action: ActionCreatorsTypes.FetchProfileAction) {
  try {
    const data = yield call(fetchProfileAPI);

    yield put(fillProfileAction(data));

    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    if (action.reject) {
      action.reject(error);
    }
  }
}
