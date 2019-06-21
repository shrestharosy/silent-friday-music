import { all } from 'redux-saga/effects';

import authWatchers from './auth/watchers';

export default function* rootSaga() {
  yield all([...authWatchers()]);
}
