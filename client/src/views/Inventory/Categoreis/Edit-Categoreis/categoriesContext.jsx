import { createContext, useContext, useRef, useState } from "react";

const categoriesContext = createContext();

export default function Provider({ children }) {
  const [categoriesdata, setCategoriesdata] = useState({});
  const [data, setData] = useState({});
  const generalRef = useRef();
  const dataRef = useRef();

  return (
    <categoriesContext.Provider
      value={{
        generalRef,
        dataRef,
        categoriesdata,
        setCategoriesdata,
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
