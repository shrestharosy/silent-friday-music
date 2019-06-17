import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import BackgroundApp from './App';

const renderBackgroundApp = () => {
  const [rootDiv] = document.getElementsByTagName('body');
  if (rootDiv)
    render(
      <Provider store={store}>
        <BackgroundApp />
      </Provider>,
      rootDiv
    );
};

renderBackgroundApp();
