import * as React from "react";

interface IWrapperViewProps {
  handleLogout: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const WrapperView: React.SFC<IWrapperViewProps> = props => {
  const { handleLogout } = props;
  return (
    <div>
      Wrapper
      <br />
      <button onClick={(event) => handleLogout(event)}>Logout</button>
    </div>
  );
};

export default WrapperView;
