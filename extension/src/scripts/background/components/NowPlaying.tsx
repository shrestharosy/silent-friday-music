import * as React from 'react';
import { INowPlayingReduxState, IFillNowPlayingActionPayload } from '../reducers/nowPlaying';
import Audio from './Audio';
import getSocketInstance, { ISocketMessage } from 'src/services/socket.service';
import { fillNowPlayingAction } from 'src/actionCreators/actionCreator';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IReduxState } from '../reducers/rootReducer';
import { UPDATE_NOW_PLAYING } from 'src/constants/socket';
import Config from 'src/config';

interface INowPlayingProps {
  nowPlaying: INowPlayingReduxState;
  mute: boolean;
  roomId: string;
  fillNowPlayingAction: typeof fillNowPlayingAction;
}

const mapStateToProps = ({ nowPlaying, player: { mute } }: IReduxState) => ({
  nowPlaying,
  mute,
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators({ fillNowPlayingAction }, dispatch);

class NowPlaying extends React.Component<INowPlayingProps> {
  componentDidMount() {
    getSocketInstance()
      .getIOInstance()
      .on(this.props.roomId, (message: ISocketMessage) => {
        if (message.type === UPDATE_NOW_PLAYING) {
          const payload = message.payload as IFillNowPlayingActionPayload;
          if (this.props.nowPlaying.songId !== payload.songId) {
            this.props.fillNowPlayingAction(payload);
          }
        }
      });
  }
  render() {
    const {
      nowPlaying: { streamUrl, timestamp },
      mute,
    } = this.props;
    return <Audio url={`${Config.ApiEnv.baseURL}stream?v=${streamUrl}&t=${timestamp}`} mute={mute} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlaying);
