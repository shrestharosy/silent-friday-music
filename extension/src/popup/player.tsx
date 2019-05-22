import * as React from 'react';

class Player extends React.Component<{}, {}> {
  sendActionToBackground = (actionType: string) => {
    const action = {
      type: actionType,
    };
    chrome.runtime.sendMessage(action);
  };

  render() {
    return (
      <div>
        <button id="play" onClick={() => this.sendActionToBackground('PLAY')}>
          Play
        </button>

        <button id="pause" onClick={() => this.sendActionToBackground('PAUSE')}>
          Pause
        </button>
      </div>
    );
  }
}

export default Player;
