const initialState = {
  message: ""
};

export default (
  state = initialState,
  action: { type: string; payload: {} }
) => {
  switch (action.type) {
    case "DEMO_ACTION":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
