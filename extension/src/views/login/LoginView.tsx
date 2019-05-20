import * as React from "react";

interface ILoginViewProps {
  handleLogin: () => void;
}

const LoginView: React.SFC<ILoginViewProps> = props => {
  const { handleLogin } = props;
  return (
    <div>
      <button type="submit" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
};

export default LoginView;