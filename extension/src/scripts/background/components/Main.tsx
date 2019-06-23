import * as React from 'react';

import NowPlaying from './NowPlaying';
import TimeKeeper from './Phantom/TimeKeeper';
import { connect } from 'react-redux';
import { IReduxState } from '../reducers/rootReducer';
import { IActiveReduxState, AvailableComponents } from '../reducers/active';
import * as storage from 'src/utils/storage.utils';
import { ACCESS_TOKEN } from 'src/constants/storage';

const mapStateToProps = ({ active }: IReduxState) => ({ active });

interface IMainProps {
  active: IActiveReduxState;
}

class Main extends React.Component<IMainProps> {
  render() {
    const { active } = this.props;
    return (
      <React.Fragment>
        {active.component === AvailableComponents.ROOM_DETAILS && <NowPlaying roomId={active.id} />}
        {this.props.active.component === AvailableComponents.ROOM_LIST && storage.getFromStorage(ACCESS_TOKEN) && (
          <TimeKeeper />
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Main);
