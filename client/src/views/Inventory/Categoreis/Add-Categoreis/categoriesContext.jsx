import { createContext, useContext, useRef, useState } from "react";

const categoriesContext = createContext();

export default function Provider({ children }) {
  const generalRef = useRef();
  const [data, setData] = useState();
  const dataRef = useRef();

  return (
    <categoriesContext.Provider
      value={{
        generalRef,
        dataRef,

        data,
        setData,
      }}>
      {children}
    </categoriesContext.Provider>
  );
}

export function useCategoriesContext() {
  const context = useContext(categoriesContext);
  return context;
}
