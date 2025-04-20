import { createContext, useContext, useRef, useState } from "react";

const bransContext = createContext();

export default function Provider({ children }) {
  const [brandsdata, setbrandsdata] = useState({});
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
    <bransContext.Provider
      value={{
        getCurrentbrands,
        generalRef,
        dataRef,
        resetForms,
        brandsdata,
        setbrandsdata,
      }}
    >
      {children}
    </bransContext.Provider>
  );
}

export function useBransContext() {
  const context = useContext(bransContext);
  return context;
}
