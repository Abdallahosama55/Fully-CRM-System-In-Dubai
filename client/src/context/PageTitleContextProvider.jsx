import React, { createContext, useContext, useState } from 'react'
const pageContext = createContext({
    pageTitle: "",
    setPageTitle: () => { }
});

export const usePageTitleContext = () => {
    return useContext(pageContext);
}

const PageTitleContextProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState("");
    return (
        <pageContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </pageContext.Provider>
    )
}

export default PageTitleContextProvider