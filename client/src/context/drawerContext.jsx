import { useCallback } from "react";
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext(null);

export const useDrawer = () => useContext(DrawerContext);

const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState("70%");
  const [destroyOnClose, setDestroyOnClose] = useState(true);
  const [drawerContent, setDrawerContent] = useState(<></>);
  const [rootClassName, setRootClassName] = useState("");

  const open = useCallback((width) => {
    setIsDrawerOpen(true);
    setDrawerWidth(width || "70%");
    setRootClassName("");
  }, []);

  const handleSetDestroyOnClose = (data) => {
    setDestroyOnClose(data);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const close = useCallback(() => {
    setIsDrawerOpen(false);
    setRootClassName("");
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerContent,
        drawerWidth,
        open,
        close,
        toggleDrawer,
        setDrawerContent,
        handleSetDestroyOnClose,
        destroyOnClose,
        rootClassName,
        setRootClassName,
      }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
