import * as React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IActiveReduxState, AvailableComponents } from 'src/scripts/background/reducers/active';
import Login from './Login';

import Authorized from './Authorized';

class Main extends React.Component<{ active: IActiveReduxState }, {}> {
  render() {
    const {
      active: { component },
    } = this.props;
    return (
      <div className={'main-wrapper'}>
        {component !== AvailableComponents.LOGIN ? <Authorized active={this.props.active} /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = ({ active }: IReduxState) => ({ active });

export default connect(mapStateToProps)(Main);
