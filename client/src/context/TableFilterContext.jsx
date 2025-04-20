import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLE_FILTERS":
      return { ...state, tableFilters: action.payload };
    default:
      return state;
  }
};

const TableFiltersContext = createContext(null);

export const useTableFilters = () => {
  return useContext(TableFiltersContext);
};

const TableFiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTableFilters = useCallback((filters) => {
    dispatch({ type: "SET_TABLE_FILTERS", payload: filters });
  }, []);

  const value = useMemo(
    () => ({
      tableFilters: state.tableFilters,
      setTableFilters,
    }),
    [state.tableFilters, setTableFilters],
  );

  return <TableFiltersContext.Provider value={value}>{children}</TableFiltersContext.Provider>;
};

export default TableFiltersProvider;
