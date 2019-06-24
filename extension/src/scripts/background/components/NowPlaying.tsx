import * as React from 'react';
import { INowPlayingReduxState, IFillNowPlayingActionPayload } from '../reducers/nowPlaying';
import Audio from './Audio';
import getSocketInstance, { ISocketMessage } from 'src/services/socket.service';
import { fillNowPlayingAction } from 'src/actionCreators/actionCreator';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IReduxState } from '../reducers/rootReducer';

interface INowPlayingProps {
  nowPlaying: INowPlayingReduxState;
  roomId: string;
  fillNowPlayingAction: typeof fillNowPlayingAction;
}

const mapStateToProps = ({ nowPlaying }: IReduxState) => ({ nowPlaying });

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators({ fillNowPlayingAction }, dispatch);

class NowPlaying extends React.Component<INowPlayingProps> {
  componentDidMount() {
    getSocketInstance()
      .getIOInstance()
      .on(this.props.roomId, (message: ISocketMessage) => {
        const payload = message.payload as IFillNowPlayingActionPayload;

        if (this.props.nowPlaying.songId !== payload.songId) {
          this.props.fillNowPlayingAction(payload);
        }
      });
  }
  render() {
    const { streamUrl, timestamp } = this.props.nowPlaying;
    return <Audio url={`${streamUrl}&t=${timestamp}`} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlaying);
