import { createContext, useContext } from "react";

export const CompanyInfoContext = createContext(null);

// Custom hook for convenience
export const useCompanyInfoContext = () => useContext(CompanyInfoContext);
