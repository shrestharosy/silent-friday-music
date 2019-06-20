import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fillActiveAction } from 'src/actionCreators/actionCreator';
import { AvailableComponents } from 'src/scripts/background/reducers/active';

import * as authUtils from 'src/popup/utils/auth.utils';

const mapDispatchToProps = (dispatch: Dispatch<{ fillActiveAction: typeof fillActiveAction }>) =>
  bindActionCreators({ fillActiveAction }, dispatch);

interface IWithAuthenticationProps {
  fillActiveAction: typeof fillActiveAction;
}

export default function withAuthentication<T>(ComponentToWrap: React.ComponentType<T>) {
  class WithAuthenticationWrapped extends React.Component<T & IWithAuthenticationProps> {
    componentDidMount() {
      const checkIsAuthenticated = authUtils.isAuthenticated();
      if (!checkIsAuthenticated) {
        this.props.fillActiveAction({ component: AvailableComponents.LOGIN, id: '' });
      }
    }
    render() {
      return <ComponentToWrap {...this.props} />;
    }
  }

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthenticationWrapped);
}
