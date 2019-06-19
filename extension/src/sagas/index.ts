import { all } from 'redux-saga/effects';

import AuthWatchers from './auth/watchers';

export default function* rootSaga() {
  yield all([AuthWatchers()]);
}
