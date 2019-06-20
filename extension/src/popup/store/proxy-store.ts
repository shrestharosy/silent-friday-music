import { Store, applyMiddleware } from 'webext-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from 'src/sagas';

const proxyStore = new Store({
  portName: 'silent-friday-music',
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const proxyStoreWithMiddleware = applyMiddleware(proxyStore, ...middleware);

sagaMiddleware.run(rootSaga);

export default proxyStoreWithMiddleware;
