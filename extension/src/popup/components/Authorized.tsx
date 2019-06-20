import * as React from 'react';

import { storageUtils } from '../utils';
import sendActionToBackground from '../service/background.service';

import { IActiveReduxState, AvailableComponents } from 'src/scripts/background/reducers/active';

import Room from './Rooms/Room';
import Rooms from './Rooms/Rooms';
import WithAuthentication from '../hoc/withAuthentication';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillActiveAction } from 'src/actionCreators/actionCreator';

const mapDispatchToProps = (dispatch: Dispatch<{ fillActiveAction: typeof fillActiveAction }>) =>
  bindActionCreators({ fillActiveAction }, dispatch);

interface IUserProps {
  name: string;
  image: string;
}

interface IAuthorizedCompnentsProps {
  active: IActiveReduxState;
  fillActiveAction: typeof fillActiveAction;
}

class Authorized extends React.Component<IAuthorizedCompnentsProps> {
  componentDidMount() {
    sendActionToBackground({
      type: 'INIT',
    });
  }

  logout = () => {
    storageUtils.clearStorage();
    this.props.fillActiveAction({ component: AvailableComponents.LOGIN, id: '' });
  };

  render() {
    const { component, id } = this.props.active;
    const profile: IUserProps = storageUtils.getFromStorage('USER_PROFILE');
    return (
      <React.Fragment>
        Welcome {profile ? profile : ''}
        <button onClick={() => this.logout()}>Logout</button>
        {component === AvailableComponents.ROOM_LIST && <Rooms />}
        {component === AvailableComponents.ROOM_DETAILS && <Room roomId={id} />}
        {component === AvailableComponents.CREATE_ROOM && <p>Create a room</p>}
      </React.Fragment>
    );
  }
}

export default WithAuthentication<IAuthorizedCompnentsProps>(
  connect(
    null,
    mapDispatchToProps
  )(Authorized)
);
