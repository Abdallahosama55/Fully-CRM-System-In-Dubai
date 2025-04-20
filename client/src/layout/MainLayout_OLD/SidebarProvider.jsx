// CollapsibleContext.js
import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";

const initialState = {
  isOpen: false,
};

const actionTypes = {
  SET_COLLAPSE: "SET_COLLAPSE",
  OPEN_COLLAPSE: "OPEN_COLLAPSE",
  CLOSE_COLLAPSE: "CLOSE_COLLAPSE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLAPSE:
      console.log("$$$$", action.payload);
      return {
        ...state,
        isOpen: action.payload,
      };
    case actionTypes.OPEN_COLLAPSE:
      return {
        ...state,
        isOpen: true,
      };
    case actionTypes.CLOSE_COLLAPSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

const SidebarProviderContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = useCallback(() => {
    dispatch({ type: actionTypes.CLOSE_COLLAPSE });
  }, []);
  const handleOpen = useCallback(() => {
    dispatch({ type: actionTypes.OPEN_COLLAPSE });
  }, []);
  const setCollapsed = useCallback((value) => {
    dispatch({ type: actionTypes.SET_COLLAPSE, payload: value });
  }, []);

  const memoizedValue = useMemo(
    () => ({ handleOpen, handleClose, isOpen: state.isOpen, setCollapsed }),
    [handleClose, handleOpen, setCollapsed, state],
  );

  return (
    <SidebarProviderContext.Provider value={memoizedValue}>
      {children}
    </SidebarProviderContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarProviderContext);

  if (!context) {
    //throw new Error("useCollapsible must be used within a CollapsibleProvider");
  }
  return context ?? {};
};
