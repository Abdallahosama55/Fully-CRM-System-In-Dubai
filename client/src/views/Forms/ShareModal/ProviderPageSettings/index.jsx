import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

export const ProviderPageSettingsContext = createContext();

const initialState = {
  providerSettings: {
    backgroundType: 1,
    backgroundImage: "",
    backgroundColor: "white",
    frameColor: "white",
    textColor: "#A3A9B1",
    linkColor: "#55A17C",
    embeddingType: "",
    popUpText: "",
  },
};

function providerPageSettingsReducer(state, action) {
  switch (action.type) {
    case "SET_ALL":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          ...action.payload,
        },
      };
    case "SET_TEXT_COLOR":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          textColor: action.payload,
        },
      };
    case "SET_LINK_COLOR":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          linkColor: action.payload,
        },
      };
    case "SET_BACKGROUND_COLOR":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          backgroundColor: action.payload,
        },
      };
    case "SET_BACKGROUND_IMAGE":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          backgroundImage: action.payload,
        },
      };
    case "SET_EMBEDDING_TYPE":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          embeddingType: action.payload,
        },
      };
    case "SET_POPUP_TEXT":
      return {
        ...state,
        providerSettings: {
          ...state.providerSettings,
          popUpText: action.payload,
        },
      };
    default:
      throw new Error("Unhandled action type");
  }
}

export const ProviderPageSettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(providerPageSettingsReducer, initialState);

  const setTextColor = useCallback(
    (payload) => dispatch({ type: "SET_TEXT_COLOR", payload }),
    [dispatch],
  );
  const setLinkColor = useCallback(
    (payload) => dispatch({ type: "SET_LINK_COLOR", payload }),
    [dispatch],
  );
  const setBackgroundColor = useCallback(
    (payload) => dispatch({ type: "SET_BACKGROUND_COLOR", payload }),
    [dispatch],
  );
  const setBackgroundImage = useCallback(
    (payload) => dispatch({ type: "SET_BACKGROUND_IMAGE", payload }),
    [dispatch],
  );

  const setEmbeddingType = useCallback(
    (payload) => dispatch({ type: "SET_EMBEDDING_TYPE", payload }),
    [dispatch],
  );

  const setPopUpText = useCallback(
    (payload) => dispatch({ type: "SET_POPUP_TEXT", payload }),
    [dispatch],
  );

  const setSettings = useCallback(
    (payload) => {
      dispatch({ type: "SET_ALL", payload });
    },
    [dispatch],
  );

  const contextValue = useMemo(
    () => ({
      providerSettings: state.providerSettings,
      setTextColor,
      setLinkColor,
      setBackgroundColor,
      setSettings,
      setBackgroundImage,
      setEmbeddingType,
      setPopUpText,
    }),
    [
      state.providerSettings,
      setSettings,
      setTextColor,
      setLinkColor,
      setBackgroundColor,
      setBackgroundImage,
      setEmbeddingType,
      setPopUpText,
    ],
  );

  return (
    <ProviderPageSettingsContext.Provider value={contextValue}>
      {children}
    </ProviderPageSettingsContext.Provider>
  );
};

export const useContextPageSettings = () => {
  const context = useContext(ProviderPageSettingsContext);
  if (context === undefined) {
    throw new Error("useProviderPageSettings must be used within a ProviderPageSettingsProvider");
  }
  return context;
};
export const WrapperPageSetting = ({ children }) => {
  const { providerSettings } = useContextPageSettings();
  return children(providerSettings);
};
