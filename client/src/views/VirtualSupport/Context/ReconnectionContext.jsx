import { useReducer, createContext, useContext } from "react";

// Create the context
const ReconnectionStatusContext = createContext();

// Define action types
const ACTIONS = {
  SET_RECONNECTED: "SET_RECONNECTED",
  SET_DISABLE_RECONNECTED: "SET_DISABLE_RECONNECTED",
};

// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_RECONNECTED:
      return { isConnected: true };
    case ACTIONS.SET_DISABLE_RECONNECTED:
      return { isConnected: false };
    default:
      return state;
  }
};

// Custom hook to use the context
export const useReconnectionStatus = () => {
  return useContext(ReconnectionStatusContext);
};

export const ReconnectionStatusProvider = ({ children }) => {
  // Initial state
  const initialState = {
    isConnected: false,
  };

  // useReducer hook to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Functions to update connection status
  const setConnected = () => {
    dispatch({ type: ACTIONS.SET_RECONNECTED });
  };

  const setDisconnected = () => {
    dispatch({ type: ACTIONS.SET_DISABLE_RECONNECTED });
  };

  return (
    <ReconnectionStatusContext.Provider
      value={{ isReConnected: state.isConnected, setConnected, setDisconnected }}>
      {children}
    </ReconnectionStatusContext.Provider>
  );
};
