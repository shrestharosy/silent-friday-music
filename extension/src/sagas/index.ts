import { all } from 'redux-saga/effects';

import authWatchers from './auth/watchers';
import songWatchers from './song/watchers';
import userWatchers from './user/watchers';

export default function* rootSaga() {
  yield all([...authWatchers(), ...songWatchers(), ...userWatchers()]);
}
