import { createContext, useContext, useRef } from "react";

const brandsContext = createContext();

export default function Provider({ children }) {
  const generalRef = useRef();
  const dataRef = useRef();
  const formsRefs = [generalRef, dataRef];

  const resetForms = () => {
    formsRefs.forEach((formRef) => {
      formRef.current.resetFields();
    });
  };

  const getCurrentbrands = () => {
    const currentProduct = {};
    formsRefs.forEach((formRef) => {
      const formName = formRef.current.__INTERNAL__.name;
      currentProduct[formName] = formRef.current.getFieldsValue();
    });
    return currentProduct;
  };

  return (
    <brandsContext.Provider
      value={{
        getCurrentbrands,
        generalRef,
        dataRef,
        resetForms,
      }}
    >
      {children}
    </brandsContext.Provider>
  );
}

export function useBrandsContext() {
  const context = useContext(brandsContext);
  return context;
}
