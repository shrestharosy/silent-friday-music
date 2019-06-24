import * as React from 'react';

import * as storageUtils from 'src/utils/storage.utils';

import { IActiveReduxState, AvailableComponents } from 'src/scripts/background/reducers/active';

import Room from './Rooms/Room';
import Rooms from './Rooms/Rooms';
import withAuthentication from '../hoc/withAuthentication';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillActiveAction, fetchProfileAction } from 'src/actionCreators/actionCreator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IProfileReduxState } from 'src/scripts/background/reducers/profile';

const mapStateToProps = ({ profile }: IReduxState) => ({ profile });

const mapDispatchToProps = (
  dispatch: Dispatch<{ fillActiveAction: typeof fillActiveAction; fetchProfileAction: typeof fetchProfileAction }>
) => bindActionCreators({ fillActiveAction, fetchProfileAction }, dispatch);

interface IUserProps {
  name: string;
  image: string;
}

interface IAuthorizedComponentsProps {
  active: IActiveReduxState;
  fillActiveAction: typeof fillActiveAction;
  fetchProfileAction: typeof fetchProfileAction;
  profile: IProfileReduxState;
}

class Authorized extends React.Component<IAuthorizedComponentsProps> {
  async componentDidMount() {
    try {
      await new Promise((resolve, reject) => {
        this.props.fetchProfileAction(resolve, reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

  logout = () => {
    storageUtils.clearStorage();
    this.props.fillActiveAction({ component: AvailableComponents.LOGIN, id: '' });
  };

  render() {
    const { component, id } = this.props.active;
    const { profile } = this.props;

    return (
      <React.Fragment>
        <div className="user-wrapper">
          <span> Welcome, {profile ? profile.name : ''} </span>
          <button onClick={() => this.logout()} className="btn-logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
        {component === AvailableComponents.ROOM_LIST && <Rooms />}
        {component === AvailableComponents.ROOM_DETAILS && <Room roomId={id} />}
        {component === AvailableComponents.CREATE_ROOM && <p>Create a room</p>}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication<IAuthorizedComponentsProps>(Authorized));
