import * as React from 'react';

import { connect } from 'react-redux';

import Audio from '../Audio';
import { IReduxState } from '../../reducers/rootReducer';
import { IBroadcastReduxState } from '../../reducers/broadcast';

interface IPlayerProps extends IBroadcastReduxState {
  onTimestampUpdate?: (timestamp: number) => void;
}

class Player extends React.Component<IPlayerProps> {
  render() {
    const { streamUrl, onTimestampUpdate } = this.props;
    return <Audio mute onTimestampUpdate={onTimestampUpdate} url={streamUrl} />;
  }
}

const mapStateToProps = ({ broadcast }: IReduxState) => ({ ...broadcast });

export default connect(mapStateToProps)(Player);
