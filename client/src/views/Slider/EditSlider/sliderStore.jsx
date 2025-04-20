// Context.js

import React, { createContext, useReducer, useContext, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Define initial state
const scrollToElement = (id) => {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};
const initialGroup = {
  title: "Group",
  type: "group",
  isOpen: true,

  BGColor: "#3F65E4",
  FGColor: "#fff",
  iconColor: "#e52b50",
};
const initialItem = {
  title: "Item",
  BGColor: "#3F65E4",
  FGColor: "#fff",
  type: "item",
  dimensionDropPoint: '',
  isOpen: true,
};
const REDUCER_TYPE = {
  ADD_ITEM: "ADD_ITEM",
  ADD_ITEM_TO_GROUP: "ADD_ITEM_TO_GROUP",
  REMOVE_ITEM: "REMOVE_ITEM",
  ADD_GROUP: "ADD_GROUP",
  UPDATE_ITEM: "UPDATE_ITEM",
  SET_ITEMS: "SET_ITEMS",
};
// Define reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.ADD_ITEM:
      // eslint-disable-next-line no-case-declarations
      let id = uuidv4();
      try {
        scrollToElement(id);
      } catch (e) {
        console.log(e);
      }
      return { ...state, list: [...state.list, { ...initialItem, id }] };
    case REDUCER_TYPE.ADD_GROUP:
      // eslint-disable-next-line no-case-declarations
      let idGroup = uuidv4();
      try {
        scrollToElement(idGroup);
      } catch (e) {
        console.log(e);
      }
      return { ...state, list: [...state.list, { ...initialGroup, id: idGroup }] };
    case REDUCER_TYPE.SET_ITEMS:
      return { ...state, list: action.payload };

    case REDUCER_TYPE.UPDATE_ITEM:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          }
          return item;
        }),
      };

    case REDUCER_TYPE.ADD_ITEM_TO_GROUP:
      // eslint-disable-next-line no-case-declarations
      const idItemInGroup = uuidv4();
      try {
        scrollToElement(idItemInGroup);
      } catch (e) {
        console.log(e);
      }
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...(action.payload.type === "group" ? initialGroup : initialItem),
            id: idItemInGroup,
            groupId: action.payload.id,
          },
        ],
      };
    case REDUCER_TYPE.REMOVE_ITEM:
      return { ...state, list: state.list.filter((item) => item.id !== action.payload.id) };
    default:
      return state;
  }
};

// Create Context
const SliderContext = createContext();

// Create Context Provider Component
export const SliderProvider = ({ children, initialState = { list: [] } }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoized dispatch functions
  const addItem = useCallback(() => {
    dispatch({ type: REDUCER_TYPE.ADD_ITEM });
  }, []);

  const addItemToGroup = useCallback((item) => {
    dispatch({ type: REDUCER_TYPE.ADD_ITEM_TO_GROUP, payload: item });
  }, []);
  const setItems = useCallback((items) => {
    dispatch({ type: REDUCER_TYPE.SET_ITEMS, payload: items });
  });
  const updateItem = useCallback((data) => {
    dispatch({ type: REDUCER_TYPE.UPDATE_ITEM, payload: data });
  }, []);
  const addGroup = useCallback(() => {
    dispatch({ type: REDUCER_TYPE.ADD_GROUP, payload: [] });
  }, []);
  const removeItem = useCallback((id) => {
    dispatch({ type: REDUCER_TYPE.REMOVE_ITEM, payload: { id } });
  }, []);

  // Memoized value for context provider
  const contextValue = useMemo(
    () => ({
      state: state.list ?? [],
      addItem,
      addGroup,
      removeItem,
      updateItem,
      addItemToGroup,
      setItems,
    }),
    [state, addItem, addGroup, removeItem, updateItem, addItemToGroup, setItems],
  );

  return <SliderContext.Provider value={contextValue}>{children}</SliderContext.Provider>;
};

// Custom hook to consume the context
export const useSliderStore = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderStore must be used within a SliderProvider");
  }
  return context;
};

export const SliderGetStore = ({ children }) => {
  const { state, setItems } = useSliderStore();

  return children && children(state, setItems);
};
