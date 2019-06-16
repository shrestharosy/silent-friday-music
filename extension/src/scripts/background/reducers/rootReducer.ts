import { combineReducers } from 'redux';

import demo from './demo';
import broadcast from './broadcast';
import room from './room';
import profile from './profile';

export default combineReducers({
  demo,
  broadcast,
  room,
  profile,
});
