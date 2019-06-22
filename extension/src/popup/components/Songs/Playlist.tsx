import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { getPlaylistAction } from '../../../actionCreators/actionCreator';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import SongList from './List';
import { ISong } from 'src/scripts/background/reducers/song';

interface IPlaylistProps {
  roomId: string;
  requests: Array<ISong>;
  getPlaylistAction: typeof getPlaylistAction;
}

class Playlist extends React.Component<IPlaylistProps, {}> {
  async componentDidMount() {
    const { roomId, getPlaylistAction } = this.props;
    await new Promise((resolve, reject) => {
      getPlaylistAction({ roomId });
    });
  }

  render() {
    const { requests } = this.props;
    return (
      <div>
        <h1>Playlist</h1>
        <SongList songs={requests} />
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
