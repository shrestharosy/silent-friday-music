import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form } from 'formik';

import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from '../../../scripts/background/reducers/active';
import CreateRoomForm from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

interface ICreateRoomProps {
  fillActiveAction: typeof fillActiveAction;
}

class CreateRoom extends React.Component<ICreateRoomProps, {}> {
  handleGoBackAction = () => {
    this.props.fillActiveAction({
      component: AvailableComponents.ROOM_LIST,
      id: '',
    });
  };

  render() {
    return (
      <div className={'common-wrapper new-room-wrapper'}>
        <div className="no-focus-outline">
          <button className="back-btn" onClick={() => this.handleGoBackAction()}>
            <FontAwesomeIcon icon={faChevronCircleLeft} className="back-icon" />
          </button>
        </div>
        <div className="new-room-title-wrapper">
          <span className="new-room-title">CREATE NEW ROOM</span>
          <span className="new-room-subtitle">Create a room and start streaming songs instantly</span>
        </div>
        <CreateRoomForm />
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fillActiveAction: typeof fillActiveAction;
  }>
) => bindActionCreators({ fillActiveAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CreateRoom);
