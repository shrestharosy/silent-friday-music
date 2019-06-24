import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillActiveAction } from 'src/actionCreators/actionCreator';

interface ICreateRoomProps {
  fillActiveAction: typeof fillActiveAction;
}

class CreateRoom extends React.Component<ICreateRoomProps, {}> {
  render() {
    return (
      <div className={'common-wrapper dash-wrapper'}>
        <div className={'title-wrapper'}>
          <span>CREATE NEW ROOM</span>
        </div>
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
