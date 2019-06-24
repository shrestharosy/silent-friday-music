import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { getPlaylistAction } from '../../../actionCreators/actionCreator';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import SongList from './List';
import { ISong } from 'src/scripts/background/reducers/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

interface IPlaylistProps {
  roomId: string;
  requests: Array<ISong>;
  showPlaylist: boolean;
  getPlaylistAction: typeof getPlaylistAction;
  togglePlaylist: () => void;
}

class Playlist extends React.Component<IPlaylistProps, {}> {
  async componentDidMount() {
    const { roomId, getPlaylistAction } = this.props;
    await new Promise((resolve, reject) => {
      getPlaylistAction({ roomId });
    });
  }

  render() {
    const { requests, showPlaylist, togglePlaylist } = this.props;
    return (
      // <div>
      //   <h1>Full Playlist</h1>
      //   <SongList requests={requests} />
      // </div>
      <div className={`cd-panel cd-panel-bottom from-bottom ${showPlaylist ? 'is-visible' : ''} `}>
        <div className="cd-panel-container">
          <div className="container cd-panel-content">
            <div className="playlist-title-bar no-focus-outline">
              <button className="btn btn-one cd-panel-close " onClick={togglePlaylist}>
                <FontAwesomeIcon icon={faChevronCircleLeft} className="back-icon" />
              </button>
              <span className="playlist-title">Full Playlist</span>
            </div>
            <SongList requests={requests} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ song }: IReduxState) => ({
  requests: song.requests,
});

const mapDispatchToProps = (dispatch: Dispatch<{ getPlaylistAction: typeof getPlaylistAction }>) =>
  bindActionCreators(
    {
      getPlaylistAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
