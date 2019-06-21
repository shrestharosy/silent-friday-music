import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './public';

import PopUpApp from './popup/App';
import proxyStore from './popup/store';

proxyStore.ready().then(() => {
  const rootDiv = document.getElementById('ext-root');
  if (rootDiv)
    render(
      <Provider store={proxyStore}>
        <PopUpApp />
      </Provider>,
      rootDiv
    );
});
