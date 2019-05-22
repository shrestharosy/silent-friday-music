import * as React from 'react';
import { render } from 'react-dom';

import './public';

import PopUpApp from './popup/App';

const renderPopup = () => {
  const rootDiv = document.getElementById('ext-root');
  if (rootDiv) render(<PopUpApp />, rootDiv);
};

renderPopup();
