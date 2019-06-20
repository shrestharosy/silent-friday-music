import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { authUtils } from '../utils';
import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from 'src/scripts/background/reducers/active';

interface IWithAuthenticationWrappedProps {
  fillActiveAction: typeof fillActiveAction;
}

function WithAuthentication<T>(Component: React.ComponentType<T>) {
  class WithAuthenticationWrapped extends React.Component<T & IWithAuthenticationWrappedProps> {
    render() {
      const checkIsAuthenticated = authUtils.isAuthenticated();
      if (checkIsAuthenticated) {
        return <Component {...this.props} />;
      } else {
        this.props.fillActiveAction({ component: AvailableComponents.LOGIN, id: '' });
        return <React.Fragment />;
      }
    }
  }
  return connect(
    null,
    mapDispatchToProps
  )(WithAuthenticationWrapped);
}

const mapDispatchToProps = (dispatch: Dispatch<{ fillActiveAction: typeof fillActiveAction }>) =>
  bindActionCreators({ fillActiveAction }, dispatch);

export default WithAuthentication;
