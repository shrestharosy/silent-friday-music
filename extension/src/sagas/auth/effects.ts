import { call, put } from 'redux-saga/effects';

import { loginAPI, fetchProfileAPI } from './apis';
import * as ActionCreatorsTypes from '../../actionCreators/actionCreator.d';
import * as storageUtils from 'src/utils/storage.utils';
import * as storageConstants from 'src/constants/storage';
import { fillProfileAction } from 'src/actionCreators/actionCreator';

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

export function* fetchProfileEffect(action: ActionCreatorsTypes.FetchProfileAction) {
  try {
    console.log('effect', fetchProfileAPI);
    const data = yield call(fetchProfileAPI);

    console.log(data);

    yield put(fillProfileAction(data));

    if (action.resolve) {
      action.resolve(data);
    }
  } catch (error) {
    console.log(error);
    if (action.reject) {
      action.reject(error);
    }
  }
}
