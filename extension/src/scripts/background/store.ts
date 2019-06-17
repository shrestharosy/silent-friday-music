import { wrapStore } from 'webext-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

import rootReducer from './reducers';

const store = createStore(rootReducer, devToolsEnhancer());

wrapStore(store, {
  portName: 'silent-friday-music',
});

export default store;
