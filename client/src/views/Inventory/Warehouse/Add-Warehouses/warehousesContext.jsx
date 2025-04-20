import { createContext, useContext, useRef, useState } from "react";

const warehousesContext = createContext();

export default function Provider({ children }) {
  const generalRef = useRef();
  const dataRef = useRef();
  const formsRefs = [generalRef, dataRef];

  const resetForms = () => {
    formsRefs.forEach((formRef) => {
      formRef.current.resetFields();
    });
  };

  const getCurrentWarehouse = () => {
    const currentProduct = {};
    formsRefs.forEach((formRef) => {
      const formName = formRef.current.__INTERNAL__.name;
      currentProduct[formName] = formRef.current.getFieldsValue();
    });
    return currentProduct;
  };

  return (
    <warehousesContext.Provider
      value={{
        getCurrentWarehouse,
        generalRef,
        dataRef,
        resetForms,
      }}
    >
      {children}
    </warehousesContext.Provider>
  );
}

export function useWarehousesContext() {
  const context = useContext(warehousesContext);
  return context;
}
