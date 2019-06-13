import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./public";

import PopUpApp from "./popup/App";
import Store from "./popup/store";

Store.ready().then(() => {
  const rootDiv = document.getElementById("ext-root");
  if (rootDiv)
    render(
      <Provider store={Store}>
        <PopUpApp />
      </Provider>,
      rootDiv
    );
});
