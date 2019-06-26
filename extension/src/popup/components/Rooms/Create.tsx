import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form } from 'formik';

import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from '../../../scripts/background/reducers/active';
import CreateRoomForm from './Form';

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
      <div className={'common-wrapper dash-wrapper'}>
        <span onClick={() => this.handleGoBackAction()}>Back</span>
        <div className={'title-wrapper'}>
          <h2>CREATE NEW ROOM</h2>
        </div>
        <span>Create a room and start streaming songs instantly</span>
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
