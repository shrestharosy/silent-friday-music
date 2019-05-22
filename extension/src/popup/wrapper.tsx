import * as React from 'react';
import Player from './player';

const Wrapper: React.SFC<{}> = () => {
  return <Player />;
};

// const Wrapper = (text = "Yayy!!") => {
//   const element = document.createElement("div");

//   element.innerHTML = text;

//   return element;
// };

export default Wrapper;
